const express = require('express');
const { CohereClientV2 } = require('cohere-ai');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 8081; // Server Port

// Instantiate the Cohere API client
const cohere = new CohereClientV2({
  token: 'HdROvXmf76MUENqHZLCymsuF4WVGsLeE4eYCODL1', // Replace with your actual Cohere API key
});

app.use(cors()); 

// Middleware for parsing JSON requests
app.use(express.json());

// API endpoint for handling the chat with Cohere
app.post('/cohere-chat', async (req, res) => {
  try {
    const { prompt } = req.body; // Extract the prompt from the request body

    // Make a request to the Cohere API
    const response = await cohere.chat({
      model: 'command-r-plus', // Ensure this model is available
      messages: [
        {
          role: 'user',
          content: prompt, // Send the user input
        },
      ],
    });

    // Send the response back to the frontend
    res.json({ response: response.text || response.message });
  } catch (error) {
    console.error('Error fetching from Cohere API:', error);
    res.status(500).json({ error: 'Error fetching from Cohere API' });
  }
});

app.post('/summarize-text', async (req, res) => {
    try {
      const { text } = req.body;
  
      // Make a request to the Cohere API using the T5-Base model for summarization
      const response = await cohere.chat({
        model: 'command-xlarge',
        messages: [
          { role: 'user', content: `summarize: ${text}` },
        ],
      });
  

      // Send the summary back to the frontend
      res.json({ summary: response.message.content[0].text || 'No summary generated' });
    } catch (error) {
      console.error('Error summarizing text:', error);
      res.status(500).json({ error: 'Error summarizing text' });
    }
});

/**
 * Ranks notes for a student using Cohere's `rerank`
 */
async function rankNotes(notes) {
  if (!Array.isArray(notes) || notes.length === 0) return [];

  const response = await cohere.rerank({
    model: "rerank-english-v2.0",
    query: "Rank by seriousness for a substitute teacher",
    documents: notes
  });

  return response.results.map(item => notes[item.index]);
}

/**
 * Summarizes a student's notes using Cohere
 */
async function summarizeNotes(notes) {
  if (!notes.length) return "No summary available.";

  const response = await cohere.chat({
    model: 'command-xlarge',
    messages: [
      { role: 'user', content: `Summarize these student notes briefly for a substitute teacher:\n${notes.join("\n")}` },
    ],
  });

  return response.message?.content[0]?.text || "No summary generated.";
}

/**
 * Ranks students based on their most serious note
 */
async function rankStudents(students) {
  const studentsWithRankedNotes = await Promise.all(
    students.map(async (student) => {
      const rankedNotes = await rankNotes(student.notes);
      const summary = await summarizeNotes(rankedNotes);
      return {
        ...student,
        rankedNotes,
        summary,
        mostSeriousNote: rankedNotes[0] || "", // Most serious note
      };
    })
  );

  // Rank students by their most serious note
  const studentRankingResponse = await cohere.rerank({
    model: "rerank-english-v2.0",
    query: "Rank students based on the seriousness of their most critical note",
    documents: studentsWithRankedNotes.map(s => s.mostSeriousNote)
  });

  // Order students based on ranking
  return studentRankingResponse.results.map(item => studentsWithRankedNotes[item.index]);
}

/**
 * API endpoint to load, rank, and summarize student data from `data.json`
 */
app.get('/rank-students', async (req, res) => {
  try {
    // Read student data from `data.json`
    const rawData = fs.readFileSync('data.json');
    const students = JSON.parse(rawData);

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ error: 'Invalid students data' });
    }

    const rankedStudents = await rankStudents(students);

    res.json({ rankedStudents });
  } catch (error) {
    console.error('Error processing students:', error);
    res.status(500).json({ error: 'Error processing students' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
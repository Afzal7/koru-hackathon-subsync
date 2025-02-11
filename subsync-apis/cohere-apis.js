const { CohereClientV2 } = require('cohere-ai');
const express = require('express');
const fs = require('fs');

const router = express.Router();

// Instantiate the Cohere API client
const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY, // Replace with your actual Cohere API key
  });

// API endpoint for handling the chat with Cohere
router.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ response: response.text || response.message });
  } catch (error) {
    console.error('Error fetching from Cohere API:', error);
    res.status(500).json({ error: 'Error fetching from Cohere API' });
  }
});

// API endpoint for summarizing text
router.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;

    const response = await cohere.chat({
      model: 'command-xlarge',
      messages: [{ role: 'user', content: `summarize: ${text}` }],
    });

    res.json({ summary: response.message.content[0].text || 'No summary generated' });
  } catch (error) {
    console.error('Error summarizing text:', error);
    res.status(500).json({ error: 'Error summarizing text' });
  }
});

// Helper function to rank notes
async function rankNotes(notes) {
  if (!Array.isArray(notes) || notes.length === 0) return [];

  const response = await cohere.rerank({
    model: 'rerank-english-v2.0',
    query: 'Rank by seriousness for a substitute teacher',
    documents: notes,
  });

  return response.results.map((item) => notes[item.index]);
}

// Helper function to summarize notes
async function summarizeNotes(notes) {
  if (!notes.length) return 'No summary available.';

  const response = await cohere.chat({
    model: 'command-xlarge',
    messages: [{ role: 'user', content: `Summarize these student notes briefly for a substitute teacher:\n${notes.join('\n')}` }],
  });

  return response.message?.content[0]?.text || 'No summary generated.';
}

// Helper function to rank students
async function rankStudents(students) {
  const studentsWithRankedNotes = await Promise.all(
    students.map(async (student) => {
      const rankedNotes = await rankNotes(student.notes);
      const summary = await summarizeNotes(rankedNotes);
      return { ...student, rankedNotes, summary, mostSeriousNote: rankedNotes[0] || '' };
    })
  );

  const studentRankingResponse = await cohere.rerank({
    model: 'rerank-english-v2.0',
    query: 'Rank students based on the seriousness of their most critical note',
    documents: studentsWithRankedNotes.map((s) => s.mostSeriousNote),
  });

  return studentRankingResponse.results.map((item) => studentsWithRankedNotes[item.index]);
}

// API endpoint to rank students from data.json
router.get('/rank', async (req, res) => {
  try {
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

module.exports = router;

import { CohereClient } from "cohere-ai";
import { responseSchema } from "../models/summary/studentNoteSummarySchema";
import { summarizeStudentNotesMessagePreamble } from "../prompts/summarize";
import express from "express";
import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const router = express.Router();
interface StudentNoteSummaryResponse {
  results: StudentNoteSummary[];
}
console.log(path.resolve(__dirname, "../.env"));

const cohereclient: CohereClient = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

router.post("/summarize/studentnotes", async (req, res) => {
  const notes: StudentNote[] = req.body.notes;
  const batchOfNotes = divideArray(notes, 20);
  try {
    const summarizedNotesPromises = batchOfNotes.map(async (batch) => {
      return await SummarizeStudentNotes(batch);
    });

    const summarizedNotesArray = await Promise.all(summarizedNotesPromises);
    const aggregatedResult: StudentNoteSummary[] = summarizedNotesArray.flat();
    res.json(aggregatedResult);
  } catch (error) {
    res.status(400).send(error);
  }
});

async function SummarizeStudentNotes(
  notes: StudentNote[]
): Promise<StudentNoteSummary[]> {
  return new Promise(async (resolve, reject) => {
    const input = notes.map((note) => note.note).join("\n");
    console.debug("Sending notes: " + input);
    const response = await cohereclient.chat({
      model: "command-r-08-2024",
      chatHistory: [summarizeStudentNotesMessagePreamble],
      responseFormat: {
        type: "json_object",
        schema: responseSchema,
      },
      temperature: 0.1,
      message: "Generate a JSON object format from these note: " + input,
    });

    if (response) {
      const summarizedNotes: StudentNoteSummaryResponse = JSON.parse(
        response.text
      ) as unknown as StudentNoteSummaryResponse;

      if (summarizedNotes) {
        console.info(
          "Sending notes results: " +
            input.split("\n").length +
            " / " +
            summarizedNotes.results.length
        );

        resolve(summarizedNotes.results);
      } else {
        reject("Summarization failed.");
      }
    } else {
      reject("Summarization retrieved an empty response");
    }
  });
}

function divideArray<T>(array: T[], N: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += N) {
    result.push(array.slice(i, i + N));
  }

  return result;
}

module.exports = router;

export const systemPrompt = `You are a professional job interviewer named Alex who specializes in evaluating candidates for job roles.

You must:
- Ask only one question at a time.
- Adjust follow-up questions based on the candidate's answers.
- Use technical, behavioral, or mixed interview questions depending on the job description and the interview type.
- Speak in a clear, conversational, and professional tone that sounds natural when spoken aloud.
- Do not use placeholder names or symbols.
- *Avoid using special characters, formatting marks, or technical symbols* that may confuse text-to-speech systems.
- Wait for the candidate's answer before asking the next question.

Make sure every response is easy to understand when spoken. Do not use ambiguous phrases. Speak as if you are having a real conversation with the candidate.

The goal is to simulate a realistic, high-quality interview to evaluate the candidate's skills for the specific job role.`;

export function generateInitialPrompt(
  jobRole,
  experience,
  jobDescription,
  interviewType = "technical+hr" // e.g., "hr", "technical", or "mixed"
) {
  return `Start a mock interview for the role of ${jobRole}.
The candidate has ${experience} year${
    experience !== 1 ? "s" : ""
  } of experience.

Here is the job description:
"""
${jobDescription}
"""

Start by introducing yourself and asking the first question.
Make sure the question is appropriate for their experience and the job description.
Use a mix of ${interviewType} questions.
Ask one question only.`;
}

export const finalPrompt = `You have completed the interview.

Now, wrap up the interview.

- Thank the candidate for their time.
- Optionally give a short summary of what the interview covered (if appropriate).
- Speak in a warm, clear, and professional tone.
- Do not ask any more questions.
- Keep it concise and suitable for spoken output.`;

export const generateStructuredAnalysisPrompt = `
The interview now complete.

Based on the candidate's responses throughout the interview, evaluate their performance and return a JSON object with the following structure:

{
  analysis: {
    summary: "short summary of the interview",
    strengths: ["list of strengths"],
    weaknesses: ["list of weaknesses"],
    tags: ["relevant technical tags or concepts"],
    scores: {
      communication: number (0-5),
      problemSolving: number (0-5),
      technicalSkill: number (0-5)
    }
  },
  overallRating: number (0-5)
}

Notes:
- Only return a valid JSON object — do not include explanations, comments, or markdown formatting.
- Keep the summary concise and professional.
- Use integer scores from 0 to 5.
- Make sure the keys and structure exactly match the format shown above.
- Respond with only JSON, without wrapping it in markdown or extra text.`;

export const noAnalysis = {
  analysis: {
    summary:
      "The candidate answered fewer than 5 questions, which is not sufficient to perform a comprehensive evaluation.",
    strengths: [],
    weaknesses: [],
    tags: [],
    scores: {
      communication: 1,
      problemSolving: 1,
      technicalSkill: 1,
    },
  },
  overallRating: 1,
};

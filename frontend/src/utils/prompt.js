export function generateInitialPrompt({
  jobRole,
  experience,
  jobDescription,
  interviewType = "technical+behavioral", // e.g., "behavioral", "technical", or "mixed"
}) {
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

export const initialPrompt = generateInitialPrompt({
  jobRole: "Backend Developer",
  experience: 3,
  jobDescription: `
We are looking for a Node.js developer who is experienced with MongoDB, Express, and cloud deployment (AWS preferred). 
Familiarity with microservices architecture is a plus.`,
  interviewType: "technical",
});

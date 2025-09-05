const getCountKey = (userId, interviewId) =>
  `user:${userId}:interview:${interviewId}:count`;
const getHistoryKey = (userId, interviewId) =>
  `user:${userId}:interview:${interviewId}:history`;
const getAllInterviewsKey = (userId) => `user:${userId}:interviews`;

export default {
  getCountKey,
  getHistoryKey,
  getAllInterviewsKey,
};

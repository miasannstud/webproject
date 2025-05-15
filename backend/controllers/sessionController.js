import Session from "../models/sessionSchema.js";
import Study from "../models/studySchema.js";

export const createSession = async (req, res) => {
  try {
    const { studyId } = req.params;
    let { demographics } = req.body;

    if (demographics && typeof demographics === "object") {
      demographics = Object.fromEntries(
        Object.entries(demographics).filter(
          ([_, v]) => v !== "" && v !== undefined && v !== null
        )
      );
    } else {
      demographics = {};
    }

    const study = await Study.findById(studyId);
    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    const session = new Session({
      studyId,
      demographics,
      answers: [],
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
};

export const answerQuestions = async (req, res) => {
  try {
    const { sessionId, questionId, studyId } = req.params;
    const { answers } = req.body;

    // find the session
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // find the study
    const study = await Study.findById(studyId);
    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    // find the question
    const question = study.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const answerObj = {
      questionId: questionId,
      response: answers,
    };

    session.answers.push(answerObj);
    await session.save();

    res.status(200).json({ answers: answerObj });
  } catch (error) {
    res.stsatus(500).json({ error: "Failed to answer questions" });
  }
};

export const countSessions = async (req, res) => {
  try {
    const { studyId } = req.params;
    const count = await Session.countDocuments({ studyId });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error counting sessions:", error);
    res.status(500).json({ error: "Failed to count sessions" });
  }
};

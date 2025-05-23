import Study from "../models/studySchema.js";
import Session from "../models/sessionSchema.js";

// STUDY ROUTES

// retrieve all studies
// GET /studies
const getStudies = async (req, res) => {
  try {
    const studies = await Study.find();
    res.status(200).json(studies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// retrieve one study, for researcher
// GET /studies/:studyId
const getStudyById = async (req, res) => {
  try {
    // the reason for the { } is because we only want to extract the studyId
    // and not anything else from the req.params, if we remove them we get everything
    const { studyId } = req.params;
    const study = await Study.findById(studyId);

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    res.status(200).json(study);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// retrieve one study, for participants
// GET /studies/participant/:studyId
export const getParticipantStudy = async (req, res) => {
  try {
    const { studyId } = req.params;
    const study = await Study.findById(studyId);
    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }
    if (!study.published) {
      return res.status(400).json({ message: "Study is not published" });
    }
    if (
      study.expirationDate &&
      Date.now() > new Date(study.expirationDate).getTime()
    ) {
      return res.status(410).json({ message: "Study has expired" });
    }
    return res.json(study);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// create study
// POST /studies
const createStudy = async (req, res) => {
  try {
    const {
      studyTitle,
      description,
      published,
      questions,
      createdBy,
      expirationDate,
      consent,
    } = req.body;
    // Use req.user._id if available, otherwise fallback to req.body.createdBy
    const creatorId = req.user ? req.user._id : createdBy;

    if (!creatorId) {
      return res.status(400).json({ message: "Missing creator (user) id" });
    }

    const newStudy = new Study({
      createdBy: creatorId,
      studyTitle,
      description,
      published,
      consent,
      questions,
      expirationDate: expirationDate ? new Date(expirationDate) : undefined,
    });

    await newStudy.save();
    res.status(201).json(newStudy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a study with the request body data
// PATCH /api/studies/:studyId
const updateStudy = async (req, res) => {
  try {
    const { studyId } = req.params;
    // get the updated data from the request body
    const { updateData, expirationDate } = req.body;

    if (expirationDate !== undefined) {
      updateData.expirationDate = expirationDate
        ? new Date(expirationDate)
        : null;
    }

    const updatedStudy = await Study.findByIdAndUpdate(
      studyId,
      updateData,
      // new: true returns the updated document
      { new: true }
    );

    if (!updatedStudy) {
      return res.status(404).json({ message: "Study not found" });
    }

    res.status(200).json(updatedStudy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete study
// DELETE /studies/:studyId
const deleteStudy = async (req, res) => {
  try {
    const { studyId } = req.params;
    const study = await Study.findById(studyId);

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    await study.deleteOne();
    res.status(200).json({ message: `Study ${studyId} got deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// publish a study, change published to true
// PATCH /studies/:studyId/public
const publishStudy = async (req, res) => {
  try {
    const { studyId } = req.params;
    const { published } = req.body;

    const study = await Study.findByIdAndUpdate(
      studyId,
      { published },
      { new: true }
    );

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    return res.status(200).json({ published: study.published });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// creating a url for participants
// GET /studies/:studyId/studyUrl
const getStudyLink = async (req, res) => {
  try {
    const { studyId } = req.params;
    const study = await Study.findById(studyId);

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    // cant get link if study is unpublished
    if (!study.published) {
      return res.status(400).json({ message: "Study is not published yet" });
    }

    // cant get link if study is expired
    if (study.expirationDate && Date.now() > study.expirationDate.getTime()) {
      return res.status(410).json({ message: "Study has expired" });
    }

    // build the url using the requests protocol and host
    // request protocol being: http
    // host being: localhost somthing.. 8186 in our case
    // the study page should be served at /participant/:studyId
    // Use an environment variable for the frontend URL if set, fallback otherwise.
    const frontendUrl =
      process.env.FRONTEND_URL || `${req.protocol}://${req.get("host")}`;
    const studyUrl = `${frontendUrl}/participant/${studyId}`;

    res.status(200).json({ studyUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// download study data as json for a specific study
// GET /studies/:studyId/sessions/download/json
const downloadStudyDataJSON = async (req, res) => {
  try {
    const { studyId } = req.params;
    const sessions = await Session.find({ studyId });
    // convert sessions to a formatted json string
    const jsonData = JSON.stringify(sessions, null, 2);

    // set headers to trigger download as a json file
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=studyResults.json"
    );

    res.status(200).send(jsonData);
  } catch (error) {
    console.error("Error in downloadStudyData:", error);
    res.status(500).json({ message: error.message });
  }
};

// helper function that converts an array of session objects into scv format
// it is only used once and only here so we have it in the controller instead of making a separate file for it
function escapeCSV(value) {
  if (value == null) return "";
  const str = String(value);
  if (str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  if (str.includes(",") || str.includes("\n")) {
    return `"${str}"`;
  }
  return str;
}

function convertSessionsToCSV(sessions) {
  if (!sessions || sessions.length === 0) {
    return "";
  }

  const demographicKeys = new Set();
  sessions.forEach((session) => {
    if (session.demographics && typeof session.demographics === "object") {
      Object.keys(session.demographics).forEach((key) =>
        demographicKeys.add(key)
      );
    }
  });

  let maxAnswers = 0;
  sessions.forEach((session) => {
    if (Array.isArray(session.answers)) {
      maxAnswers = Math.max(maxAnswers, session.answers.length);
    }
  });

  const headers = [
    "_id",
    "studyId",
    ...Array.from(demographicKeys),
    ...Array.from({ length: maxAnswers }, (_, i) => `answer_${i + 1}`),
    "createdAt",
  ];
  const csvRows = [];
  csvRows.push(headers.join(";"));

  sessions.forEach((session) => {
    const row = [
      escapeCSV(session._id), //
      escapeCSV(session.studyId),
      ...Array.from(demographicKeys).map((key) =>
        escapeCSV(session.demographics?.[key])
      ),
      ...(Array.isArray(session.answers)
        ? session.answers.map((ans) => {
            if (ans && typeof ans === "object" && "response" in ans) {
              // If answer is slider answers with minLabel/maxLabel
              if (
                ans.response &&
                typeof ans.response === "object" &&
                "minLabel" in ans.response &&
                "maxLabel" in ans.response &&
                "response" in ans.response
              ) {
                return escapeCSV(
                  `Response:${ans.response.response} MinLabel:${ans.response.minLabel}, MaxLabel:${ans.response.maxLabel}`
                );
              }
              // If answer is ranked question, stringify it
              if (
                Array.isArray(ans.response) &&
                typeof ans.response[0] === "object"
              ) {
                return escapeCSV(JSON.stringify(ans.response));
              }
              return escapeCSV(ans.response);
            }
            return escapeCSV(ans);
          })
        : []),
      escapeCSV(session.createdAt),
    ];

    while (row.length < headers.length) {
      row.splice(headers.length - 1, 0, "");
    }

    csvRows.push(row.join(";"));
  });

  return csvRows.join("\n");
}

// download study data as csv for a specific study
// GET /studies/:studyId/sessions/download/csv
const downloadStudyDataCSV = async (req, res) => {
  try {
    const { studyId } = req.params;
    const sessions = await Session.find({ studyId });
    // convert sessions to csv string
    const csvData = convertSessionsToCSV(sessions);

    // set headers for csv download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=studyResults.csv"
    );
    res.status(200).send(csvData);
  } catch (error) {
    console.error("Error downloading CSV:", error);
    res.status(500).json({ message: error.message });
  }
};

// QUESTION ROUTES

// create a question
// POST /studies/:studyId/questions
const createQuestion = async (req, res) => {
  try {
    const { studyId } = req.params;
    console.log("Received studyId:", studyId); // Log the studyId
    const {
      questionText,
      questionType,
      artifact,
      options,
      sliderRange,
      rankedLabels,
    } = req.body;

    const study = await Study.findById(studyId);

    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    if (artifact && !Array.isArray(artifact)) {
      return res.status(400).json({ message: "Invalid artifact format" });
    }

    if (!questionType) {
      return res.status(400).json({ message: "questionType is required" });
    }
    if (!questionText) {
      return res.status(400).json({ message: "questionText is required" });
    }

    const newQuestion = {
      questionText,
      questionType,
      artifact: artifact || [],
      options: options || [],
      sliderRange: {
        minLabel: sliderRange?.minLabel || "Add your own minimum parameters",
        maxLabel: sliderRange?.maxLabel || "Add your own maximum parameters",
        minValue: 0,
        maxValue: 10,
      },
      rankedLabels: rankedLabels || [],
    };

    study.questions.push(newQuestion);
    await study.save();
    res.status(200).json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error.message); // Log the error
    res
      .status(500)
      .json({ message: "Failed to create question", error: error.message });
  }
};

// update question
// PATCH /studies/:studyId/questions/:questionId
const updateQuestion = async (req, res) => {
  try {
    const { studyId, questionId } = req.params;

    const study = await Study.findById(studyId);
    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    const question = study.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // update the question fields if provided in the request body
    if (req.body.questionText) {
      question.questionText = req.body.questionText;
    }
    if (req.body.questionType) {
      question.questionType = req.body.questionType;
    }

    // replace the entire options array if this is updated
    if (req.body.options) {
      question.options = req.body.options;
    }
    if (req.body.artifact) {
      question.artifact = req.body.artifact;
    }

    // Update slider labels if info is provided and question type is slider
    if (req.body.sliderRange && question.questionType == "slider") {
      // Get the slider range from the reques body
      const { minLabel, maxLabel } = req.body.sliderRange;

      // if labels are not empty then update them
      if (minLabel !== undefined) question.sliderRange.minLabel = minLabel;
      if (maxLabel !== undefined) question.sliderRange.maxLabel = maxLabel;
    }

    if (req.body.rankedLabels && question.questionType == "ranked") {
      question.rankedLabels = req.body.rankedLabels;
    }

    await study.save();
    res.status(200).json({ message: "Question got updated", question });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete question
// DELETE /studies/:studyId/questions/:questionId
const deleteQuestion = async (req, res) => {
  try {
    const { studyId, questionId } = req.params;
    const study = await Study.findById(studyId);
    if (!study) {
      return res.status(404).json({ message: "Study not found" });
    }

    const question = study.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.remove();
    await study.save();
    res.status(200).json({ message: "Question got deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const studyController = {
  getStudies,
  getStudyById,
  getParticipantStudy,
  createStudy,
  updateStudy,
  deleteStudy,
  publishStudy,
  getStudyLink,
  downloadStudyDataJSON,
  downloadStudyDataCSV,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};

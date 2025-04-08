import Session from '../models/sessionSchema.js';

export const createSession = async (req, res) => {
  try {
    // extract the studyId from the route parameters and data from the request body
    const { studyId } = req.params;
    const { demographics, answers } = req.body;

    // some validation
    if (!studyId) {
      return res.status(400).json({ error: 'Study ID is required' });
    }
    if (!demographics) {
      return res.status(400).json({ error: 'Demographics are required' });
    }

    // create a new session with all required details
    const session = new Session({ studyId, demographics, answers });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: 'Failed to create session' });
  }
};

export const countSessions = async (req, res) => {
  try {
    const { studyId } = req.params;
    const count = await Session.countDocuments({ studyId });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error counting sessions:", error);
    res.status(500).json({ error: 'Failed to count sessions' });
  }
};

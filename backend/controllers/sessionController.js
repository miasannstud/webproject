import Session from '../models/sessionSchema';

export const createSession = async (req, res) => {
    try {
        const { studyId, demographics, answers } = req.body;
        const session = new Session({ studyId, demographics, answers });

        await session.save();
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create session' });
    }
};

export const getSessions = async (req, res) => {
    try {
        const studyId = req.params.studyId;
        const sessions = await Session.find(studyId ? { studyId } : {});

        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sessions' });
    }
};
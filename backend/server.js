import express from 'express';
import studyRoutes from './routes/studyRoutes.js';
import artifactRoutes from './routes/artifactRoutes.js';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 8080;

// calling the function to connect to mongoDB
connectDB();

// json body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // why do i need this?

// add routes here eventually..
app.use('/api/studies', studyRoutes);
app.use('/api/artifact', artifactRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

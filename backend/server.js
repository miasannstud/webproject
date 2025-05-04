import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import connectDB from './config/db.js';
import researcherRoutes from './routes/researcherRoutes.js';
import studyRoutes from './routes/studyRoutes.js';
import artifactRoutes from './routes/artifactRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;


// Enable CORS
app.use(cors()); // Allow all origins by default
app.use('/uploads', express.static('uploads'));

// calling the function to connect to mongoDB
connectDB();

// json body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:5173', credentials: true,
}));

// Add routes
app.use('/api/users', researcherRoutes);
app.use('/api/studies', studyRoutes);
app.use('/api/artifact', artifactRoutes);
app.use('/api/studies', sessionRoutes);

// Use ejs as the view engine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

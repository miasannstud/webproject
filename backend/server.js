import express from 'express';
// import studyRoutes from './routes/studyRoutes.js';
import connectDB from './config/db.js';
import researcherRoutes from './routes/researcherRoutes.js';
 
import studyRoutes from './routes/studyRoutes.js';
import artifactRoutes from './routes/artifactRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

// calling the function to connect to mongoDB
connectDB();

// json body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // why do i need this?

// // add routes here eventually..
// app.use('/api/studies', studyRoutes);
app.use('/', researcherRoutes);
app.use('/api/studies', studyRoutes);
app.use('/api/artifact', artifactRoutes);

// use ejs as the vew wngine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

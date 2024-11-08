import express from 'express'
import dotenv from 'dotenv';
import connectDB from './db.js';
import cors from 'cors';

// ------------------routes-----------------
import studentRoutes from './Routes/studentRoutes.js'
import recruiterRoute from './Routes/recruiterRoutes.js'
import resumeRoute from './Routes/resumeRoute.js'

dotenv.config();
connectDB();

const app = express();

// ----------middlewares
app.use(cors("*"));
app.use(express.json()); 

//----- routes
app.use('/api/student', studentRoutes); 
app.use('/api/recruiter', recruiterRoute); 
app.use('/api/resume', resumeRoute); 

// ------------consts
const PORT = process.env.PORT || 6969;

app.get("/", (req, res)=>{
    res.send("works");
})


app.listen(PORT, ()=>{ 
    console.log("running on port: ", PORT);
})
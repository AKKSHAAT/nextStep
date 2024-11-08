import Express from 'express'
import dotenv from 'dotenv';
import connectDB from './db.js';
import studentRoutes from './Routes/studentRoutes.js'
import recruiterRoutes from './models/recruiterRoutes.js';
import jobpostRoutes from './models/jobpostRoutes.js';

dotenv.config();
connectDB();

const app = Express();
// ----------middlewares
//----- routes
app.use('/api', studentRoutes); // Prefix '/api' to your routes
app.use('/api', recruiterRoutes)
app.use('/api', jobpostRoutes)
app.use(bodyParser.json()); 




// ------------consts
const PORT = process.env.PORT || 6969;



app.get("/", (req, res)=>{
    res.send("works");
})


app.listen(PORT, ()=>{ 
    console.log("running on port: ", PORT);
})
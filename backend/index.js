import Express from 'express'
import dotenv from 'dotenv';
import connectDB from './db.js';
dotenv.config();
connectDB();

const app = Express();
// ----------middlewares



// ------------consts
const PORT = process.env.PORT || 6969;



app.get("/", (req, res)=>{
    res.send("works");
})


app.listen(PORT, ()=>{ 
    console.log("running on port: ", PORT);
})
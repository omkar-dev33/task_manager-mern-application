import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import taskRoutes from './src/routes/taskRoutes.js'
import connectDB from './src/config/db.js'
import authRoute from './src/routes/authRoutes.js'
import path from "path"

dotenv.config()
connectDB();

const app = express();
const __dirname = path.resolve()
console.log(__dirname)

// Middleware
// app.use(cors());


if(process.env.NODE_ENV !== "production"){
    app.use(
        cors({
            origin:"http://localhost:5173",
        })
    );
}
app.use(express.json()); // convert request body to json


// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoute);


if(process.env.NODE_ENV === "production"){

    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/*splat",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
  
}





// app.use(express.static(path.join(__dirname,"../frontend/dist")))

// app.get("*",(req,res)=>{
//     res.send(path.join(__dirname,"../frontend","dist","index.html"));
// })


// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})




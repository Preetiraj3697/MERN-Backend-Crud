const express = require("express");
require('dotenv').config();
const {connection} = require('./configs/db');
const {userRouter} = require("./routes/User.route");
const {noteRouter} = require("./routes/Note.route");
const {authenticate} = require("./middlewares/authenticate.middleware");
const cors = require('cors')
const app = express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("HOME PAGE");
})

app.use("/users",userRouter);
app.use(authenticate);
app.use("/notes",noteRouter);

app.listen(process.env.port,async()=> {
    try{
        await connection
        console.log("Connected to the DB");
    }catch(err){
        console.log(err);
        console.log("something wrong");
    }
    console.log(`Running at ${process.env.port}`);
})
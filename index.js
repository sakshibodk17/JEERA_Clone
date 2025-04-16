const express= require("express");
const{connectMongodb}= require("./connections");
const{logReqRes}= require("./middleware");

const userRouter =require("./routes/user");


const app=express();
const port= 3000;

//connection 
connectMongodb ("mongodb://127.0.0.1:27017/Sample_db")
 .then(()=> console.log ("Connection established"));

 //middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

app.use("/api/user", userRouter);



app.listen(port, ()=>console.log("Server Started"))
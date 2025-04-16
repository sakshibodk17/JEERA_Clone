const fs= require("fs");

function logReqRes(filename){
    return(req, res, next)=>{
        fs.appendFile(
            filename,`\n${Date.now()}:${res.ip} ${req.method} : ${req.path}\n`,
            (error, data)=>{
                next();
            }
        );


    };

}

module.exports={
    logReqRes,
};
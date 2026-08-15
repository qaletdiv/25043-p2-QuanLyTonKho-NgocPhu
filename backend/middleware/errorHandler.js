function errorHandleMiddleware(err,req,res,next){
    console.log("error",err.stack);
    res.status(500).send("loi server vui long thu lai");
}

module.exports = errorHandleMiddleware;
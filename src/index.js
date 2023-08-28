const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const errorHandler = require("./utils/errors");
const startServer = async()=>{
    try{
        const app = express();
        await databaseConnection();
        await expressApp(app);

        errorHandler(app);

        app.listen(PORT, ()=>{
            console.log("Listening on port : ", PORT);
        })
        .on("error", (err)=>{
            console.log(err);
            process.exit();
        })
    }catch(err){
        console.log(err);
    }
};

startServer();
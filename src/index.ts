import express from "express";
import bodyParser from "body-parser";
import {connect} from "./utils/database";
import createTasks from "./routes/createTasks";
import listTasks from "./routes/listTasks";
import deleteTask from "./routes/deleteTask";
import updateTask from "./routes/updateTask";
const PORT = 3000;
const app = express();

connect();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.post("/createTask", createTasks)

app.get("/listTask", listTasks)

app.get("/delete/:task_id", deleteTask)

app.get("/update/:task_id", updateTask)

app.listen(PORT, () => {
    console.log(`> The application is running on PORT ${PORT}`)
})

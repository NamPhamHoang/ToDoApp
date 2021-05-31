import express from "express";
import bodyParser from "body-parser";
import {connect} from "./utils/database";
import multer from "multer";
import createTasks from "./routes/createTasks";
import listTasks from "./routes/listTasks";
import deleteTask from "./routes/deleteTask";
import updateTask from "./routes/updateTask";
import path from "path";
const PORT = 3000;
const app = express();

// connect();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
const groupStore = multer.diskStorage({
    destination: './src/uploads',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const tempUpload = multer({
    storage: groupStore
})

app.use(bodyParser.json())

app.use("/uploads", express.static('./src/uploads'));

app.post("/createTask", createTasks)

app.post("/uploadFile", tempUpload.single("file"), async (req, res) => {
    console.log(req.file)
})

app.get("/listTask", listTasks)

app.get("/delete/:task_id", deleteTask)

app.post("/update/:task_id", updateTask)

app.listen(PORT, () => {
    console.log(`> The application is running on PORT ${PORT}`)
})

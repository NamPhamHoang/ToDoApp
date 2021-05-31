import bodyParser from "body-parser";
import createTasks from "./routes/createTasks";
import deleteTask from "./routes/deleteTask";
// tslint:disable-next-line:ordered-imports
import express from "express";
import multer from "multer";
import listTasks from "./routes/listTasks";
// tslint:disable-next-line:ordered-imports
import path from "path";
import updateTask from "./routes/updateTask";
import {connect} from "./utils/database";

const PORT = 3000;
const app = express();

connect();
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
    try {
        if(req.file !== undefined) {
            res.status(200).json({
                isError: false,
                payload: "Upload Success"
            })
        } else {
            res.status(200).json({
                isError: false,
                payload: "Please choose file"
            })
        }
     
    } catch(err) {
        res.status(500).json({
            isError: true,
            payload: err.toString()
        })
    }
})

app.get("/listTask", listTasks)

app.get("/delete/:task_id", deleteTask)

app.post("/update/", updateTask)

app.listen(PORT, () => {
    console.log(`> The application is running on PORT ${PORT}`)
})

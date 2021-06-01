import bodyParser from "body-parser";
import createTasks from "./routes/createTasks.route";
import deleteTask from "./routes/deleteTask.route";
import NotFound from "./routes/notFound.route";
// tslint:disable-next-line:ordered-imports
import express from "express";
import multer from "multer";
import path from "path";
import { response } from "./utils/response.util";
// tslint:disable-next-line:ordered-imports
import validateMiddleWare from "./modules/validate.module";
import listTasks from "./routes/listTasks.route";
import updateTask from "./routes/updateTask.route";
import {connect} from "./utils/database.util";
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

app.use(NotFound)
app.use("/uploads", express.static('./src/uploads'));

app.post("/createTask", validateMiddleWare, createTasks)

app.post("/uploadFile", tempUpload.single("file"), async (req, res) => {
    try {
        if(req.file !== undefined) {
            response(res).success({
                message: "Upload Successful"
            });
        } else {
            response(res).success({
                message: "Please Choose File"
            });
        }
    } catch(err) {
        response(res).error(500,{
            message: err.toString
        })
    }
})

app.get("/listTask", listTasks)

app.get("/delete/:task_id", deleteTask)

app.post("/update/", validateMiddleWare, updateTask)

app.listen(PORT, () => {
    console.log(`> The application is running on PORT ${PORT}`)
})

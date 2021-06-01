// tslint:disable-next-line:ordered-imports
import { model, Schema, Model, Document } from "mongoose";

export interface ITask extends Document {
    id: string;
    title: string;
    description: string;
    banner: string;
    status: string;
}

const TaskSchema: Schema = new Schema({
    id: {type: String, require: true, unique : true, createIndexes: true,},
    title: {type: String, require: true},
    description: {type: String, require: true},
    banner: {type: String, require: true},
    status: {type: String, require: true},
});

const Task: Model<ITask> = model("Task", TaskSchema);

export default Task;
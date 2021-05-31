import Task, {ITask} from "../models/Task";

export default async (req, res) => {
    const task: ITask[] = await Task.find();
    console.log("Done", task)
}
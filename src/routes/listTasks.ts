import Task, {ITask} from "../models/Task";
import { close } from "../utils/database";


export default async (req, res) => {
    try {
        const task: ITask[] = await Task.find();
        // await close();
        res.status(200).json({
            isError: false,
            payload: task
        })
       
    } catch (err) {
        res.status(500).json({
            isError: true,
            payload: err.toString()
        })
    }
}
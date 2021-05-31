import Task, {ITask} from "../models/Task";
import { close } from "../utils/database";
export default async (req, res) => {
    try {
        const myId = req.params.task_id;
        const filter = {id:myId}
        const task: ITask = await Task.findOneAndDelete(filter)
        // await close();
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({
            isError: true,
            payload: err.toString()
        })
    }
  
}
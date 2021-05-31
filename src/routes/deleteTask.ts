import Task, {ITask} from "../models/Task";

export default async (req, res) => {
    const myId = req.params.task_id;
    const filter = {id:myId}
    const task: ITask = await Task.findOneAndDelete(filter)
    
    console.log("Done", task)
}
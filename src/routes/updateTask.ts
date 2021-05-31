import Task, {ITask} from "../models/Task";


export default async (req, res) => {
    const myId = req.params.task_id;
    const filter = {id:myId}
    const title = "333";
    const description = "444";
    const task: ITask = await Task.findOneAndUpdate(filter, {
        title,
        description
    })
    console.log("Done", task)
}
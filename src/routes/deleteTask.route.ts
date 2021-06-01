import { Request, Response } from "express";
import Task, {ITask} from "../models/Task";
import { response } from "../utils/response.util";

export default async (req: Request, res: Response) => {
    try {
        const id= req.params.task_id;
        const filter = {id}
        const task: ITask = await Task.findOneAndDelete(filter)
        response(res).success({
            task
        });
    } catch (err) {
        response(res).error(500,{
            message: err.toString
        })
    }
}
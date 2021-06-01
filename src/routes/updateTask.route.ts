import { Request, Response } from "express";
import Task, {ITask} from "../models/Task";
import { response } from "../utils/response.util";

export default async (req: Request, res: Response) => {
    try {
        const {
            id,
            title,
            description,
            banner,
            status
        } = req.body
        const filter = {id}
        const task: ITask = await Task.findOneAndUpdate(filter, {
            title,
            description,
            banner,
            status
        }, { new: true })
        response(res).success({
            task
        });
    } catch (err) {
        response(res).error(500,{
            message: err.toString
        })
    }
  
}
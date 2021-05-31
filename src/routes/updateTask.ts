import Task, {ITask} from "../models/Task";
import * as Yup from "yup";
import { close } from "../utils/database";
const BodySchema = Yup.object().shape({
    id: Yup.string().required(),
    title: Yup.string().required(),
    description: Yup.string().required(),
    banner: Yup.string().required(),
    status: Yup.string().required(),
})
export default async (req, res) => {
    BodySchema.validateSync(req.body);
    try {
        const {
            id,
            title,
            description,
            banner,
            status
        } = req.body
        const filter = {id:id}
        const task: ITask = await Task.findOneAndUpdate(filter, {
            title,
            description,
            banner,
            status
        })
        await close();
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({
            isError: true,
            payload: err.toString()
        })
    }
  
}
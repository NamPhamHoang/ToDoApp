import { Request, Response } from "express";
import * as Yup from "yup";
import { response } from "../utils/response.util";
const BodySchema = Yup.object().shape({
    id: Yup.string().required(),
    title: Yup.string().required(),
    description: Yup.string().required(),
    banner: Yup.string().required(),
    status: Yup.string().required(),
})
export default async (req: Request, res: Response, next) => {
    try {
        BodySchema.validateSync(req.body);
        next();
    } catch (err) {
        return response(res).error(401, {
            message: "Must enough fields required",
          });
    }
};
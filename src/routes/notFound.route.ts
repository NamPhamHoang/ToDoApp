import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
   res.status(404).send("404 NOT FOUND")
}
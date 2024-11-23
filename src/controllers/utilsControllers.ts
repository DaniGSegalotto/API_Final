import { Request, Response } from "express";

export const healthcheck = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({message: "Subiu Tchê"});
  } catch (error) {
    res.status(500).json({ message: "Algo não correu bemm" });
  }
};
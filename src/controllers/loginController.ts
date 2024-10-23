import { Request, Response } from "express";
import jwt from "jsonwebtoken"

export class LoginController {

    doLogin = async (req: Request, res: Response): Promise<void> => {
        const {email, password} = req.body

        if(!email || !password){
            res.status(401).send("email e senha obrigatórios")
        }

        const token = jwt.sign({
            email: email
        }, process.env.TOKEN!, {expiresIn: '1h'})

        res.status(200).json({auth: true, token: token})
    }
}
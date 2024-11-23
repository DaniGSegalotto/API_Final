import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import UserRepository from "../repositories/userRepository";

export class UserController {
  private userRepository: UserRepository;

  constructor() {
      this.userRepository = new UserRepository(appDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
      const users = await this.userRepository.getAll();
      res.status(200).json(users);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
      const user = await this.userRepository.getById(parseInt(req.params.id));
      if (!user) {
          res.status(404).send('User not found');
      } else {
          res.status(200).json(user);
      }
  };

  create = async (req: Request, res: Response): Promise<void> => {
      const newUser = await this.userRepository.create(req.body);
      res.status(201).json({message: "Usuário Criado e Operante"});
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const updatedTarefa = await this.userRepository.update(parseInt(req.params.id), req.body);
    if (!updatedTarefa) {
        res.status(404).send('Usuario não encontrado');
    } else {
        res.status(200).json(updatedTarefa);
    }
};
  delete = async (req: Request, res: Response): Promise<void> => {
      const success = await this.userRepository.delete(parseInt(req.params.id));
      if (!success) {
          res.status(404).send('User not found');
      } else {
          res.status(200).send('Deletadoo');
      }
  };
}
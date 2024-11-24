import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import UserRepository from "../repositories/userRepository";
import rabbitMQService from "../services/rabbitmq"; // Importa o serviço RabbitMQ

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
      res.status(404).send("User not found");
    } else {
      res.status(200).json(user);
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const newUser = await this.userRepository.create(req.body);
    await rabbitMQService.sendMessage(
      "usuario-criado",
      JSON.stringify(newUser) // Envia os dados do usuário criado
    );
    console.log('Mensagem enviada para a fila "usuario-criado".');
    res.status(201).json({ message: "Usuário criado e operante" });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const updatedUser = await this.userRepository.update(
      parseInt(req.params.id),
      req.body
    );
    if (!updatedUser) {
      res.status(404).send("Usuário não encontrado");
    } else {
      await rabbitMQService.sendMessage(
        "usuario-atualizado",
        JSON.stringify(updatedUser) // Envia os dados do usuário atualizado
      );
      console.log('Mensagem enviada para a fila "usuario-atualizado".');
      res.status(200).json(updatedUser);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const success = await this.userRepository.delete(parseInt(req.params.id));
    if (!success) {
      res.status(404).send("Usuário não encontrado");
    } else {
      await rabbitMQService.sendMessage(
        "usuario-deletado",
        JSON.stringify({ id: req.params.id }) // Envia apenas o ID do usuário deletado
      );
      console.log('Mensagem enviada para a fila "usuario-deletado".');
      res.status(200).send("Deletado");
    }
  };
}

import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import PetRepository from "../repositories/petRepository";
import rabbitMQService from "../services/rabbitmq"; // Importa o serviço RabbitMQ

export class PetController {
  private petRepository: PetRepository;

  constructor() {
    this.petRepository = new PetRepository(appDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const pets = await this.petRepository.getAll();
    res.status(200).json(pets);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const pet = await this.petRepository.getById(parseInt(req.params.id));
    if (!pet) {
      res.status(404).send("Pet não encontrado");
    } else {
      res.status(200).json(pet);
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const newPet = await this.petRepository.create(req.body);
    await rabbitMQService.sendMessage(
      "pet-criado",
      JSON.stringify(newPet) // Envia os dados do pet criado
    );
    console.log('Mensagem enviada para a fila "pet-criado".');
    res.status(201).json({ message: "Petzinho Criado" });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const updatedPet = await this.petRepository.update(parseInt(req.params.id), req.body);
    if (!updatedPet) {
      res.status(404).send("Pet não encontrado");
    } else {
      await rabbitMQService.sendMessage(
        "pet-atualizado",
        JSON.stringify(updatedPet) // Envia os dados do pet atualizado
      );
      console.log('Mensagem enviada para a fila "pet-atualizado".');
      res.status(200).json(updatedPet);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const success = await this.petRepository.delete(parseInt(req.params.id));
    if (!success) {
      res.status(404).send("Pet não encontrado");
    } else {
      await rabbitMQService.sendMessage(
        "pet-deletado",
        JSON.stringify({ id: req.params.id }) // Envia apenas o ID do pet deletado
      );
      console.log('Mensagem enviada para a fila "pet-deletado".');
      res.status(200).send("Petzinho já eras");
    }
  };
}

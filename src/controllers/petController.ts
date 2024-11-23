import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import PetRepository from "../repositories/petRepository";

export class PetController {
  private petRepository: PetRepository;

  constructor() {
      this.petRepository = new PetRepository(appDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
      const tarefas = await this.petRepository.getAll();
      res.status(200).json(tarefas);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
      const pet = await this.petRepository.getById(parseInt(req.params.id));
      if (!pet) {
          res.status(404).send('Pet não encotrado');
      } else {
          res.status(200).json(pet);
      }
  };

  create = async (req: Request, res: Response): Promise<void> => {
      const newPet = await this.petRepository.create(req.body);
      res.status(201).json({message: "Petzinho Criado"});
  };

  update = async (req: Request, res: Response): Promise<void> => {
      const updatedPet = await this.petRepository.update(parseInt(req.params.id), req.body);
      if (!updatedPet) {
          res.status(404).send('Pet não encontrado');
      } else {
          res.status(200).json(updatedPet);
      }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
      const success = await this.petRepository.delete(parseInt(req.params.id));
      if (!success) {
          res.status(404).send('Pet não encontrado');
      } else {
          res.status(200).send('Petzinho já eras');
      }
  };
}
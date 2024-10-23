import { Request, Response } from "express";
import { appDataSource } from "../data-source";
import TarefaRepository from "../repositories/tarefaRepository";

export class TarefaController {
  private tarefaRepository: TarefaRepository;

  constructor() {
      this.tarefaRepository = new TarefaRepository(appDataSource);
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
      const tarefas = await this.tarefaRepository.getAll();
      res.status(200).json(tarefas);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
      const tarefa = await this.tarefaRepository.getById(parseInt(req.params.id));
      if (!tarefa) {
          res.status(404).send('Tarefa not found');
      } else {
          res.status(200).json(tarefa);
      }
  };

  create = async (req: Request, res: Response): Promise<void> => {
      const newTarefa = await this.tarefaRepository.create(req.body);
      res.status(201).json({message: "Tarefa added"});
  };

  update = async (req: Request, res: Response): Promise<void> => {
      const updatedTarefa = await this.tarefaRepository.update(parseInt(req.params.id), req.body);
      if (!updatedTarefa) {
          res.status(404).send('Tarefa not found');
      } else {
          res.status(200).json(updatedTarefa);
      }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
      const success = await this.tarefaRepository.delete(parseInt(req.params.id));
      if (!success) {
          res.status(404).send('Tarefa not found');
      } else {
          res.status(204).send();
      }
  };
}
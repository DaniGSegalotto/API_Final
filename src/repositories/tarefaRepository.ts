import { DataSource, In, Repository } from 'typeorm'
import TarefaEntity from '../entities/tarefa'

class TarefaRepository implements TarefaRepository {
    private repository: Repository<TarefaEntity>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TarefaEntity)
    }

    async getAll(): Promise<TarefaEntity[]> {
        return this.repository.find()
    }

    async getById(id: number): Promise<TarefaEntity | undefined> {
        const tarefa = await this.repository.findOneBy({ id: id })
        return tarefa || undefined
    }
    
    async getBy(ids: number[]): Promise<TarefaEntity[] | undefined> {
        const tarefas = await this.repository.findBy({
            id: In(ids)
        })
        return tarefas || undefined;
    }

    async create(tarefa: Omit<TarefaEntity, 'id'>): Promise<TarefaEntity> {
        const newTarefa = this.repository.create(tarefa);
        return this.repository.save(newTarefa);
    }

    async update(id: number, tarefa: Partial<Omit<TarefaEntity, 'id'>>): Promise<TarefaEntity | undefined> {
        const tarefaToUpdate = await this.getById(id)

        if (!tarefaToUpdate) {
            return undefined
        }
        return this.repository.merge(tarefaToUpdate, tarefa);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}

export default TarefaRepository;
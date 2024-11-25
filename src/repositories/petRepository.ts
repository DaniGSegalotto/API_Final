import { DataSource, In, Repository } from 'typeorm'
import PetEntity from '../entities/pet'

class PetRepository implements PetRepository {
    private repository: Repository<PetEntity>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(PetEntity)
    }

    async getAll(): Promise<PetEntity[]> {
        return this.repository.find()
    }

    async getById(id: number): Promise<PetEntity | undefined> {
        const pet = await this.repository.findOneBy({ id: id })
        return pet || undefined
    }
    
    async getBy(ids: number[]): Promise<PetEntity[] | undefined> {
        const pets = await this.repository.findBy({
            id: In(ids)
        })
        return pets || undefined;
    }

    async create(pet: Omit<PetEntity, 'id'>): Promise<PetEntity> {
        const newPet = this.repository.create(pet);
        return this.repository.save(newPet);
    }

    async update(id: number, pet: Partial<Omit<PetEntity, 'id'>>): Promise<PetEntity | undefined> {
        const petToUpdate = await this.getById(id);
    
        if (!petToUpdate) {
            return undefined;
        }
        const updatedPet = this.repository.merge(petToUpdate, pet);
        return this.repository.save(updatedPet);
    }
    

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}

export default PetRepository;
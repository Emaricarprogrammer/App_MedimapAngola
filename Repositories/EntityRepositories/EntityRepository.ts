import { PrismaClient, Prisma} from "@prisma/client";
import EntityDatas from "../../Interfaces/EntityInterface/interface";
import { IEntitiesRepositories } from '../../Interfaces/EntityInterface/interface';
export class EntitiesRpository implements IEntitiesRepositories
{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient)
    {
        this.prisma = prisma
    }
    
    async createEntities(entityDatas: EntityDatas, tx?: Omit<Prisma.TransactionClient, '$transaction'>): Promise<EntityDatas | any>
    {
        const prismaClient = tx || this.prisma
        const CreatedEntity = await prismaClient.entidades.create({data:{...entityDatas}})
        return CreatedEntity
    }
    
}
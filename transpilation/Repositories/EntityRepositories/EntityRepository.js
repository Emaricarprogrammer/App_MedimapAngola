"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesRpository = void 0;
class EntitiesRpository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEntities(entityDatas, tx) {
        const prismaClient = tx || this.prisma;
        const CreatedEntity = await prismaClient.entidades.create({ data: { ...entityDatas } });
        return CreatedEntity;
    }
}
exports.EntitiesRpository = EntitiesRpository;

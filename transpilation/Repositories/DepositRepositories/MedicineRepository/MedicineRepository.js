"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineRepositories = void 0;
class MedicineRepositories {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMedicine(medicineDatas, tx) {
        const prismaCliente = tx || this.prisma;
        const MedicineQuery = await prismaCliente.medicamentos.create({ data: { ...medicineDatas } });
        console.log(MedicineQuery);
        return MedicineQuery || null;
    }
    async findMedicine(generic_name, comercial_name) {
        if (generic_name) {
            const MedicineQuery = await this.prisma.medicamentos.findFirst({ where: { nome_generico_medicamento: generic_name }, include: { categoria: true, deposito: true } });
            const MedicineResult = {
                categoria: MedicineQuery?.categoria.nome_categoria_medicamento,
                nome_generico: MedicineQuery?.nome_generico_medicamento,
                nome_comercial: MedicineQuery?.nome_comercial_medicamento,
                origem: MedicineQuery?.origem_medicamento,
                validade: MedicineQuery?.validade_medicamento,
                quantidade_disponivel: MedicineQuery?.quantidade_disponivel_medicamento,
                deposito: MedicineQuery?.deposito.firma_entidade,
                preco: MedicineQuery?.preco_medicamento,
                imagem: MedicineQuery?.imagem_url
            };
            return MedicineResult;
        }
        else if (comercial_name) {
            const MedicineQuery = await this.prisma.medicamentos.findFirst({ where: { nome_comercial_medicamento: comercial_name }, include: { categoria: true, deposito: true } });
            const MedicineResult = {
                categoria: MedicineQuery?.categoria.nome_categoria_medicamento,
                nome_generico: MedicineQuery?.nome_generico_medicamento,
                nome_comercial: MedicineQuery?.nome_comercial_medicamento,
                origem: MedicineQuery?.origem_medicamento,
                validade: MedicineQuery?.validade_medicamento,
                quantidade_disponivel: MedicineQuery?.quantidade_disponivel_medicamento,
                deposito: MedicineQuery?.deposito.firma_entidade,
                preco: MedicineQuery?.preco_medicamento,
                imagem: MedicineQuery?.imagem_url
            };
            return MedicineResult;
        }
        else {
            return null;
        }
    }
    async findAllMedicine(skip, limit) {
        const MedicineQuery = await this.prisma.medicamentos.findMany({ skip: skip, take: limit, include: { categoria: true, deposito: true }, orderBy: { validade_medicamento: "desc" } });
        const totalMedicines = await this.prisma.medicamentos.count();
        const totalPages = Math.ceil(totalMedicines / limit);
        const MedicineResults = MedicineQuery.map((medicines => ({
            categoria: medicines.categoria.nome_categoria_medicamento,
            nome_generico: medicines.nome_generico_medicamento,
            nome_comercial: medicines.nome_comercial_medicamento,
            origem: medicines.origem_medicamento,
            validade: medicines.validade_medicamento,
            quantidade_disponivel: medicines.quantidade_disponivel_medicamento,
            deposito: medicines.deposito.firma_entidade,
            preco: medicines.preco_medicamento,
            imagem: medicines.imagem_url
        })));
        return { MedicineResults };
    }
    async CountMedicines() {
        return await this.prisma.medicamentos.count();
    }
    async updateMedicine(id_medicine, medicineDatas) {
        const MedicineQuery = await this.prisma.medicamentos.update({ where: { id_medicamento: id_medicine }, data: { ...medicineDatas } });
        return MedicineQuery;
    }
    async deleteMedicine(id_medicine) {
        const MedicineQuery = await this.prisma.medicamentos.delete({ where: { id_medicamento: id_medicine } });
        return MedicineQuery;
    }
}
exports.MedicineRepositories = MedicineRepositories;

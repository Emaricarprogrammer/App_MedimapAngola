"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesController = void 0;
const client_1 = require("@prisma/client");
const EntityRepository_1 = require("../../../Repositories/EntityRepositories/EntityRepository");
const AccountRespository_1 = require("../../../Repositories/AccountRepositories/AccountRespository");
const validator_1 = __importDefault(require("validator"));
const validators_1 = require("../../../Utils/Validators/validators/validators");
const prisma = new client_1.PrismaClient();
const EntitiesRepositoryInstnce = new EntityRepository_1.EntitiesRpository(prisma);
const AccountRepositoryInstance = new AccountRespository_1.AccountRepository(prisma);
class EntitiesController {
    static async CreateEntities(req, res) {
        try {
            let { NIF_entidade, firma_entidade, tipo_entidade, email, password, } = req.body;
            NIF_entidade: validator_1.default.isNumeric(NIF_entidade);
            firma_entidade: validator_1.default.escape(firma_entidade);
            tipo_entidade: validator_1.default.escape(tipo_entidade);
            if (!NIF_entidade || !firma_entidade || !tipo_entidade) {
                return res.status(400).json({
                    success: false,
                    message: "Por favor, verifique se preencheu todos os campos.",
                });
            }
            if (!["farmacia", "deposito"].includes(tipo_entidade)) {
                return res.status(400).json({
                    success: false,
                    message: "Ooooops! Por favor, verifique se digitou correctamente o seu tipo de conta.",
                });
            }
            // Validação do email
            if (!validators_1.ValidatorProps.IsVAlidEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Oooooops! Este formato de email é inválido.",
                });
            }
            // Verificar se o email já existe
            const EmailExists = await validators_1.ValidatorProps.EmailExists(email_sanitized);
            if (EmailExists) {
                return res.status(400).json({
                    success: false,
                    message: "Oooooops! Este email já está sendo usado, tente usar outro.",
                });
            }
            // Validação da senha
            if (validators_1.ValidatorProps.validatePassword(password) == false) {
                return res.status(400).json({
                    success: false,
                    message: "A senha deve ter pelo menos 8 caracteres, conter uma letra maiúscula, um número e um caractere especial.",
                });
            }
            const result = await prisma.$transaction(async (tx) => {
                // Criação da conta
                const AccountCreated = await AccountRepositoryInstance.createAccount({
                    email: email,
                    password: password,
                }, tx);
                if (!AccountCreated || !AccountCreated.id_conta) {
                    return res.status(400).json({
                        success: false,
                        message: "Estamos tentando resolver este problema, por favor tente novamente.",
                    });
                }
            });
            const EntityDatas = {
                NIF_entidade,
                firma_entidade,
                tipo_entidade,
                id_conta_fk: AccountCreated
            };
            const EntityCreated = await EntitiesRepositoryInstnce.createEntities();
        }
        catch (error) {
            console.log("Houve um erro: ", error);
            return res.status(500).json({ success: false, message: "Estamos tentando resolver este problema, por favor tente novamente." });
        }
    }
}
exports.EntitiesController = EntitiesController;

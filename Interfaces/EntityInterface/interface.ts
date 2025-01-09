type TypeEntity = {
  farm: null
  depo: null
}

export default interface EntityDatas
{
  id_entidade?: string,
  NIF_entidade: number,
  firma_entidade: string,
  tipo_entidade: "farmacia" | "deposito",
  id_conta_fk: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface IEntitiesRepositories
{
  createEntities(entityDatas: EntityDatas): Promise<EntityDatas | any>
  
}
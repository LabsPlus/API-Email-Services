import KeyDao from "../../repositories/dao/keyDao";

export default class ApiKeyValidator {
    public async isApiKeyValid(apikey:string): Promise <boolean> {
        return await new KeyDao().keyExists(apikey);
    }
}
  
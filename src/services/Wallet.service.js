import ApiService from "./Api.service";
import { WALLET_URL } from "../config/api.config";

class WalletService extends ApiService {
  constructor() {
    super(WALLET_URL);
  }
}

export default new WalletService();

import { AdditionalTokenEnum, TokenList } from '../config';
export declare class CryptoService {
    private readonly logger;
    constructor();
    getCryptoPricingUSD(token: AdditionalTokenEnum): Promise<{
        symbol: TokenList;
        price: number;
    }>;
}

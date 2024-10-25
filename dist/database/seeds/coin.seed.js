"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coin_entity_1 = require("../../coin/entities/coin.entity");
class CoinSeeder {
    constructor() {
        this.track = true;
    }
    async run(dataSource, factoryManager) {
        const repository = dataSource.getRepository(coin_entity_1.Coin);
        await repository.insert([
            {
                name: 'Ethereum Token',
                symbol: 'ETH',
            },
            {
                name: 'Matic Token',
                symbol: 'MATIC',
            },
        ]);
    }
}
exports.default = CoinSeeder;
//# sourceMappingURL=coin.seed.js.map
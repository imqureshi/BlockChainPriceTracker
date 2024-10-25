"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = exports.DatabaseConfig = void 0;
const coin_entity_1 = require("../coin/entities/coin.entity");
const coin_price_entity_1 = require("../coin/entities/coin.price.entity");
const alert_entity_1 = require("../alerts/entities/alert.entity");
const typeorm_extension_1 = require("typeorm-extension");
require("dotenv/config");
const typeorm_1 = require("typeorm");
exports.DatabaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [coin_entity_1.Coin, coin_price_entity_1.CoinPrice, alert_entity_1.Alert],
    synchronize: true,
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
};
const dbConfig = () => ({
    dbConfig: exports.DatabaseConfig,
});
exports.dbConfig = dbConfig;
(async () => {
    const dataSource = new typeorm_1.DataSource(exports.DatabaseConfig);
    await dataSource.initialize();
    await (0, typeorm_extension_1.runSeeders)(dataSource);
})();
//# sourceMappingURL=config.js.map
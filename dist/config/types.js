"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainEnum = exports.AdditionalTokenEnum = exports.StandardResponse = exports.TokenList = exports.ChainAddress = void 0;
var ChainAddress;
(function (ChainAddress) {
    ChainAddress["ETH"] = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
    ChainAddress["MATIC"] = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";
    ChainAddress["BTC"] = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
})(ChainAddress || (exports.ChainAddress = ChainAddress = {}));
var TokenList;
(function (TokenList) {
    TokenList["ETH"] = "ETH";
    TokenList["MATIC"] = "MATIC";
})(TokenList || (exports.TokenList = TokenList = {}));
class StandardResponse {
}
exports.StandardResponse = StandardResponse;
var AdditionalTokenEnum;
(function (AdditionalTokenEnum) {
    AdditionalTokenEnum["BTC"] = "BTC";
    AdditionalTokenEnum["ETH"] = "ETH";
    AdditionalTokenEnum["MATIC"] = "MATIC";
})(AdditionalTokenEnum || (exports.AdditionalTokenEnum = AdditionalTokenEnum = {}));
var ChainEnum;
(function (ChainEnum) {
    ChainEnum["BTC"] = "0x1";
    ChainEnum["ETH"] = "0x38";
    ChainEnum["MATIC"] = "0x1";
})(ChainEnum || (exports.ChainEnum = ChainEnum = {}));
//# sourceMappingURL=types.js.map
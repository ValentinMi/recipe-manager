"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("class-validator");
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const express_1 = __importDefault(require("express"));
const ingredients_1 = require("./resolvers/ingredients");
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("typeorm");
const Ingredient_1 = require("./entities/Ingredient");
dotenv.config();
const PORT = process.env.SERVER_PORT;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: "postgres",
        database: "recipemanager",
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [Ingredient_1.Ingredient]
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [ingredients_1.IngredientResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res })
    });
    const app = express_1.default();
    apolloServer.applyMiddleware({
        app,
        cors: false
    });
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
main().catch(err => console.error(err));
//# sourceMappingURL=index.js.map
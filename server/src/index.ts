import "class-validator";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import { IngredientResolver } from "./resolvers/ingredients";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import { Ingredient } from "./entities/Ingredient";
import { Recipe } from "./entities/Recipe";
dotenv.config();
const PORT = process.env.SERVER_PORT;

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "recipemanager",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Ingredient, Recipe]
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [IngredientResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  const app = express();

  apolloServer.applyMiddleware({
    app,
    cors: false
  });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

// Handling server error
main().catch(err => console.error(err));

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
import { RecipeResolver } from "./resolvers/recipes";
import cors from "cors";
import path from "path";
dotenv.config();
const PORT = process.env.SERVER_PORT;

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "recipemanager",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Ingredient, Recipe]
  });

  await conn.runMigrations();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [IngredientResolver, RecipeResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true
    })
  );

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

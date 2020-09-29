import "class-validator";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { IngredientResolver } from "./resolvers/ingredients";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import { Ingredient } from "./entities/Ingredient";
import { Recipe } from "./entities/Recipe";
import { RecipeResolver } from "./resolvers/recipes";
import cors from "cors";
import path from "path";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";
import { COOKIE_NAME, __prod__ } from "./constants";
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
    entities: [Ingredient, Recipe, User]
  });

  await conn.runMigrations();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [IngredientResolver, RecipeResolver, UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? ".codeponder.com" : undefined
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false
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

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import * as dotenv from "dotenv";
import express from "express";
dotenv.config();
const PORT = process.env.SERVER_PORT;

const main = async () => {
  //   const conn = await createConnection({
  //     type: "postgres",
  //     database: "recipeManager",
  //     username: "postgres",
  //     password:
  //   });

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({
    app,
    cors: false
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

// Handling server error
main().catch(err => console.error(err));

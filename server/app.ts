import fastify, { FastifyRequest } from "fastify";
import cors from "@fastify/cors";

(async function start() {
  const server = fastify();
  await server.register(cors, {
    // put your options here
  });
 
  //just for test (:
  server.get("/ping/", async (request, reply) => {
    reply.send({ text: "pong" });
  });

  server.get("/testdata/", async (request, reply) => {
    reply.send({
      data: [
        { id: 1, name: "John" },
        { id: 2, name: "Mark" },
        { id: 3, name: "Matthew" },
        { id: 4, name: "Luke" },
      ],
    });
  });

  server.listen({ port: 5000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
})();

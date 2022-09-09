import Fastify from "fastify";

const server = Fastify({});

server.get("/ping", async () => {
  return "pongasdf";
});

server.listen({ port: 4000 });

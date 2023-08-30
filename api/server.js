const express = require("express");
const path = require("path");
const grpc = require("@grpc/grpc-js");
const amqp = require("amqplib/callback_api");
const exp = require("constants");
const protoLoader = require("@grpc/proto-loader");
const { channel } = require("diagnostics_channel");
const send = require("send");

const app = express();

const PORT = 80;

const serviceProtoPATH = path.resolve(__dirname, "../protobuf/service.proto");
const serviceServicePORT = 50051;
const servicePackageDefinition = protoLoader.loadSync(serviceProtoPATH);
const serviceService = grpc.loadPackageDefinition(
  servicePackageDefinition
).FileService;
const serviceClient = new serviceService(`107.22.231.147  
:${serviceServicePORT}`,
  grpc.credentials.createInsecure()
);

function sendToQueue(message) {
  amqp.connect("amqp://user:password@23.20.48.82", (error0, connection) => {
    if (error0) {
      console.error("Fallo con el RabbitMQ", error0);
      return;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        console.error("No se creo un canal", error1);
        return;
      }
      const queue = "my_app";
      channel.assertQueue(queue, {
        durable: true,
      });
      channel.sendToQueue(queue, Buffer.from(message));
      console.log(" [x] Sent %s", message);
    });
  });
}

app.get("/list", (req, res) => {
  serviceClient.ListFiles({}, (error, response) => {
    if (error) {
      console.error("Error al listar archivos", error);
      sendToQueue("List");
      res
        .status(500)
        .send("Error llamando el microservicio, pasamos con al RabbitMQ");
      return;
    }
    res.json(response.filenames);
  });
});

app.get("/search", (req, res) => {
  serviceClient.SearchFiles({ name: req.query.name }, (error, response) => {
    if (error) {
      console.error("Error al buscar el archivo", error);
      let message = "Search" + req.query.name;
      console.log(message);
      sendToQueue(message);
      res
        .status(500)
        .send("Error llamando el microservicio, pasamos con el RabbitMQ");
      return;
    }
    res.json(response.SearchResponse);
  });
});

app.listen(PORT, () => {
  console.log(`Corriendo en el puerto: ${PORT}`);
});

import express, { Application } from "express";
import cors from "cors";
import utils from "./routes/utilsRoutes";
import routerUsuario from "./routes/userRoute";
import routerPet from "./routes/petRoute";
import routerLogin from "./routes/loginRoute";
import errorHandler from "./middleware/errorHandler";
import rabbitMQService from "./services/rabbitmq"; // Importa o serviço RabbitMQ

const app: Application = express();
app.use(express.json());
app.use(cors());

// Inicializar RabbitMQ
rabbitMQService.connect().then(() => {
  console.log("RabbitMQ inicializado!");
  // Exemplo de consumo de mensagens
  rabbitMQService.consumeMessages("minha-fila", (msg) => {
    console.log(`Mensagem processada: ${msg}`);
  });
});

// Configurar rotas
app.use("/api", utils);
app.use("/api/usuario", routerUsuario);
app.use("/api", routerLogin);
app.use("/api/pet", routerPet);

// Middleware para tratar erros
app.use(errorHandler);

export default app;

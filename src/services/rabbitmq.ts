import * as amqp from "amqplib";


class RabbitMQService {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async connect() {
    try {
      this.connection = await amqp.connect("amqp://localhost");
      this.channel = await this.connection.createChannel();
      console.log("Conectado ao RabbitMQ!");
    } catch (error) {
      console.error("Erro ao conectar ao RabbitMQ:", error);
      throw error;
    }
  }

  async sendMessage(queue: string, message: string) {
    if (!this.channel) throw new Error("RabbitMQ não conectado");
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Mensagem enviada para a fila "${queue}": ${message}`);
  }

  async consumeMessages(queue: string, callback: (msg: string) => void) {
    if (!this.channel) throw new Error("RabbitMQ não conectado");
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (message) => {
      if (message) {
        const content = message.content.toString();
        console.log(`Mensagem recebida da fila "${queue}": ${content}`);
        callback(content);
        this.channel!.ack(message);
      }
    });
  }

  async close() {
    await this.connection?.close();
    console.log("Conexão com RabbitMQ encerrada.");
  }
}

export default new RabbitMQService();

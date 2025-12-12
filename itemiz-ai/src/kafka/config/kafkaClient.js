import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "inventory-service",
  brokers: [process.env.KAFKA_BROKERS],
});

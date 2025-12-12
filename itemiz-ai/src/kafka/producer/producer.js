import { kafka } from "../config/kafkaClient.js";

export async function createProducer() {
  const producer = kafka.producer();
  await producer.connect();
  console.log("Kafka Producer connected");
  return producer;
}

export async function sendMessage(producer, topic, message) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
}

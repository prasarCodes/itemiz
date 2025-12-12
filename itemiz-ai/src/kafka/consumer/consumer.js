import { kafka } from "../config/kafkaClient.js";

export async function createConsumer(groupId, topic, handler) {
  const consumer = kafka.consumer({ groupId });

  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = JSON.parse(message.value.toString());
      await handler(value);
    },
  });

  console.log(`Kafka Consumer running → ${topic}`);
}

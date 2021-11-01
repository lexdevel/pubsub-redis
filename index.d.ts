import { RedisClient } from "redis";

/**
 * Redis pub-sub wrapper class.
 */
export class PubSub {
  /**
   * Constructor.
   * @param {RedisClient} redisClient - Redis client
   */
  constructor(redisClient: RedisClient);

  /**
   * Publish message.
   * @param {string} channel
   * @param {any} message
   */
  publish(channel: string, message: any): void;

  /**
   * Subscribe to the channel.
   * @param {string} channel
   * @param {(message) => void} handler
   */
  subscribe(channel: string, handler: (message: any) => void): void;
}

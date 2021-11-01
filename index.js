import { RedisClient } from 'redis';

/**
 * Redis pub-sub wrapper class.
 */
export class PubSub {
  /**
   * Constructor.
   * @param {RedisClient} redisClient - Redis client
   */
  constructor(redisClient) {
    this.redisClient = redisClient;
    this.subscriptions = [];

    this.redisClient.on('message', (channel, message) => {
      const subscription = this.subscriptions.find(sub => sub.channel === channel);
      if (subscription !== null) {
        subscription.handler(JSON.parse(message));
      }
    });
  }

  /**
   * Publish message.
   * @param {string} channel
   * @param {any} message
   */
  publish(channel, message) {
    this.redisClient.publish(channel, JSON.stringify(message));
  }

  /**
   * Subscribe to the channel.
   * @param {string} channel
   * @param {(message) => void} handler
   */
  subscribe(channel, handler) {
    this.redisClient.subscribe(channel);
    this.subscriptions.push({ channel: channel, handler: handler });
  }
}

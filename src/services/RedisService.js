const redis = require('redis')
const { createAdapter } = require('@socket.io/redis-adapter')

const REDIS_PORT = process.env.REDIS_PORT || 6379

class RedisService {
    constructor({ logger, socketServer }){
        this.logger = logger
        this.connected = false
        this.socketServer = socketServer
        this.client = this.#createClient()
    }

    #createClient () {
        const client = redis.createClient(REDIS_PORT)
        client.on('error', err => this.logger.error(err))
        return client
    }

    async #connectIfNoConnection() {
        if(!this.connected) {
            await this.client.connect()
            const subClient = this.client.duplicate()
            this.socketServer.getIO().adapter(createAdapter(this.client, subClient))
            this.connected = true
        }
    }

    /**
     * Save data into redis
     * @param {any} key 
     * @param {any} value 
     * @returns {Promise<void>}
     */
    async setData (key, value) {
        this.logger.debug(`Inserting: ${key}:${value}`)
        await this.#connectIfNoConnection()
        await this.client.set(key, value)
    }

    /**
     * Retrieve data from redis based on key
     * @param {any} key 
     * @returns {Promise<RedisClient>}
     */
    async getData (key) {
        this.logger.debug(`Getting: ${key}`)
        await this.#connectIfNoConnection()
        return this.client.get(key)
    }
}

module.exports = RedisService
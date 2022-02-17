const redis = require('redis')
const REDIS_PORT = process.env.REDIS_PORT || 6379

class RedisService {
    constructor({ logger }){
        this.logger = logger()
    }

    createClient () {
        const client = redis.createClient(REDIS_PORT)
        client.on('error', err => this.logger.error(err))
        return client
    }

    async setData (key, value) {
        this.logger.debug(`Inserting: ${key}:${value}`)
        const client = this.createClient()
        await client.connect()
        await client.set(key, value)
    }

    async getData (key) {
        this.logger.debug(`Getting: ${key}`)
        const client = this.createClient()
        await client.connect()
        return client.get(key)
    }
}

module.exports = RedisService
const redis = require('redis')
const REDIS_PORT = process.env.REDIS_PORT || 6379

class RedisService {
    constructor({ logger }){
        this.logger = logger
        this.client = null
    }

    setClient () {
        this.client = redis.createClient(REDIS_PORT)
    }

    getClient () {
        return this.client
    }

    setData (key, value) {
        this.client.set(key, value)
    }

    getData (key) {
        return new Promise ((resolve, reject) => {
            this.client.get(key, function (err, data) {
                if(err) reject(err)
                resolve(data)
            })
        })
    }
}

module.exports = RedisService
import * as Redis from 'ioredis'
import {EventEmitter} from 'events'

interface RedisOptions extends Redis.RedisOptions {
  nodes?: Redis.ClusterNode[]
  options?: Redis.ClusterOptions
}

export default class RedisStore extends EventEmitter {
  client: any
  serialize: Function
  unserialize: Function

  constructor(config: RedisOptions) {
    super()
    if (Array.isArray(config.nodes)) {
      this.client = new Redis.Cluster(config.nodes, config.options)
    } else {
      this.client = new Redis(config)
    }

    this.client.on('connect', this.emit.bind(this, 'connect'))
    this.client.on('ready', this.emit.bind(this, 'ready'))
    this.client.on('error', this.emit.bind(this, 'error'))
    this.client.on('close', this.emit.bind(this, 'close'))
    this.client.on('reconnecting', this.emit.bind(this, 'reconnecting'))
    this.client.on('end', this.emit.bind(this, 'end'))

    this.serialize = JSON.stringify
    this.unserialize = JSON.parse

    this.on('error', (err) => {
      console.error(err)
    })
  }

  async get(sid: string) {
    const data = await this.client.get(sid)
    if (!data) {
      return null
    }
    try {
      return this.unserialize(data.toString())
    } catch (err) {}
  }

  async set(sid: string, sess: any, ttl: number) {
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000)
    }
    sess = this.serialize(sess)
    if (ttl) {
      await this.client.set(sid, sess, 'EX', ttl)
    } else {
      await this.client.set(sid, sess)
    }
  }

  async destroy(sid: string) {
    await this.client.del(sid)
  }

  async quit() {
    await this.client.quit()
  }

  async end() {
    await this.client.quit()
  }
}

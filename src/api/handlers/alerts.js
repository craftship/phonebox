import Promise from 'bluebird'
import RedisSMQ from 'rsmq'

const rsmq = Promise.promisifyAll(new RedisSMQ({
  host: 'redis',
  port: 6379,
  ns: 'phonebox'
}))

export default {
  post: async (req, res, next) => {
    try {
      const id = await rsmq.sendMessageAsync({
        qname: 'alerts',
        message: JSON.stringify(req.body)
      })
      res.json({ id })
    } catch (err) {
      next(err)
    }
  }
}

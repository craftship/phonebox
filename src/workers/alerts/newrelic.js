import RSMQWorker from 'rsmq-worker'

export default function (rsmq) {
  const worker = new RSMQWorker('alerts', { rsmq })

  worker.on('message', (message, next) => {
    console.log(JSON.parse(message))
    next()
  })

  worker.on('error', (err, msg) => {
    console.log('ERROR', err, msg.id)
  })

  worker.on('exceeded', msg => {
    console.log('EXCEEDED', msg.id)
  })

  worker.on('timeout', msg => {
    console.log('TIMEOUT', msg.id, msg.rc)
  })

  worker.start()
}


import Redis from 'ioredis'

const redis = new Redis(6379, 'localhost');

console.log('Setting Rem')
redis.set('rem', 'kim').catch(err => console.error(err))

redis.get('rem', (err, res) => {
  if (err != null) return console.log(err)

  if (res != null) console.log(res)
})

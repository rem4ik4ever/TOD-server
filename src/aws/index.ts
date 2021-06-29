import AWS from 'aws-sdk';

AWS.config.getCredentials((err) => {
  if (err != null) console.log(err)
  else {
    console.log('Access key', AWS.config.credentials?.accessKeyId)
  }
})

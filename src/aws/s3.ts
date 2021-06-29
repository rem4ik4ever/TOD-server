import { GetObjectCommand, GetObjectCommandInput, S3Client } from '@aws-sdk/client-s3'
import { isDefined } from '../utils';
const REGION = isDefined(process.env.AWS_S3_REGION) === true ? process.env.AWS_S3_REGION : 'us-east-1';
export const s3Client = new S3Client({ region: REGION })

export const getObject = async (params: GetObjectCommandInput): Promise<any> => {
  const command = new GetObjectCommand(params);
  return await s3Client.send(command);
}

export const streamToString = async (stream: any): Promise<string> =>
  await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (chunk: Uint8Array) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });

// async function test (): Promise<void> {
//  const file = await getObject({
//    Bucket: 'todbucket195016-dev',
//    Key: 'public/86703b5c-6ec4-4610-8d19-4585801c854e_71917b5c-392f-4bfa-b088-74555dbb2c24'
//  })
//  const content = await streamToString(file.Body)
//  console.log({ content })
// }

// test().catch(err => console.error(err))

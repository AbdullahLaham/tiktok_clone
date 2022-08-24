import { NextApiRequest, NextApiResponse } from 'next';

import { postDetailQuery } from '../../utils/queries';
import { client } from '../../utils/client';

export default async function handler(req= NextApiRequest, res= NextApiResponse) {
  if (req.method === 'POST') {
    const query = postDetailQuery();
    const data = req.body;
    // const data = await client.fetch(query);
    await client.createIfNotExists(data)
    .then(() => {
        res.status(200).json('Login Success')
    })
    .catch(err => console.log(err))
//     res.status(200).json(data);
//   } else if (req.method === 'POST') {
//     const doc = req.body;

//     client.create(doc).then(() => {
//       res.status(200).json('video created');
//     });
  }
}
import { NextApiRequest, NextApiResponse } from 'next';

import { allUsersQuery } from '../../utils/queries';
import { client } from '../../utils/client';

export default async function handler(req= NextApiRequest, res= NextApiResponse) {
  await client.fetch(`*[_type == "user"]`)
  .then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.json([]);
    console.log('err', err)
  })
}
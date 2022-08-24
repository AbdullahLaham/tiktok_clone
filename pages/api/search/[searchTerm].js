import { NextApiRequest, NextApiResponse } from 'next';

import { searchPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req= NextApiRequest, res= NextApiResponse) {
    if (req.method === 'GET') {
        const {searchTerm} = req.query;
        const query = searchPostsQuery(searchTerm)
        const response = await client.fetch(query)
        res.status(200).json(response);

    }
//   await client.fetch(`*[_type == "user"]`)
//   .then(data => {
//     res.status(200).json(data);
//   }).catch(err => {
//     res.json([]);
//     console.log('err', err)
//   })
}
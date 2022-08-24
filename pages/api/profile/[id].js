import { NextApiRequest, NextApiResponse } from 'next';

import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req= NextApiRequest, res= NextApiResponse) {
  if (req.method === 'GET') {
    const {id} = req.query;
    const userLikedPosts = userLikedPostsQuery(id);
    const userCreatedPosts = userCreatedPostsQuery(id);
    const query = singleUserQuery(id);
    const userVideos = await client.fetch(userLikedPosts)
    const userLikedVideos = await client.fetch(userCreatedPosts)
    await client.fetch(query)
    .then(user => {
        res.status(200).json({user, userVideos, userLikedVideos});
    }).catch(err => {
        res.json([]);
    })
  }
}

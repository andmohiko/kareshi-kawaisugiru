import type { NextApiRequest, NextApiResponse } from 'next'

import { createRouter } from 'next-connect'
import { fetchKareshiByUsernameOperation } from '~/infrastructures/adminFirestore/KareshiOperations'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.get(async (req, res) => {
  const username =
    typeof req.query.username === 'string' ? req.query.username : undefined
  if (!username) {
    res.status(400).json({
      status: 400,
      message: 'Empty username',
    })
    return
  }

  // usernameが3文字以下ならinvalidなIDとして扱う
  if (username.length <= 3) {
    res.status(400).json({
      status: 400,
      message: 'Invalid username',
    })
    return
  }

  const kareshi = await fetchKareshiByUsernameOperation(username)
  if (!kareshi) {
    res.status(404).json({
      status: 404,
      message: `Kareshi ${username} not found`,
    })
    return
  }

  res.status(200).json(kareshi)
})

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },
  onNoMatch: (req, res) => {
    res.status(405).json({
      status: 405,
      message: 'Method Not Allowed',
    })
  },
})

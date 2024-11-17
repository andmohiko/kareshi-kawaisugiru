import type { NextApiRequest, NextApiResponse } from 'next'

import { createRouter } from 'next-connect'
import { fetchKareshiByIdOperation } from '~/infrastructures/adminFirestore/KareshiOperations'

const router = createRouter<NextApiRequest, NextApiResponse>()

router.get(async (req, res) => {
  const kareshiId = typeof req.query.id === 'string' ? req.query.id : undefined
  if (!kareshiId) {
    res.status(400).json({
      status: 400,
      message: 'Empty id',
    })
    return
  }

  const kareshi = await fetchKareshiByIdOperation(kareshiId)
  if (!kareshi) {
    res.status(404).json({
      status: 404,
      message: `Kareshi ${kareshiId} not found`,
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

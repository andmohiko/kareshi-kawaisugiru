import nc from 'next-connect'

import type { NextApiRequest, NextApiResponse } from 'next'

import { Scene, ScenesCollection } from '~/entities'
import { db } from '~/lib/admin'

const scene = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },
  onNoMatch: (req, res) => {
    res.status(405).json({
      status: 405,
      message: 'Method Not Allowed',
    })
  },
}).get(async (req, res) => {
  const sceneId = typeof req.query.id === 'string' ? req.query.id : undefined
  if (!sceneId) {
    res.status(200).json({
      status: 200,
      message: 'Empty sceneId',
    })
    return
  }

  const sceneRef = await db.collection(ScenesCollection).doc(sceneId).get()
  const scene = {
    sceneId: sceneId,
    ...sceneRef.data(),
  } as Scene

  res.status(200).json({
    status: 200,
    message: `Success getting ${sceneId}`,
    data: scene,
  })
})

export default scene

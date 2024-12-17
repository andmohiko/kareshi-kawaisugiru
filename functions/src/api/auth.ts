import type { LoggedInRequest, NextFunction, Response } from 'express'

import { auth } from '../firebase'

exports.handle = async (
  req: LoggedInRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return next()
    }
    const token = (
      typeof authHeader === 'string' ? authHeader : authHeader[0]
    ).split(' ')[1]
    // tokenがなかったらunauthorizedを返す
    if (!token) {
      return res.status(401).send({ error: 'Token not provided' })
    }
    const decodedToken = await auth.verifyIdToken(token)
    // decodedTokenが無効ならunauthorizedを返す
    if (!decodedToken) {
      return res.status(401).send({ error: 'Invalid token' })
    }
    req.currentUser = decodedToken
    return next()
  } catch (_) {
    return next()
  }
}

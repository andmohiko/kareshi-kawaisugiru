/* eslint-disable @typescript-eslint/no-var-requires */
import { check } from 'express-validator'

const router = require('express-promise-router')()

// 認証が必要なAPI
router.use(require('./api/auth').handle)

router.post(
  '/kareshis/ogpImage',
  [
    check('imagePath').exists(),
    check('kareshiName').exists(),
    check('userId').exists(),
  ],
  require('./api/kareshi/generateOgpImagePath').handle,
)

export default router

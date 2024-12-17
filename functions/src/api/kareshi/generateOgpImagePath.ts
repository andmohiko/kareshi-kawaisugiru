import type { Request, Response } from 'express'

import { generateOgpImage } from '../../useCases/generateOgpImage'

exports.handle = async (req: Request, res: Response) => {
  try {
    const { imagePath, kareshiName, userId } = req.body
    const uploadPath = `images/users/${userId}`

    const ogpImagePath = await generateOgpImage(
      imagePath,
      kareshiName,
      uploadPath,
    )
    return res.status(200).send({ ogpImagePath })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ error })
  }
}

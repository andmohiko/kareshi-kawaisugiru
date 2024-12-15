import type { SKRSContext2D } from '@napi-rs/canvas'

export const drawCanvasText = (
  ctx: SKRSContext2D,
  fontSize: number,
  font: string,
  color: string,
  text: string,
  x: number,
  y: number,
  align: CanvasTextAlign = 'start',
  baseline: CanvasTextBaseline = 'alphabetic',
  fontWeight: string = '',
) => {
  if (baseline) {
    ctx.textBaseline = baseline
  }
  if (align) {
    ctx.textAlign = align
  }

  ctx.font = `${fontWeight} ${fontSize}px ${font}`
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
}

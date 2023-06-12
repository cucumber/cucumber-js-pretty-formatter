import { styleText, TextStyle } from './styleText.js'

export const indentStyleText = (
  indent: number,
  text: string,
  styles: TextStyle[] = []
): string =>
  text.replace(/^(.+)$/gm, (subText) =>
    subText.trim().length === 0
      ? ''
      : `${' '.repeat(indent)}${styleText(subText.trimRight(), ...styles)}`
  )

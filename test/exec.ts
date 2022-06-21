import { execFileSync } from 'child_process'
import { join } from 'path'

import { ThemeStyles } from '../src/theme'

const cmd = 'node_modules/.bin/cucumber-js'

type RunOptionalOptions = {
  '--name'?: string
  '--tags'?: string[]
}
type RunOptions = {
  colorsEnabled?: boolean
  theme?: Partial<ThemeStyles>
}
type FinalRunOptions = RunOptionalOptions & Required<RunOptions>

export const run = async (
  fileName: string,
  options: RunOptions & RunOptionalOptions = {},
  throws = false
): Promise<string> => {
  const { colorsEnabled, theme }: FinalRunOptions = {
    colorsEnabled: false,
    theme: {},
    ...options,
  }
  const args = [
    '--publish-quiet',
    '--require',
    join(__dirname, 'features'),
    '--format',
    join(__dirname, '..', 'src'),
    '--format-options',
    JSON.stringify({ colorsEnabled, theme }),
  ]
  if (options['--name']) args.push('--name', options['--name'])
  if (options['--tags']) args.push('--tags', options['--tags'].join(','))

  return exec(throws, ...args, join('test', 'features', fileName)).replace(
    /\d+m\d+\.\d+s/g,
    '0m00.000s'
  )
}

const exec = (throws: boolean, ...args: string[]): string => {
  if (process.env.LOG_CUCUMBER_RUN) console.log(`${cmd} ${args.join(' ')}`)

  let stdout: string
  try {
    stdout = execFileSync(cmd, args, { stdio: 'pipe' }).toString()
  } catch (error) {
    stdout = error.stdout.toString()
    if (throws) throw error
  }

  if (process.env.LOG_CUCUMBER_RUN) console.log(stdout)
  return stdout
}

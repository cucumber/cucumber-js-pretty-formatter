import 'should'

import { run } from './exec'

describe('Tag', () => {
  it('log feature tags', async () => {
    const result = await run('tag.feature', { '--name': 'Feature tag' })
    result.should.startWith('@feature @tag\n' + 'Feature: Tag')
  })

  it('logs scenario tags', async () => {
    const result = await run('tag.feature', { '--name': 'Scenario tag' })
    result.should.containEql(
      '  @feature @tag @scenario\n' + '  Scenario: Scenario tag'
    )
  })

  it('logs scenario outline tags', async () => {
    const result = await run('tag.feature', {
      '--name': 'Scenario outline tag',
    })
    result.should.containEql(
      '  @feature @tag @scenario-outline @example\n' +
        '  Scenario Outline: Scenario outline tag'
    )
  })
})

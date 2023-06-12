import 'should'

import { run } from './exec.js'

describe('Scenario', () => {
  it('logs scenario names', async () => {
    const result = await run('scenario.feature', { name: ['Scenario name'] })
    result.should.containEql(
      '  Scenario: Scenario name # test/features/scenario.feature:3\n'
    )
  })

  it('logs new lines between scenarios', async () => {
    const result = await run('scenario.feature', { name: ['Scenario \\d'] })
    result.should.containEql(
      'Feature: Scenario # test/features/scenario.feature:1\n' +
        '\n' +
        '  Scenario: Scenario 1 # test/features/scenario.feature:7\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario: Scenario 2 # test/features/scenario.feature:11\n' +
        '    When noop\n' +
        '    Then noop\n'
    )
  })
})

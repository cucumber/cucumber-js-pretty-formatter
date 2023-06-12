import 'should'

import { run } from './exec.js'

describe.only('Background', () => {
  it('does not log backgrounds', async () => {
    const result = await run('background.feature')
    result.should.startWith(
      'Feature: Background # test/features/background.feature:1\n' +
        '\n' +
        '  Scenario: Background scenario # test/features/background.feature:6\n' +
        '    Given noop\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario Outline: Background scenario outline # test/features/background.feature:10\n' +
        '    Given noop\n' +
        '    When noop "bar"\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario Outline: Background scenario outline # test/features/background.feature:10\n' +
        '    Given noop\n' +
        '    When noop "baz"\n' +
        '    Then noop'
    )
  })
})

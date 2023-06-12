import 'should'

import { run } from './exec.js'

describe('Description', () => {
  it('logs feature descriptions', async () => {
    const result = await run('description.feature')
    result.should.startWith(
      'Feature: Description # test/features/description.feature:1\n' +
        '\n' +
        '  **I like**\n' +
        '  To describe\n' +
        '  My _features_\n' +
        '\n'
    )
  })

  it('does not log scenario descriptions', async () => {
    const result = await run('description.feature')
    result.should.containEql(
      '  Scenario: Description scenario # test/features/description.feature:7\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario Outline: Description scenario outline # test/features/description.feature:14\n' +
        '    When noop "bar"\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario Outline: Description scenario outline # test/features/description.feature:14\n' +
        '    When noop "baz"\n' +
        '    Then noop'
    )
  })
})

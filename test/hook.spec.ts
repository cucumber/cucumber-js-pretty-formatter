import 'should'

import { run } from './exec.js'

describe('Hook', () => {
  it('does not log hooks', async () => {
    const result = await run('hook.feature')
    result.should.startWith(
      'Feature: Hook # test/features/hook.feature:1\n' +
        '\n' +
        '  @before @after\n' +
        '  Scenario: Hook # test/features/hook.feature:4\n' +
        '    When noop\n' +
        '    Then noop\n'
    )
  })
})

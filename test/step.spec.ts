import 'should'

import { run } from './exec.js'

describe('Step', () => {
  it('logs steps', async () => {
    const result = await run('step.feature', { name: ['Step name'] })
    result.should.containEql(
      '    Given noop\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '    And noop\n' +
        '    But noop\n'
    )
  })

  it('warns about ambiguous steps', async () => {
    const result = await run('step.feature', { name: ['Ambiguous step'] })
    result.should.containEql('    When ambiguous\n' + '    ✖ ambiguous\n')
  })

  it('warns about failed steps', async () => {
    const result = await run('step.feature', { name: ['Failed step'] })
    result.should.containEql('    When failed\n' + '    ✖ failed\n')
  })

  it('logs passed steps', async () => {
    const result = await run('step.feature', { name: ['Passed step'] })
    result.should.match(/ {4}When passed\n(?! {4})/)
  })

  it('logs pending steps', async () => {
    const result = await run('step.feature', { name: ['Pending step'] })
    result.should.containEql('    When pending\n' + '    ? pending\n')
  })

  it('logs skipped steps', async () => {
    const result = await run('step.feature', { name: ['Skipped step'] })
    result.should.containEql('    When skipped\n' + '    - skipped\n')
  })

  it('logs undefined steps', async () => {
    const result = await run('step.feature', { name: ['Undefined step'] })
    result.should.containEql('    When undefined\n' + '    ? undefined\n')
  })

  it('logs errors', async () => {
    const result = await run('step.feature', { name: ['Failed step'] })
    result.should.containEql(
      '    When failed\n' +
        '    ✖ failed\n' +
        '      Error: FAILED\n' +
        '          at World'
    )
  })
})

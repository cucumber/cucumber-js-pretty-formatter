import 'should'

import { run } from './exec'

describe('Doc String', () => {
  it('logs doc strings', async () => {
    const result = await run('doc-string.feature')
    result.should.containEql(
      '    When doc string:\n' +
        '      """\n' +
        '      foo\n' +
        '      bar\n' +
        '      """\n' +
        '    Then noop\n'
    )
  })

  it('preserves doc string indentation', async () => {
    const result = await run('doc-string.feature')
    result.should.containEql(
      '    When doc string:\n' +
        '      """\n' +
        '      foo\n' +
        '        bar\n' +
        '          baz\n' +
        '      /foo\n' +
        '      """\n'
    )
  })
})

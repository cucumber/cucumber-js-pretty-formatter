import 'should'

import { run } from './exec'

describe('Data Table', () => {
  it('logs data tables', async () => {
    const result = await run('data-table.feature')
    result.should.containEql(
      '    When data table:\n' +
        '      │ foo   │ bar   │\n' +
        '      │ lorem │ ipsum │\n'
    )
  })
})

import 'should'

import { run } from './exec'

describe('World', () => {
  it('should not throw colors error', async () => {
    const result = await run('world.feature')
    result.should.containEql('\n\u001b[34mWORLD\u001b[39m\n')
  })
})

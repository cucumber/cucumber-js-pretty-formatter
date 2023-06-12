import 'should'

import { run } from './exec.js'

describe('Internationalization', () => {
  it('logs French', async () => {
    const result = await run('fr.feature', {
      name: ['Nom du Scénario'],
    })
    result.should.startWith(
      'Fonctionnalité: Nom de la Fonctionnalité # test/features/fr.feature:2\n' +
        '\n' +
        '  Scénario: Nom du Scénario # test/features/fr.feature:4\n' +
        '    Quand noop\n' +
        '    Alors noop\n'
    )
  })

  it('logs Russian', async () => {
    const result = await run('ru.feature', { name: ['Сценарий name'] })
    result.should.startWith(
      'Функция: Функция Name # test/features/ru.feature:2\n' +
        '\n' +
        '  Сценарий: Сценарий name # test/features/ru.feature:4\n' +
        '    Когда noop\n' +
        '    Тогда noop\n'
    )
  })
})

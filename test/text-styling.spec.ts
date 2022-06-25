import 'should'

import { indentStyleText } from '../src/indentStyleText'
import { styleText, TextStyle } from '../src/styleText'
import { ThemeItem, ThemeStyles } from '../src/theme'
import { run } from './exec'

describe('Text styling', () => {
  const runColored = (
    fileName: string,
    name?: string,
    theme?: Partial<ThemeStyles>,
    throws = false
  ) =>
    run(
      fileName,
      { name: name ? [name] : undefined },
      { colorsEnabled: true, theme },
      throws
    )

  it('fails with unknown styles', async () => {
    const theme: Partial<ThemeStyles> = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [ThemeItem.FeatureKeyword]: ['ultraviolet'],
    }
    try {
      await runColored('step.feature', 'Step name', theme, true)
      throw new Error('Should have failed')
    } catch (error) {
      error.toString().should.containEql('Error: Unknown style "ultraviolet"')
    }
  })

  it('fails with unknown theme items', async () => {
    const theme: Partial<ThemeStyles> = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ['unknown theme item']: ['red'],
    }
    try {
      await runColored('step.feature', 'Step name', theme, true)
      throw new Error('Should have failed')
    } catch (error) {
      error
        .toString()
        .should.containEql('Error: Unknown theme item "unknown theme item"')
    }
  })

  describe('customizable items', () => {
    it('styles feature keywords', async () => {
      const result = await runColored('feature.feature', 'Feature name', {
        [ThemeItem.FeatureKeyword]: ['red', 'italic'],
      })
      result.should.containEql(styleText('Feature:', 'red', 'italic'))
    })

    it('styles feature names', async () => {
      const result = await runColored('feature.feature', 'Feature name', {
        [ThemeItem.FeatureName]: ['yellow', 'italic'],
      })
      result.should.containEql(styleText('The Feature', 'yellow', 'italic'))
    })

    it('styles feature descriptions', async () => {
      const result = await runColored('description.feature', undefined, {
        [ThemeItem.FeatureDescription]: ['bgGreen'],
      })
      result.should.containEql(
        indentStyleText(2, '**I like**\nTo describe\nMy _features_', [
          'bgGreen',
        ])
      )
    })

    it('styles feature tags', async () => {
      const s = (tag: string) => styleText(tag, 'bgYellow')
      const result = await runColored('tag.feature', 'Scenario tag', {
        [ThemeItem.Tag]: ['bgYellow'],
      })
      result.should.containEql(`${s('@feature')} ${s('@tag')}\n`)
    })

    it('styles feature locations', async () => {
      const s = (tag: string) => styleText(tag, 'bgYellow')
      const result = await runColored('feature.feature', undefined, {
        [ThemeItem.Location]: ['bgYellow'],
      })
      result.should.containEql(`${s('# test/features/feature.feature:1')}\n`)
    })

    it('styles rule keywords', async () => {
      const result = await runColored('rule.feature', undefined, {
        [ThemeItem.RuleKeyword]: ['yellow'],
      })
      result.should.containEql(`  ${styleText('Rule:', 'yellow')} first rule\n`)
    })

    it('styles rule names', async () => {
      const result = await runColored('rule.feature', undefined, {
        [ThemeItem.RuleName]: ['green'],
      })
      result.should.containEql(`  Rule: ${styleText('first rule', 'green')}\n`)
    })

    it('styles scenario keywords', async () => {
      const result = await runColored('scenario.feature', 'Scenario name', {
        [ThemeItem.ScenarioKeyword]: ['bgYellow'],
      })
      result.should.containEql(
        `${styleText('Scenario:', 'bgYellow')} Scenario name`
      )
    })

    it('styles scenario names', async () => {
      const result = await runColored('scenario.feature', 'Scenario name', {
        [ThemeItem.ScenarioName]: ['bgMagenta'],
      })
      result.should.containEql(
        `  Scenario: ${styleText('Scenario name', 'bgMagenta')}`
      )
    })

    it('styles scenario locations', async () => {
      const s = (tag: string) => styleText(tag, 'bgYellow')
      const result = await runColored('scenario.feature', 'Scenario name', {
        [ThemeItem.Location]: ['bgYellow'],
      })
      result.should.containEql(
        `Scenario: Scenario name ${s('# test/features/scenario.feature:3')}\n`
      )
    })

    it('styles scenario tags', async () => {
      const s = (tag: string) => styleText(tag, 'bgBlue')
      const result = await runColored('tag.feature', 'Scenario tag', {
        [ThemeItem.Tag]: ['bgBlue'],
      })
      result.should.containEql(
        `  ${s('@feature')} ${s('@tag')} ${s('@scenario')}\n`
      )
    })

    it('styles step keywords', async () => {
      const stepStyles: TextStyle[] = ['bgYellow', 'bold']
      const result = await runColored('step.feature', 'Step name', {
        [ThemeItem.StepKeyword]: stepStyles,
      })
      result.should.containEql(
        `    ${styleText('Given', ...stepStyles)} noop\n` +
          `    ${styleText('When', ...stepStyles)} noop\n` +
          `    ${styleText('Then', ...stepStyles)} noop\n`
      )
    })

    it('styles step text', async () => {
      const stepStyles: TextStyle[] = ['bgYellow', 'bold']
      const result = await runColored('step.feature', 'Step name', {
        [ThemeItem.StepText]: stepStyles,
      })
      result.should.containEql(styleText('noop', ...stepStyles))
    })

    it('styles step statuses', async () => {
      const stepStyles: TextStyle[] = ['bgWhite']
      const s = (text: string) => styleText(text, ...stepStyles)
      const result = await runColored('step.feature', 'Failed step', {
        [ThemeItem.StepStatus]: stepStyles,
      })
      result.should.containEql(
        `    ${s('\u001b[31m✖ failed\u001b[39m')}\n      `
      )
    })

    it('styles step messages', async () => {
      const stepStyles: TextStyle[] = ['bgCyan']
      const s = (text: string) => styleText(text, ...stepStyles)
      const result = await runColored('step.feature', 'Failed step', {
        [ThemeItem.StepMessage]: stepStyles,
      })
      result.should.containEql(`      ${s('Error: FAILED')}\n      `)
    })

    it('styles DocString content and delimiters', async () => {
      const result = await runColored('doc-string.feature', undefined, {
        [ThemeItem.DocStringDelimiter]: ['green', 'bgYellow'],
        [ThemeItem.DocStringContent]: ['red', 'bold'],
      })
      result.should.containEql(
        `${indentStyleText(6, '"""', ['green', 'bgYellow'])}\n` +
          `${indentStyleText(6, 'foo\nbar', ['red', 'bold'])}\n` +
          `${indentStyleText(6, '"""', ['green', 'bgYellow'])}\n`
      )
    })

    it('styles DataTables', async () => {
      const styles: TextStyle[] = ['green', 'bgYellow']
      const result = await runColored('data-table.feature', undefined, {
        [ThemeItem.DataTable]: ['green', 'bgYellow'],
      })
      result.should.containEql(
        `      ${styleText('│ foo   │ bar   │', ...styles)}\n` +
          `      ${styleText('│ lorem │ ipsum │', ...styles)}\n`
      )
    })

    it('styles DataTable borders', async () => {
      const border = styleText('│', 'green', 'bgYellow')
      const result = await runColored('data-table.feature', undefined, {
        [ThemeItem.DataTableBorder]: ['green', 'bgYellow'],
      })
      result.should.containEql(
        `      ${border} foo   ${border} bar   ${border}\n` +
          `      ${border} lorem ${border} ipsum ${border}\n`
      )
    })

    it('styles DataTable content', async () => {
      const styles: TextStyle[] = ['green', 'bgYellow']
      const result = await runColored('data-table.feature', undefined, {
        [ThemeItem.DataTableContent]: ['green', 'bgYellow'],
      })
      result.should.containEql(
        `      │ ${styleText('foo', ...styles)}   │ ${styleText(
          'bar',
          ...styles
        )}   │\n` +
          `      │ ${styleText('lorem', ...styles)} │ ${styleText(
            'ipsum',
            ...styles
          )} │\n`
      )
    })
  })

  describe('non-customizable items (colored by Cucumber)', () => {
    it('styles ambiguous steps', async () => {
      const result = await runColored('step.feature', 'Ambiguous step')
      result.should.containEql(`    ${styleText('✖ ambiguous', 'red')}\n`)
    })

    it('styles failed steps', async () => {
      const result = await runColored('step.feature', 'Failed step')
      result.should.containEql(`    ${styleText('✖ failed', 'red')}\n`)
    })

    it('styles pending steps', async () => {
      const result = await runColored('step.feature', 'Pending step')
      result.should.containEql(`    ${styleText('? pending', 'yellow')}\n`)
    })

    it('styles undefined steps', async () => {
      const result = await runColored('step.feature', 'Undefined step')
      result.should.containEql(`    ${styleText('? undefined', 'yellow')}\n`)
    })

    it('styles skipped steps', async () => {
      const result = await runColored('step.feature', 'Skipped step')
      result.should.containEql(`    ${styleText('- skipped', 'cyan')}\n`)
    })

    it('styles errors', async () => {
      const result = await runColored('step.feature', 'Failed step')
      result.should.containEql(`    ${styleText('Error: FAILED', 'red')}`)
    })
  })

  describe('default theme', () => {
    let runResult: string
    before(async () => (runResult = await runColored('step.feature')))

    it('styles feature keywords', () =>
      runResult.should.containEql(styleText('Feature:', 'blueBright', 'bold')))

    it('styles feature names', () =>
      runResult.should.containEql(styleText('Step', 'blueBright', 'underline')))

    it('styles feature tags', () =>
      runResult.should.containEql(styleText('@tag', 'cyan')))

    it('styles rule keywords', () =>
      runResult.should.containEql(styleText('Rule:', 'blueBright', 'bold')))

    it('styles rule names', () =>
      runResult.should.containEql(
        styleText('some rule', 'blueBright', 'underline')
      ))

    it('styles scenario keywords', () =>
      runResult.should.containEql(styleText('Scenario:', 'cyan', 'bold')))

    it('styles scenario names', () =>
      runResult.should.containEql(styleText('Step name', 'cyan', 'underline')))

    it('styles scenario tags', () =>
      runResult.should.containEql(styleText('@stag', 'cyan')))

    it('styles locations', () =>
      runResult.should.containEql(
        styleText('# test/features/step.feature:2', 'dim')
      ))

    it('styles descriptions', () =>
      runResult.should.containEql(styleText('Description', 'gray')))

    it('styles step keywords', () => {
      runResult.should.containEql(styleText('Given', 'cyan'))
      runResult.should.containEql(styleText('When', 'cyan'))
      runResult.should.containEql(styleText('Then', 'cyan'))
    })

    it('does not style step text', () => {
      runResult.should.containEql(styleText('noop'))
    })

    it('styles DocString content and delimiters', () => {
      runResult.should.containEql(
        `${indentStyleText(6, '"""', ['gray'])}\n` +
          `${indentStyleText(6, 'Some multiline\nText', [
            'gray',
            'italic',
          ])}\n` +
          `${indentStyleText(6, '"""', ['gray'])}\n`
      )
    })

    it('styles DataTable borders and content', () => {
      const d = styleText('│', 'gray')
      const s = (text: string) => styleText(text, 'gray', 'italic')

      runResult.should.containEql(
        `      ${d} ${s('a')} ${d} ${s('b')} ${d}\n` +
          `      ${d} ${s('c')} ${d} ${s('d')} ${d}\n`
      )
    })
  })
})

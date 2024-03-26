# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

Please see [CONTRIBUTING.md](https://github.com/cucumber/cucumber/blob/master/CONTRIBUTING.md) on how to contribute to Cucumber.

## Unreleased
### Fixed
- Correct repo URL in `package.json`

## 1.0.0 - 2022-06-30
### Added
- Export default theme to make configuration easier ([#16](https://github.com/cucumber/cucumber-js-pretty-formatter/pull/16))

## [1.0.0-alpha.2]
### Fixed
- Replace `@cucumber/cucumber` deep imports with equivalents from main entry point

## [1.0.0-alpha.1]
### Fixed
- Fix compatibility issues with cucumber-js 7.3.0 [#5](https://github.com/cucumber/cucumber-pretty-formatter/pull/5)

## [v1.0.0-alpha.0]
### Changed
- Thank you Ilya for the work you've done! The objective of this fork is to provide Cucumber users with an officially supported pretty formatter for Cucumber.js.
- This is the first version of the pretty formatter that supports Cucumber.js 7.0.0 and above, now based on [cucumber-messages](https://github.com/cucumber/cucumber/tree/master/messages) (instead of the now deceased event protocol).
- All the codebase has been migrated to TypeScript, yey!
- The pretty formatter can now be customised! Ansi styles can be applied to almost all elements of the output.
- The latest addition to the Gherkin syntax, the `Rule` keyword, is supported.

[1.0.0-alpha.2]: https://github.com/cucumber/cucumber-pretty-formatter/compare/v1.0.0-alpha.1...v1.0.0-alpha.2
[1.0.0-alpha.1]: https://github.com/cucumber/cucumber-pretty-formatter/compare/v1.0.0-alpha.0...v1.0.0-alpha.1
[v1.0.0-alpha.0]: https://github.com/cucumber/cucumber-pretty-formatter/compare/03f000d68098f854b9596f812a474857df675491...v1.0.0-alpha.0

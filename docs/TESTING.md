# Testing

_[Português](pt-BR/TESTES.md) | English_

> **For whom:** whoever writes a fix or a component and needs to know which test to write, and
> whoever reviews it.
> **What is here:** what each suite proves, the acceptance criterion, and what no test covers.
> **Where to go for the rest:** how to add a piece is in [EXTENDING.md](EXTENDING.md); a red
> test with its message is in [WHEN-IT-BREAKS.md](WHEN-IT-BREAKS.md).

## Contents

1. [The gate](#1-the-gate)
2. [What each suite proves](#2-what-each-suite-proves)
3. [Acceptance criterion](#3-acceptance-criterion)
4. [What no test covers](#4-what-no-test-covers)

## 1. The gate

```bash
yarn verificar
```

Lint, format, tests and `app check --sdk`, the same command as CI
([.github/workflows/ci.yml](../.github/workflows/ci.yml)) and the pre-push. The tests are
Vitest in jsdom ([vite.config.js](../vite.config.js)); [test/preparar.js](../test/preparar.js)
unmounts every component and empties `body` after each test, so no test starts with a dirty
document. Measured on 18/11/2026: 5 files, 38 tests.

## 2. What each suite proves

| File                                                        | Tests | Proves                                                                                                                                                              |
| ----------------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [test/componentes.spec.js](../test/componentes.spec.js)     | 14    | each component's ARIA, variants, events; sheet closes by scrim, close and drag (110 px), lives in the app root; confirmation opens on Cancel                        |
| [test/comportamento.spec.js](../test/comportamento.spec.js) | 11    | `RosFolha` and `RosConfirmar` pass the five behaviours with no `pular`; the pack has exactly those five keys                                                        |
| [test/documento.spec.js](../test/documento.spec.js)         | 4     | opening, typing and closing touch no `body`/`<html>` style or class and add no listener from `src/` to `document` or `window`; Esc does not bubble                  |
| [test/foco.spec.js](../test/foco.spec.js)                   | 5     | focus returns to the opener; falls back to the overlay it lives in when the opener is disabled (QR Code, 28/09/2026); never invented; stays where the person put it |
| [test/regras.spec.js](../test/regras.spec.js)               | 4     | the SDK rules (no RoqueOS, no database, only allowed variables), only `vue` imports, every `ICONES` entry is a valid path, every literal icon used is in the list   |

Counts per file as printed by `yarn test` on 18/11/2026.

## 3. Acceptance criterion

- `yarn verificar` green, output pasted in the pull request or in the chat.
- Every fix comes with a test that fails without it.
- A new check goes through mutation before it counts: break what it guards and see it fail.
  The CHANGELOG records the count (for example 0.6.0: 5 mutants killed; 0.1.0: 13 of 13).
- A visible change also needs the showcase open (`yarn dev`) with a screenshot.

## 4. What no test covers

The tests run in jsdom. Real layout, the drag with a real finger, Safari's Tab, the TV D-pad and
the iPhone keyboard over the sheet are proven only by hand, in `yarn dev` and in each app's
device QA. Not proven by any automated test here.

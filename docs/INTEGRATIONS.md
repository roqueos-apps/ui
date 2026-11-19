# Integrations

_[Português](pt-BR/INTEGRACOES.md) | English_

> **For whom:** the author of an app that uses the kit, and whoever maintains the RoqueOS side.
> **What is here:** how the package is installed, what it exports, the behaviour pack as an
> API, and the single copy RoqueOS forces.
> **Where to go for the rest:** every prop is in [REFERENCE.md](REFERENCE.md); releasing a tag
> is in [OPERATIONS.md](OPERATIONS.md).

## Contents

1. [Installing the package](#1-installing-the-package)
2. [What the package exports](#2-what-the-package-exports)
3. [The behaviour pack](#3-the-behaviour-pack)
4. [The single copy in RoqueOS](#4-the-single-copy-in-roqueos)

The kit has no network API, CLI, MCP or webhook. Its surface is the npm package that other
repositories install from git.

## 1. Installing the package

```json
{ "dependencies": { "@roqueos-apps/ui": "github:roqueos-apps/ui#v0.6.0" } }
```

Always an exact tag, never a branch or a loose commit. `vue` is a peer dependency (`^3.5.0`):
the app brings its own. The app's Vite compiles the kit's `.vue` files from source, like the
app's own. Current consumers:

| Consumer             | How it pins                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Notes (`notas`)      | `github:roqueos-apps/ui#v0.6.0` in `dependencies`                                            |
| QR Code              | `github:roqueos-apps/ui#v0.6.0` in `dependencies`                                            |
| Whiteboard (`lousa`) | `github:roqueos-apps/ui#v0.6.0` in `dependencies`                                            |
| Camera               | `github:roqueos-apps/ui#v0.6.0` in `dependencies`                                            |
| `roqueos-front`      | `git+ssh://git@github.com/roqueos-apps/ui.git#v0.6.0` in `devDependencies` and `resolutions` |

The list was read from each repository's `package.json` on 18/11/2026.

The app root must be positioned (`position: relative`) for the sheet and the confirmation, and
every text is passed already translated.

## 2. What the package exports

| Import                                                                                                    | What for                                      |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `import { RosIcone, RosBotao, RosInterruptor, RosFolha, RosConfirmar, RosVazio } from '@roqueos-apps/ui'` | the components                                |
| `import { ICONES } from '@roqueos-apps/ui'`                                                               | to list or check icon names                   |
| `import { prenderFoco, focaveis } from '@roqueos-apps/ui'`                                                | to trap focus in a panel of the app's own     |
| `import { testarSobreposicao, COMPORTAMENTOS } from '@roqueos-apps/ui/comportamento'`                     | to run the behaviour pack against any overlay |

## 3. The behaviour pack

The pack lets any overlay, from the kit or not, be held to the same five behaviours.

```js
import { describe, test, expect } from 'vitest'
import { testarSobreposicao } from '@roqueos-apps/ui/comportamento'

testarSobreposicao(
  { describe, test, expect },
  {
    nome: 'ROSModal',
    montar,
    pular: { tabDaVolta: 'o ROSModal não prende o Tab' },
  },
)
```

| Parameter | Required | Meaning                                                                                                                                        |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `nome`    | yes      | name in the `describe` title                                                                                                                   |
| `montar`  | yes      | returns (or resolves to), with the overlay closed and mounted in the `document`: `quemAbre`, `abrir()`, `aberta()`, `dialogo()`, `desmontar()` |
| `pular`   | no       | per key of `COMPORTAMENTOS`, why this side does not meet it yet; the case becomes `test.skip` with the reason in the title                     |
| `esperar` | no       | how to wait between steps; default `setTimeout(0)`                                                                                             |

The behaviours (`COMPORTAMENTOS`): `papel` (a modal dialog for the screen reader), `focoEntra`,
`escFecha`, `focoVolta`, `tabDaVolta` (every Tab and Shift+Tab moves inside and wraps). The kit's
own `montar` is [test/montar.js](../test/montar.js), a good model.

## 4. The single copy in RoqueOS

The RoqueOS front installs each app as a dependency and the kit as a devDependency. Its
`resolutions` forces one copy of the kit, at the front's tag, and its test
`apps-de-primeira-parte` fails if `resolutions` differs from `devDependencies` or if an
installed app has its own `node_modules/@roqueos-apps/ui`. Two copies would be two kits on the
screen. The consequence for the kit is in [OPERATIONS.md](OPERATIONS.md#3-update-without-breaking):
inside 0.x it changes only in compatible ways, or every app moves together.

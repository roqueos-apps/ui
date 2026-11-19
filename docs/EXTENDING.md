# Extending

_[Português](pt-BR/ESTENDER.md) | English_

> **For whom:** whoever needs a component, an icon or an overlay behaviour that the kit does
> not have yet.
> **What is here:** the three extension points, step by step, and which test enforces each
> rule.
> **Where to go for the rest:** what the tests prove is in [TESTING.md](TESTING.md); the
> contribution rules are in [CONTRIBUTING.md](../CONTRIBUTING.md).

## Contents

1. [Add a component](#1-add-a-component)
2. [Add an icon](#2-add-an-icon)
3. [Add a behaviour to the pack](#3-add-a-behaviour-to-the-pack)
4. [Add a theme variable](#4-add-a-theme-variable)

## 1. Add a component

A component enters with the first app that needs it, in the same cycle: open an issue first
([CONTRIBUTING.md](../CONTRIBUTING.md)).

1. Write `src/RosNome.vue` with `<script setup>`, importing only `vue` and `./` files.
2. Every visible text by prop, no default text. Colours only through `var(--ros-...)` from the
   allowed list, always with a fallback; your own variables as `--rui-*`; classes as `rui-*`.
3. If it is an overlay, it lives inside the app root (`position: absolute`), handles its own
   Esc with `.stop`, and calls `useSobreposicao` from [src/sobreposicao.js](../src/sobreposicao.js).
4. Export it in [src/index.js](../src/index.js) and show it in [dev/Vitrine.vue](../dev/Vitrine.vue)
   in the states that matter.
5. Test it in [test/componentes.spec.js](../test/componentes.spec.js); an overlay also goes
   through `testarSobreposicao` in [test/comportamento.spec.js](../test/comportamento.spec.js)
   with no `pular`, and into the `casos` of [test/documento.spec.js](../test/documento.spec.js).
6. Add the row to the README component table, the props to [REFERENCE.md](REFERENCE.md), a
   minor version line to [CHANGELOG.md](../CHANGELOG.md).

```bash
yarn verificar
yarn dev
```

| Rule                                             | Enforced by                                                                            |
| ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| imports only `vue` and `./`                      | `o kit só importa vue e arquivo dele` in [test/regras.spec.js](../test/regras.spec.js) |
| no Quasar, no RoqueOS, no database               | `conferirImportsDoRoqueOS`, `conferirBanco` in the same file                           |
| only allowed `--ros-*` variables, never declared | `conferirVariaveis` in the same file                                                   |
| does not touch the `document`                    | [test/documento.spec.js](../test/documento.spec.js), for the components in `casos`     |
| overlay behaviour                                | [test/comportamento.spec.js](../test/comportamento.spec.js)                            |
| no undeclared component in a template            | `vue/no-undef-components` in [eslint.config.js](../eslint.config.js)                   |

## 2. Add an icon

The icon list is a contract: `RosIcone` refuses a name outside it. Get a checkout of
`@quasar/extras` (the one in `roqueos-front/node_modules/@quasar/extras` serves) and run:

```bash
node scripts/icones.mjs <path to @quasar/extras> qr_code_2 download
yarn verificar
```

It prints `N ícones em src/icones.js (@quasar/extras 1.18.0)` and rewrites the file sorted by
name, keeping the ones already there. Never edit [src/icones.js](../src/icones.js) by hand. Put
the icon in the same pull request as the component or app that uses it, and note it in the
CHANGELOG. If the `@quasar/extras` version changes, update the row in [ASSETS.md](../ASSETS.md).

## 3. Add a behaviour to the pack

A new overlay behaviour is a change to what both families must do.

1. Add the key and its description to `COMPORTAMENTOS` and a `caso(...)` to
   `testarSobreposicao` in [src/comportamento.js](../src/comportamento.js).
2. Update the expected keys in [test/comportamento.spec.js](../test/comportamento.spec.js);
   the kit must pass with no `pular`.
3. Check the mutation: break the behaviour in the kit and see the test fail, then put it back
   (CLAUDE.md: a new check goes through mutation before it counts).
4. Release a minor version and tell the front: on the bump, the RoqueOS side either meets the
   behaviour or records it in its `PULAR` with the reason ([OPERATIONS.md](OPERATIONS.md#3-update-without-breaking)).

## 4. Add a theme variable

The kit cannot add a `--ros-*` variable by itself. The variable enters
`VARIAVEIS_DO_SISTEMA` in the `app-sdk` first, with a tag (and RoqueOS fails if it disappears
from the theme); then the kit bumps its devDependency `@roqueos-apps/app-sdk` to that tag in
[package.json](../package.json), runs `yarn verificar`, and uses it with a fallback.

# When it breaks

_[Português](pt-BR/QUANDO-QUEBRA.md) | English_

> **For whom:** whoever has a red gate, a failing install, or an overlay of the kit misbehaving
> in an app.
> **What is here:** a first diagnostic command, then, by area, what shows up, the cause and
> what to do, with the literal message. A failure that already happened carries its date.
> **Where to go for the rest:** how the parts fit is in [ARCHITECTURE.md](ARCHITECTURE.md);
> the normal routine is in [OPERATIONS.md](OPERATIONS.md).

## Contents

1. [Install](#1-install)
2. [Gate and CI](#2-gate-and-ci)
3. [In the app](#3-in-the-app)
4. [In RoqueOS](#4-in-roqueos)

Start with the gate: it says which of its four steps failed.

```bash
yarn verificar
```

The messages below are quoted as the programs print them, in Portuguese when the program
speaks Portuguese.

## 1. Install

| What shows up                                                            | Cause                                                                                                                                | What to do                                                                                                                 |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `Permission denied (publickey)` while installing the kit                 | an address by SSH (`git+ssh://git@github.com/roqueos-apps/ui.git#...`, still used in the RoqueOS front) on a machine without the key | in an app use `github:roqueos-apps/ui#vX.Y.Z`, over HTTPS; the repo opened on 29/09/2026 ([CHANGELOG.md](../CHANGELOG.md)) |
| The hook says `usa yarn (yarn add, yarn dlx, yarn create), nao npm/npx.` | `npm` or `npx` in a yarn repository; the `roqueos-kit` hook reads `pkgManager`                                                       | use `yarn`, or `yarn -s <bin>` for a binary in `node_modules/.bin`                                                         |
| yarn refuses the Node version                                            | Node older than 22 (`engines`)                                                                                                       | `nvm use` (the [.nvmrc](../.nvmrc) says 24). The literal yarn message was not reproduced here                              |

## 2. Gate and CI

| What shows up                                                                                                                        | Cause                                                                                           | What to do                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `[warn] Code style issues found in the above file. Run Prettier with --write to fix.`                                                | a file, Markdown included, out of the [.prettierrc](../.prettierrc) format                      | `yarn format`, review the diff, commit                                                                                                 |
| `REPROVOU  scripts de instalação` and `package.json declara "postinstall", que roda sozinho no install de quem depende deste pacote` | an install-time script in `package.json`; it would run on the machine of whoever builds RoqueOS | remove the script; nothing in the kit needs one                                                                                        |
| A failing `regras.spec.js` diff with `usa --ros-..., que não está entre as variáveis do sistema que um app pode usar (...)`          | a `var(--ros-...)` outside `VARIAVEIS_DO_SISTEMA`                                               | add the variable to the `app-sdk` first, with a tag, then bump the SDK here ([OPERATIONS.md](OPERATIONS.md#3-update-without-breaking)) |
| A failing `regras.spec.js` diff with `declara --ros-...: o prefixo --ros- é do sistema, a variável do app usa outro`                 | the kit declared a `--ros-*` variable                                                           | use the `--rui-*` prefix                                                                                                               |
| `o kit só importa vue e arquivo dele` fails, listing `src/...: <package>`                                                            | an import other than `vue` or `./`                                                              | remove it; the kit imports only `vue` ([ARCHITECTURE.md](ARCHITECTURE.md#8-design-decisions))                                          |
| `todo ícone que um componente do kit usa está na lista` fails, listing a name                                                        | a component uses a literal icon not in `ICONES`                                                 | `node scripts/icones.mjs <extras> <name>` ([EXTENDING.md](EXTENDING.md#2-add-an-icon))                                                 |
| `documento.spec.js` fails with a non-empty `doKit` list or a changed `body` style                                                    | kit code added a listener on `document`/`window` or touched `body`/`<html>`                     | move the listener to the overlay element; never style `body`                                                                           |
| `commit 1a2b3c4d sem Signed-off-by. Refaça com: git commit --amend -s (ou git rebase --signoff)` in the `dco` check                  | a commit in the pull request without `Signed-off-by`                                            | `git rebase --signoff main` and push the branch again                                                                                  |
| CI red, local gate green                                                                                                             | environment divergence; CI installs with `--frozen-lockfile` and Node from `.nvmrc`             | reproduce with the same Node and `yarn install --frozen-lockfile --ignore-scripts` before anything else                                |

## 3. In the app

| What shows up                                                                                | Cause                                                                                              | What to do                                                                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| The sheet or the confirmation covers the whole page, or the wrong box                        | the app root has `position: static`; the overlay is `position: absolute; inset: 0`                 | `position: relative` on the app root ([README](../README.md#how-to-use-it-in-an-app))                                                       |
| `[Vue warn]: Invalid prop: custom validator check failed for prop "nome".` and an empty icon | an icon name not in `ICONES`, or a Material Symbols name                                           | add the icon ([EXTENDING.md](EXTENDING.md#2-add-an-icon)); `ink_eraser` does not exist, `cleaning_services` replaced it (0.3.0, 28/09/2026) |
| `"<name>" não existe no Material Icons do @quasar/extras 1.18.0` from `scripts/icones.mjs`   | the name is not in Material Icons                                                                  | pick a Material Icons name                                                                                                                  |
| After confirming, focus lands on `body` and Esc and Tab no longer reach the sheet still open | the opener got disabled (QR Code "Limpar", 28/09/2026); fixed in 0.2.1                             | use 0.2.1 or newer                                                                                                                          |
| In Safari, Tab leaves the sheet from the first button                                        | Safari skips buttons on Tab by default; measured in WebKit on 27/09/2026 and fixed in 0.1.0        | make sure no code of the app takes over Tab inside the overlay                                                                              |
| Dragging the sheet handle down does nothing                                                  | a version before 0.6.0 (parity audit, 28/09/2026), or a drag shorter than 110 px, which returns it | 0.6.0 or newer; drag farther                                                                                                                |
| The loading bar of `RosVazio` does not move                                                  | `leve` is on, or the system asks for reduced motion                                                | intended                                                                                                                                    |
| Esc in an open sheet does not close the RoqueOS window                                       | the sheet stops Esc on purpose                                                                     | intended: close the sheet first                                                                                                             |

## 4. In RoqueOS

| What shows up                                                                              | Cause                                                                                       | What to do                                                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `uma cópia só do kit de interface, a mesma que os testes do front usam` fails in the front | `resolutions` and `devDependencies` point at different tags, or an app brought its own copy | put the same tag in both, reinstall                                               |
| `o que está no PULAR ainda falha de verdade (a lista só encolhe)` fails in the front       | a RoqueOS overlay now meets a behaviour that is still in its `PULAR`                        | remove the line from `PULAR`; the behaviour is enforced from then on              |
| A front overlay test fails right after bumping the kit                                     | a new behaviour in the pack that `ROSModal` or `ROSBottomSheet` does not meet               | fix the RoqueOS component, or add it to `PULAR` with the reason, in the same bump |

# Getting started

_[Português](pt-BR/COMECAR.md) | English_

> **For whom:** whoever is about to run the kit for the first time, to contribute or to see a
> component before using it in an app.
> **What is here:** prerequisites, each command with what it does and how to know it worked,
> the first visible result, and the first-time errors.
> **Where to go for the rest:** using the kit from an app is in
> [INTEGRATIONS.md](INTEGRATIONS.md); what each command accepts is in
> [REFERENCE.md](REFERENCE.md).

## Contents

1. [Prerequisites](#1-prerequisites)
2. [Install](#2-install)
3. [Run the gate](#3-run-the-gate)
4. [Open the showcase](#4-open-the-showcase)
5. [First-time errors](#5-first-time-errors)

## 1. Prerequisites

| What | Version                                                                                 | Command that checks |
| ---- | --------------------------------------------------------------------------------------- | ------------------- |
| Node | 22 or newer (`engines` in [package.json](../package.json)); [.nvmrc](../.nvmrc) says 24 | `node --version`    |
| Yarn | 1.22 (`packageManager` in [package.json](../package.json))                              | `yarn --version`    |
| Git  | any recent one                                                                          | `git --version`     |

The repository is yarn only: there is a [yarn.lock](../yarn.lock) and the `roqueos-kit` hook
refuses `npm` and `npx` here. No SSH key is needed: the only git dependency,
`@roqueos-apps/app-sdk`, comes by HTTPS (`github:roqueos-apps/app-sdk#v0.2.0`).

## 2. Install

```bash
git clone https://github.com/roqueos-apps/ui.git
cd ui
yarn install --ignore-scripts
```

`--ignore-scripts` keeps any dependency's install script from running, which is also what CI
does ([.github/workflows/ci.yml](../.github/workflows/ci.yml) uses
`yarn install --frozen-lockfile --ignore-scripts`). It worked when yarn ends with `Done in`
and `node_modules/@roqueos-apps/app-sdk` exists.

## 3. Run the gate

```bash
yarn verificar
```

It runs, in order, `yarn lint` (ESLint), `yarn format:check` (Prettier, Markdown included),
`yarn test` (Vitest with jsdom) and `yarn app:check` (`app check --sdk` from the SDK). It is the
same command CI and the pre-push run. It worked when the output ends like this (measured on
18/11/2026, 5 test files and 38 tests):

```text
 Test Files  5 passed (5)
      Tests  38 passed (38)
...
$ app check --sdk
ok        scripts de instalação

ok, o repo cumpre o contrato.
Done in 11.77s.
```

The program messages are in Portuguese and are quoted here as they appear.

## 4. Open the showcase

```bash
yarn dev
```

Vite serves [index.html](../index.html), which mounts [dev/Vitrine.vue](../dev/Vitrine.vue):
every component in the states that matter, on a background close to the RoqueOS one. Open the
address Vite prints (by default `http://localhost:5173/`). The first visible result is the page
titled "Kit de interface do RoqueOS" with the 70 icons, the buttons, the switch, the empty state
and a "window" with "Abrir a folha" and "Apagar…". Open the sheet, press Esc, and focus goes
back to the button that opened it. The [README image](capa.jpg) is this page.

Add `?dir=rtl` to the address to see the page in Arabic, right to left: the switch knob moves
the other way ([dev/main.js](../dev/main.js)).

## 5. First-time errors

| What shows up                                                                          | What to do                                                                                               |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| The `roqueos-kit` hook says `usa yarn (yarn add, yarn dlx, yarn create), nao npm/npx.` | Use `yarn` (`yarn -s prettier ...` instead of `npx prettier ...`).                                       |
| `[warn] Code style issues found in the above file. Run Prettier with --write to fix.`  | `yarn format`, then `yarn verificar` again.                                                              |
| `Permission denied (publickey)` while installing                                       | An old address by SSH; this repository needs none. See [WHEN-IT-BREAKS.md](WHEN-IT-BREAKS.md#1-install). |
| The sheet opens over the whole page in your own test app                               | The app root needs `position: relative`. See [WHEN-IT-BREAKS.md](WHEN-IT-BREAKS.md#3-in-the-app).        |

Everything else is in [WHEN-IT-BREAKS.md](WHEN-IT-BREAKS.md).

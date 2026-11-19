# Reference

_[Português](pt-BR/REFERENCIA.md) | English_

> **For whom:** whoever needs the exact name of a prop, a script, a file or a variable.
> **What is here:** tables of the exports, every prop, event and slot, the scripts with their
> exit codes, the files and who writes them, the CSS variables, and the format of `ICONES`.
> **Where to go for the rest:** why things are like this is in
> [ARCHITECTURE.md](ARCHITECTURE.md); how to add a piece is in [EXTENDING.md](EXTENDING.md).

## Contents

1. [Exports](#1-exports)
2. [Components](#2-components)
3. [Functions](#3-functions)
4. [Scripts](#4-scripts)
5. [Files and folders](#5-files-and-folders)
6. [CSS variables](#6-css-variables)
7. [The ICONES format](#7-the-icones-format)

## 1. Exports

From [package.json](../package.json) `exports`:

| Import path                      | File                                            | What comes out                                                                                                        |
| -------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `@roqueos-apps/ui`               | [src/index.js](../src/index.js)                 | `RosIcone`, `RosBotao`, `RosInterruptor`, `RosFolha`, `RosConfirmar`, `RosVazio`, `ICONES`, `prenderFoco`, `focaveis` |
| `@roqueos-apps/ui/comportamento` | [src/comportamento.js](../src/comportamento.js) | `testarSobreposicao`, `COMPORTAMENTOS`                                                                                |

## 2. Components

Every text prop is shown as given: the kit does not translate. A required prop missing is a Vue
warning in the console.

| Component        | Prop              | Type             | Default      | Effect                                                                       |
| ---------------- | ----------------- | ---------------- | ------------ | ---------------------------------------------------------------------------- |
| `RosIcone`       | `nome`            | String, required | none         | a key of `ICONES`; outside the list the validator warns and nothing is drawn |
| `RosIcone`       | `tamanho`         | Number or String | `20`         | width and height in pixels                                                   |
| `RosBotao`       | `variante`        | String           | `'fantasma'` | `primario`, `fantasma` or `perigo`                                           |
| `RosBotao`       | `icone`           | String           | `''`         | icon name; with no slot content the button is icon-only                      |
| `RosBotao`       | `tamanhoDoIcone`  | Number or String | `20`         | icon size                                                                    |
| `RosBotao`       | `rotulo`          | String           | `''`         | `title`, and `aria-label` when icon-only (required in practice then)         |
| `RosBotao`       | `acento`          | String           | `''`         | app colour for `primario`, the focus ring and the `ligado` state             |
| `RosBotao`       | `ligado`          | Boolean or null  | `null`       | toggle button: gives `aria-pressed`; `null` means it does not toggle         |
| `RosBotao`       | `tipo`            | String           | `'button'`   | the `type` of the `<button>`                                                 |
| `RosInterruptor` | `modelValue`      | Boolean          | `false`      | on or off (`v-model`)                                                        |
| `RosInterruptor` | `rotulo`          | String, required | none         | `aria-label`; the switch has no text of its own                              |
| `RosInterruptor` | `acento`          | String           | `''`         | colour when on                                                               |
| `RosInterruptor` | `desabilitado`    | Boolean          | `false`      | `disabled`                                                                   |
| `RosFolha`       | `modelValue`      | Boolean          | `false`      | open or closed (`v-model`)                                                   |
| `RosFolha`       | `titulo`          | String, required | none         | the heading, which names the dialog (`aria-labelledby`)                      |
| `RosFolha`       | `icone`           | String           | `''`         | icon next to the title                                                       |
| `RosFolha`       | `acento`          | String           | `''`         | icon colour                                                                  |
| `RosFolha`       | `rotuloFechar`    | String, required | none         | label of the close button                                                    |
| `RosConfirmar`   | `modelValue`      | Boolean          | `false`      | open or closed (`v-model`)                                                   |
| `RosConfirmar`   | `titulo`          | String, required | none         | the question, which names the dialog                                         |
| `RosConfirmar`   | `texto`           | String           | `''`         | the explanation, which describes the dialog (`aria-describedby`)             |
| `RosConfirmar`   | `icone`           | String           | `''`         | icon above the title                                                         |
| `RosConfirmar`   | `perigo`          | Boolean          | `false`      | red icon and red confirm button                                              |
| `RosConfirmar`   | `acento`          | String           | `''`         | colour of the confirm button when not `perigo`                               |
| `RosConfirmar`   | `rotuloConfirmar` | String, required | none         | confirm button text                                                          |
| `RosConfirmar`   | `rotuloCancelar`  | String, required | none         | cancel button text (focus starts here)                                       |
| `RosVazio`       | `titulo`          | String, required | none         | the sentence ("Nenhuma nota ainda")                                          |
| `RosVazio`       | `subtitulo`       | String           | `''`         | the hint below                                                               |
| `RosVazio`       | `icone`           | String           | `''`         | icon in the app colour                                                       |
| `RosVazio`       | `acento`          | String           | `''`         | app colour                                                                   |
| `RosVazio`       | `carregando`      | Boolean          | `false`      | shows the running bar (loading state)                                        |
| `RosVazio`       | `leve`            | Boolean          | `false`      | the bar stands still (the system's light profile)                            |

Events and slots:

| Component        | Event or slot           | When                                                                   |
| ---------------- | ----------------------- | ---------------------------------------------------------------------- |
| `RosBotao`       | default slot            | the button text; without it and with `icone`, the button is icon-only  |
| `RosInterruptor` | `update:modelValue`     | on click (and Space or Enter), with the opposite value                 |
| `RosFolha`       | `update:modelValue`     | `false` on Esc, scrim, close button or handle dragged more than 110 px |
| `RosFolha`       | default slot            | the sheet body                                                         |
| `RosConfirmar`   | `update:modelValue`     | `false` on confirm or cancel                                           |
| `RosConfirmar`   | `confirmar`, `cancelar` | after the confirm button; after Esc, scrim or Cancel                   |
| `RosVazio`       | default slot            | the action that leaves the empty state                                 |

## 3. Functions

| Function                                       | File                                            | Returns                                                                                               |
| ---------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `focaveis(el)`                                 | [src/foco.js](../src/foco.js)                   | the elements inside `el` that Tab reaches, in document order, without `inert`                         |
| `prenderFoco(el, { inicial })`                 | [src/foco.js](../src/foco.js)                   | `soltar()`: removes the Tab listener and gives focus back to the opener, or to the fallback           |
| `useSobreposicao(aberto, painel, { inicial })` | [src/sobreposicao.js](../src/sobreposicao.js)   | nothing; traps focus while `aberto()` is true (internal, not exported by the package)                 |
| `testarSobreposicao(t, alvo)`                  | [src/comportamento.js](../src/comportamento.js) | nothing; registers one `describe` with the five behaviours, skipping those in `pular`                 |
| `COMPORTAMENTOS`                               | [src/comportamento.js](../src/comportamento.js) | frozen object: `papel`, `focoEntra`, `escFecha`, `focoVolta`, `tabDaVolta`, each with its description |

## 4. Scripts

From [package.json](../package.json) `scripts` and [scripts/](../scripts/icones.mjs):

| Command                                    | What it does                                          | Exit codes                                          |
| ------------------------------------------ | ----------------------------------------------------- | --------------------------------------------------- |
| `yarn verificar`                           | `lint`, `format:check`, `test`, `app:check`, in order | 0 all green; non-zero at the first that fails       |
| `yarn lint`                                | `eslint .` ([eslint.config.js](../eslint.config.js))  | 0 or 1                                              |
| `yarn format` / `yarn format:check`        | `prettier --write .` / `prettier --check .`           | `--check`: 0 or 1                                   |
| `yarn test`                                | `vitest run` ([vite.config.js](../vite.config.js))    | 0 or 1                                              |
| `yarn app:check`                           | `app check --sdk`: only the install-script rule       | 0 ok, 1 a problem, 2 wrong usage                    |
| `yarn dev`                                 | `vite`: the showcase                                  | runs until stopped                                  |
| `node scripts/icones.mjs <extras> name...` | adds icons to `src/icones.js` from `@quasar/extras`   | 0 written; 2 usage; 1 (uncaught error) unknown icon |
| `node scripts/icones.mjs <extras> --todos` | regenerates the icons already in the list             | same                                                |

## 5. Files and folders

| Path                                                                                      | Who writes                | Who reads                                                        |
| ----------------------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------- |
| `src/*.vue`, `src/foco.js`, `src/sobreposicao.js`, `src/comportamento.js`, `src/index.js` | people, by pull request   | the apps' and RoqueOS's Vite, the tests                          |
| `src/icones.js`                                                                           | `scripts/icones.mjs` only | `RosIcone`, `test/regras.spec.js`, the showcase                  |
| `dev/`, `index.html`                                                                      | people                    | `yarn dev`; not in the package (`files` in `package.json`)       |
| `test/`                                                                                   | people                    | Vitest; `test/preparar.js` unmounts after each test              |
| `docs/`                                                                                   | people                    | readers; `docs/capa.jpg` is the README image, not in the package |
| `ASSETS.md`                                                                               | people                    | the origin and license of `src/icones.js` and `docs/capa.jpg`    |
| `CHANGELOG.md`                                                                            | people, on every release  | consumers deciding a tag                                         |
| `.github/workflows/ci.yml`, `dco.yml`                                                     | people                    | GitHub Actions, on push to `main` and on pull requests           |
| `.claude/loop.md`                                                                         | people                    | the maintenance routine ([OPERATIONS.md](OPERATIONS.md))         |
| `.nvmrc`                                                                                  | people                    | CI (`node-version-file`) and nvm                                 |

What ships to the consumer is `files` in `package.json`: `src`, `ASSETS.md`, `LICENSE`,
`README.md`.

## 6. CSS variables

| Variable                             | Declared by                            | Fallback in the kit                | Used for                              |
| ------------------------------------ | -------------------------------------- | ---------------------------------- | ------------------------------------- |
| `--ros-text-rgb`                     | RoqueOS theme                          | `255, 255, 255`                    | text                                  |
| `--ros-fill-rgb`                     | RoqueOS theme                          | `255, 255, 255`                    | hover, track, icon backgrounds        |
| `--ros-line-rgb`                     | RoqueOS theme                          | `255, 255, 255`                    | borders                               |
| `--ros-surface-0-rgb`                | RoqueOS theme                          | `30, 30, 30`                       | sheet and card                        |
| `--ros-scrim-rgb`                    | RoqueOS theme                          | `0, 0, 0`                          | the scrim                             |
| `--ros-shadow-rgb`                   | RoqueOS theme                          | `0, 0, 0`                          | shadows                               |
| `--ros-danger-rgb`                   | RoqueOS theme                          | `255, 59, 48`                      | `perigo`                              |
| `--ros-white-rgb`, `--ros-black-rgb` | RoqueOS theme                          | `255, 255, 255` / `0, 0, 0`        | knob, text on `perigo` and `primario` |
| `--rui-acento`                       | the kit, from the `acento` prop        | `--rui-acento-padrao` or `#007aff` | app colour                            |
| `--rui-acento-padrao`                | the kit (`RosBotao`, `RosInterruptor`) | `#007aff`                          | default accent                        |

The sheet sits at `z-index: 50` and the confirmation at `60`, both `position: absolute; inset: 0`
inside the app root.

## 7. The ICONES format

[src/icones.js](../src/icones.js) exports a frozen object, name to drawing:

```js
export const ICONES = Object.freeze({
  add: { caminhos: ['M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'] },
  cameraswitch: { caminhos: ['M16,7h-1...', 'M8.57,0.51...', 'M10.95,21.96...'] },
})
```

| Field      | Type             | Meaning                                      |
| ---------- | ---------------- | -------------------------------------------- |
| key        | string           | the Material Icons name (`push_pin`, `tune`) |
| `caminhos` | array of strings | SVG path `d` values, at least one            |
| `viewBox`  | string, optional | present only when it is not `0 0 24 24`      |

The header of the file says which `@quasar/extras` version the paths came from (1.18.0 today).

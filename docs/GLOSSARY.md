# Glossary

_[Português](pt-BR/GLOSSARIO.md) | English_

> **For whom:** whoever reads the code or the docs and finds a Portuguese word that means
> something specific here.
> **What is here:** each term as it appears in the code, what it is, and where it lives.
> **Where to go for the rest:** the exact props and files are in [REFERENCE.md](REFERENCE.md).

The code is in Brazilian Portuguese, so most names are Portuguese words. They are kept as they
are in the code.

| Term                                     | What it is                                                                                                                  | Where it lives                                                      |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| kit                                      | this package, `@roqueos-apps/ui`                                                                                            | the repository                                                      |
| `Ros*`                                   | prefix of the kit components (`RosFolha`); the RoqueOS ones use `ROS*` (`ROSModal`)                                         | [src/](../src/index.js)                                             |
| `rui-` / `--rui-*`                       | prefix of the kit CSS classes and variables, never `--ros-*`                                                                | the `<style scoped>` of each component                              |
| `--ros-*`                                | RoqueOS theme variables; the kit may only read those in `VARIAVEIS_DO_SISTEMA`                                              | `app-sdk` `src/variaveis.js`                                        |
| `VARIAVEIS_DO_SISTEMA`                   | the list of system CSS variables an app (and the kit) may use                                                               | `app-sdk`, checked by [test/regras.spec.js](../test/regras.spec.js) |
| valor de reserva (fallback)              | the second argument of `var()`, so the kit looks right outside RoqueOS                                                      | every `var(--ros-...)` in `src/`                                    |
| sobreposição (overlay)                   | a layer over the app: the sheet or the confirmation                                                                         | [src/sobreposicao.js](../src/sobreposicao.js)                       |
| folha (sheet)                            | `RosFolha`, the panel rising from the bottom; RoqueOS's `ROSBottomSheet`                                                    | [src/RosFolha.vue](../src/RosFolha.vue)                             |
| confirmação (confirmation)               | `RosConfirmar`, the question before what cannot be undone; RoqueOS's `ROSModal type="confirm"`                              | [src/RosConfirmar.vue](../src/RosConfirmar.vue)                     |
| véu (scrim)                              | the dark layer behind an overlay; a click on it closes or cancels                                                           | `.rui-folha__veu`, `.rui-confirmar__veu`                            |
| alça / puxador (handle)                  | the bar at the top of the sheet; dragging it down more than 110 px closes                                                   | `.rui-folha__puxador`, `LIMITE_DO_ARRASTE`                          |
| `acento`                                 | the app colour, passed as a prop, becomes `--rui-acento`                                                                    | every component that paints                                         |
| `rotulo`                                 | the text that names a control for the screen reader (`aria-label`, `title`)                                                 | `RosBotao`, `RosInterruptor`, `rotuloFechar`                        |
| `perigo`                                 | destructive: red button, red icon                                                                                           | `RosBotao`, `RosConfirmar`                                          |
| `leve`                                   | the system's light profile; the loading bar stands still                                                                    | `RosVazio`                                                          |
| `prenderFoco`                            | traps focus in an element and returns `soltar()`, which gives it back                                                       | [src/foco.js](../src/foco.js)                                       |
| foco de recuo (focus fallback)           | where focus goes when the opener no longer takes it: the first focusable of the dialog it lives in                          | `focoDeRecuo` in [src/foco.js](../src/foco.js)                      |
| pacote de comportamento (behaviour pack) | the five overlay behaviours as tests, run here and in RoqueOS                                                               | [src/comportamento.js](../src/comportamento.js)                     |
| `pular` / `PULAR`                        | per behaviour, why one side does not meet it yet; the list only shrinks                                                     | `testarSobreposicao`, the RoqueOS front test                        |
| `montar`                                 | the function the pack receives: mounts the closed overlay and returns `quemAbre`, `abrir`, `aberta`, `dialogo`, `desmontar` | [test/montar.js](../test/montar.js)                                 |
| vitrine (showcase)                       | the `yarn dev` page with every component                                                                                    | [dev/Vitrine.vue](../dev/Vitrine.vue)                               |
| `ICONES`                                 | the generated name-to-SVG list; the only icons that exist                                                                   | [src/icones.js](../src/icones.js)                                   |
| `yarn verificar`                         | the gate: lint, format, tests, app check                                                                                    | [package.json](../package.json)                                     |
| `app check`                              | the SDK command that checks a repo against the RoqueOS contract; `--sdk` runs only the install-script rule                  | `app-sdk` `bin/app.mjs`                                             |
| DCO                                      | the `Signed-off-by:` line `git commit -s` writes; the `dco` workflow fails without it                                       | [.github/workflows/dco.yml](../.github/workflows/dco.yml)           |
| Goal 28, Onda (Wave) 4a                  | the plan that moved the apps out of RoqueOS; 4a was Notes, the kit's first consumer                                         | [CHANGELOG.md](../CHANGELOG.md)                                     |

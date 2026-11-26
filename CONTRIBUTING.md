# Contributing

_[Português](docs/pt-BR/CONTRIBUTING.md) | English_

Thanks for wanting to help. The organization-wide guide is the
[roqueos-apps CONTRIBUTING](https://github.com/roqueos-apps/.github/blob/main/CONTRIBUTING.md);
here goes only what belongs to the kit.

## How to contribute

1. Open an issue before changing how a component behaves or creating a new component. A new
   component enters with the first app that needs it, in the same cycle: a kit with no consumer
   cannot be tested against real use.
2. Fork, create a branch and run `yarn install --ignore-scripts`.
3. Every commit carries `Signed-off-by` (`git commit -s`, the DCO). The pull request's `dco`
   check fails without it; `git rebase --signoff main` fixes a branch that missed it.
4. Every fix comes with a test that fails without it. Sheet or confirmation behaviour (focus,
   Esc, Tab) goes into the pack in `src/comportamento.js`, which RoqueOS also runs against its
   own components.
5. The kit does not touch the `document` (no style on `body`, no listener on `document` or
   `window`, no Teleport out of the app), imports only `vue`, and uses only the `--ros-*` theme
   variables of the `app-sdk` contract. The tests fail each one.
6. Text shown on screen comes in by prop, already translated by the app. The kit has no
   language.
7. New icon: `node scripts/icones.mjs <path to @quasar/extras> icon_name`, in the same pull
   request as the component or app that uses it.
8. Run `yarn verificar` before opening the pull request. It is what CI runs. `yarn dev` opens
   the showcase, with each component in the states that matter (`?dir=rtl` for Arabic,
   `?tema=claro` for the light theme).

The step by step for each kind of change is in [docs/EXTENDING.md](docs/EXTENDING.md), and what
each test proves is in [docs/TESTING.md](docs/TESTING.md).

## Language

Code, comments and commit messages are in Brazilian Portuguese. Issues and pull requests in
English are welcome.

## Conduct

By taking part you agree to the [code of conduct](CODE_OF_CONDUCT.md).

# Como contribuir

Obrigado por querer ajudar. A régua comum da organização está no
[CONTRIBUTING da roqueos-apps](https://github.com/roqueos-apps/.github/blob/main/CONTRIBUTING.md);
aqui entra só o que é do kit.

1. Abra uma issue antes de mudar como um componente se comporta ou de criar um componente
   novo. Componente novo entra com o primeiro app que precisa dele, no mesmo ciclo: kit sem
   consumidor não se testa contra uso real.
2. Faça o fork, crie um branch e rode `yarn install --ignore-scripts`.
3. Todo commit leva `Signed-off-by` (`git commit -s`, o DCO). O check `dco` do pull request
   reprova sem.
4. Toda correção vem com um teste que reprova sem ela. Comportamento de folha ou confirmação
   (foco, Esc, Tab) vai no pacote de `src/comportamento.js`, que o RoqueOS roda também contra
   os componentes dele.
5. O kit não mexe no `document` (nem estilo no `body`, nem listener no `document` ou na
   `window`, nem Teleport para fora do app), só importa `vue`, e só usa as variáveis de tema
   `--ros-*` do contrato do `app-sdk`. Os testes reprovam cada uma.
6. Texto que aparece na tela vem por prop, já traduzido pelo app. O kit não tem idioma.
7. Ícone novo: `node scripts/icones.mjs <caminho do @quasar/extras> nome_do_icone`, no mesmo
   PR do componente ou do app que usa.
8. Rode `yarn verificar` antes de abrir o PR. É o mesmo que o CI roda. `yarn dev` abre a
   vitrine, com cada componente nos estados que importam (`?dir=rtl` para o árabe).

O código, os comentários e as mensagens de commit são em português do Brasil. Issue e PR em
inglês são bem-vindos. Ao participar você concorda com o [código de conduta](CODE_OF_CONDUCT.md).

---

## Contributing (English)

The organization-wide guide is the
[roqueos-apps CONTRIBUTING](https://github.com/roqueos-apps/.github/blob/main/CONTRIBUTING.md).
Open an issue before changing how a component behaves or adding one (new components arrive
with the first app that needs them); fork, branch, `yarn install --ignore-scripts`; sign off
every commit (`git commit -s`); every fix comes with a test that fails without it, and overlay
behaviour (focus, Escape, Tab) goes into the shared pack in `src/comportamento.js`. The kit
never touches the document outside the app, imports only `vue`, and uses only the `--ros-*`
theme variables of the `app-sdk` contract. On-screen text comes in through props. Run
`yarn verificar` before the pull request; `yarn dev` opens the component showcase.

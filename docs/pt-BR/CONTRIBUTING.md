# Como contribuir

_Português | [English](../../CONTRIBUTING.md)_

Obrigado por querer ajudar. A régua comum da organização está no
[CONTRIBUTING da roqueos-apps](https://github.com/roqueos-apps/.github/blob/main/CONTRIBUTING.md);
aqui entra só o que é do kit.

## Como contribuir

1. Abra uma issue antes de mudar como um componente se comporta ou de criar um componente
   novo. Componente novo entra com o primeiro app que precisa dele, no mesmo ciclo: kit sem
   consumidor não se testa contra uso real.
2. Faça o fork, crie um branch e rode `yarn install --ignore-scripts`.
3. Todo commit leva `Signed-off-by` (`git commit -s`, o DCO). O check `dco` do pull request
   reprova sem; `git rebase --signoff main` conserta o branch que esqueceu.
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

O passo a passo de cada tipo de mudança está em [ESTENDER.md](ESTENDER.md), e o que cada teste
prova, em [TESTES.md](TESTES.md).

## Idioma

O código, os comentários e as mensagens de commit são em português do Brasil. Issue e PR em
inglês são bem-vindos.

## Conduta

Ao participar você concorda com o [código de conduta](../../CODE_OF_CONDUCT.md).

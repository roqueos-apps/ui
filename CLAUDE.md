# Kit de interface (`@roqueos-apps/ui`)

Os componentes que os apps da organização roqueos-apps usam para parecer e se comportar como o
RoqueOS. Leia o README antes de mudar qualquer coisa.

- Gate: `yarn verificar` (o mesmo do CI e do pre-push).
- O kit só importa `vue` e arquivo dele. Nada de Quasar, nada de `src/` do RoqueOS.
- O kit não mexe no `document`: sem estilo no `body`, sem listener no `document`/`window`, sem
  Teleport. Sobreposição mora dentro da raiz do app. `test/documento.spec.js` reprova.
- Do tema do RoqueOS só as variáveis `VARIAVEIS_DO_SISTEMA` do `app-sdk`, sempre com valor de
  reserva (`rgba(var(--ros-fill-rgb, 255, 255, 255), .08)`). As do kit são `--rui-*`.
- Texto na tela vem por prop. O kit não tem idioma.
- Comportamento de sobreposição (foco, Esc, Tab) é contrato executável em
  `src/comportamento.js`: o RoqueOS roda o mesmo pacote contra os componentes dele.
- Ícone só pela lista de `src/icones.js`, gerada por `scripts/icones.mjs`.
- Toda correção vem com teste que reprova sem ela; check novo passa por mutação antes de
  valer.
- Todo commit com `Signed-off-by` (`git commit -s`): o workflow `dco` reprova sem.
- Português do Brasil no código e nos commits.

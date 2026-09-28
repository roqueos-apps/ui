Rotina de manutenção do kit de interface da roqueos-apps. Uma coisa por iteração, com a evidência no chat. Para na primeira que tiver trabalho.

1. **Gate vermelho.** `roqueos-gate` (o `yarn verificar`: lint, formato, testes e `app check --sdk`). Conserta e cola a saída.
2. **CI do GitHub vermelho.** `gh run list --limit 3`. Os workflows `verificar` e `dco` rodam em todo push e em PR de fork, sem segredo; vermelho lá e verde aqui é ambiente divergente, e se investiga antes de qualquer outra coisa.
3. **PR sem `Signed-off-by`.** O `dco` reprova. Quem contribui recebe o comando que conserta (`git rebase --signoff main`), não um "não pode".
4. **Issue ou PR de fora sem resposta.** `gh issue list` e `gh pr list`. Uma linha de "vi, olho até sexta" já conta.
5. **Comportamento divergente.** O RoqueOS roda `src/comportamento.js` contra os componentes dele; o que ele pula está escrito no teste dele. Item novo na lista de pulados, ou um comportamento que o kit perdeu, vira issue aqui com o caso.
6. **SDK atrás.** O kit usa as variáveis de tema do `app-sdk`. Variável nova no contrato que o kit precisa entra no SDK primeiro, com tag, e só depois aqui.
7. **Drift de docs.** README, CHANGELOG e a lista de componentes dizem a mesma coisa sobre o que o kit tem e garante.

Mudança visível não fecha sem a vitrine aberta de verdade (`yarn dev`), com print, e sem o app que usa o componente aberto no RoqueOS quando a mudança chega lá. Nunca enfraquece teste para o gate passar.

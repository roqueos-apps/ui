## O que muda / What changes

<!-- Uma ou duas frases. Se fecha uma issue: "Fecha #123". / One or two sentences. "Closes #123" if it fixes an issue. -->

## Como verificar / How to verify

<!-- O que abrir, o que fazer, o que deve aparecer. / What to open, what to do, what should happen. -->

## Checklist

- [ ] Todo commit tem `Signed-off-by` (`git commit -s`) / Every commit is signed off (DCO)
- [ ] `yarn verificar` passou na minha máquina / passed locally
- [ ] Toda correção tem um teste que reprova sem ela / Every fix has a test that fails without it
- [ ] Texto na tela vem por prop, sem idioma no kit / On-screen text comes in through props
- [ ] Nada mexe no `document` fora do app / Nothing touches the document outside the app
- [ ] Mudança de comportamento de sobreposição está em `src/comportamento.js` / Overlay behaviour changes are in the shared pack
- [ ] Ícone novo gerado por `scripts/icones.mjs` / New icons come from `scripts/icones.mjs`
- [ ] Não mudei nem tirei prop sem subir a versão maior / No prop changed or removed without a major bump

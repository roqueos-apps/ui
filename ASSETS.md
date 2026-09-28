# Origem dos assets

O kit não tem `public/`: não leva imagem, som nem fonte de arquivo.

O único desenho de terceiro são os ícones de `src/icones.js`: os traços do
[Material Icons](https://fonts.google.com/icons) do Google, sob
[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0), tirados do pacote
[`@quasar/extras`](https://github.com/quasarframework/quasar/tree/dev/extras) (MIT) pelo
`scripts/icones.mjs`, que registra a versão de onde vieram no cabeçalho do arquivo gerado. São
os mesmos traços da fonte que o RoqueOS usa para desenhar ícone pelo nome.

| caminho         | licença    | origem                                               |
| --------------- | ---------- | ---------------------------------------------------- |
| `src/icones.js` | Apache-2.0 | Material Icons (Google), via `@quasar/extras` 1.18.0 |

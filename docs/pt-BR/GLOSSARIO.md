# Glossário

_Português | [English](../GLOSSARY.md)_

> **Para quem:** quem lê o código ou os docs e acha uma palavra que quer dizer coisa específica
> aqui.
> **O que tem aqui:** cada termo como aparece no código, o que é, e onde mora.
> **Onde ir para o resto:** as props e os arquivos exatos estão em [REFERENCIA.md](REFERENCIA.md).

O código é em português do Brasil, então a maioria dos nomes são palavras em português. Eles
ficam como estão no código.

| Termo                                    | O que é                                                                                                                    | Onde mora                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| kit                                      | este pacote, o `@roqueos-apps/ui`                                                                                          | o repo                                                                     |
| `Ros*`                                   | prefixo dos componentes do kit (`RosFolha`); os do RoqueOS usam `ROS*` (`ROSModal`)                                        | [src/](../../src/index.js)                                                 |
| `rui-` / `--rui-*`                       | prefixo das classes e variáveis CSS do kit, nunca `--ros-*`                                                                | o `<style scoped>` de cada componente                                      |
| `--ros-*`                                | variáveis do tema do RoqueOS; o kit só pode ler as de `VARIAVEIS_DO_SISTEMA`                                               | `src/variaveis.js` do `app-sdk`                                            |
| `VARIAVEIS_DO_SISTEMA`                   | a lista das variáveis CSS do sistema que um app (e o kit) pode usar                                                        | `app-sdk`, conferida pelo [test/regras.spec.js](../../test/regras.spec.js) |
| valor de reserva (fallback)              | o segundo argumento do `var()`, para o kit ficar certo fora do RoqueOS                                                     | cada `var(--ros-...)` de `src/`                                            |
| sobreposição (overlay)                   | uma camada por cima do app: a folha ou a confirmação                                                                       | [src/sobreposicao.js](../../src/sobreposicao.js)                           |
| folha (sheet)                            | o `RosFolha`, o painel que sobe de baixo; o `ROSBottomSheet` do RoqueOS                                                    | [src/RosFolha.vue](../../src/RosFolha.vue)                                 |
| confirmação (confirmation)               | o `RosConfirmar`, a pergunta antes do que não tem volta; o `ROSModal type="confirm"` do RoqueOS                            | [src/RosConfirmar.vue](../../src/RosConfirmar.vue)                         |
| véu (scrim)                              | a camada escura atrás de uma sobreposição; o clique nela fecha ou cancela                                                  | `.rui-folha__veu`, `.rui-confirmar__veu`                                   |
| alça / puxador (handle)                  | a barra no alto da folha; arrastada para baixo mais de 110 px, fecha                                                       | `.rui-folha__puxador`, `LIMITE_DO_ARRASTE`                                 |
| `acento`                                 | a cor do app, passada por prop, vira `--rui-acento`                                                                        | todo componente que pinta                                                  |
| `rotulo`                                 | o texto que nomeia um controle para o leitor de tela (`aria-label`, `title`)                                               | `RosBotao`, `RosInterruptor`, `rotuloFechar`                               |
| `perigo`                                 | destrutivo: botão vermelho, ícone vermelho                                                                                 | `RosBotao`, `RosConfirmar`                                                 |
| `leve`                                   | o perfil leve do sistema; a barra de carregando fica parada                                                                | `RosVazio`                                                                 |
| `prenderFoco`                            | prende o foco num elemento e devolve o `soltar()`, que o devolve                                                           | [src/foco.js](../../src/foco.js)                                           |
| foco de recuo (focus fallback)           | para onde o foco vai quando quem abriu não aceita mais: o primeiro focável do diálogo onde ele mora                        | `focoDeRecuo` em [src/foco.js](../../src/foco.js)                          |
| pacote de comportamento (behaviour pack) | os cinco comportamentos de sobreposição como testes, rodados aqui e no RoqueOS                                             | [src/comportamento.js](../../src/comportamento.js)                         |
| `pular` / `PULAR`                        | por comportamento, por que um lado ainda não cumpre; a lista só encolhe                                                    | `testarSobreposicao`, o teste do front do RoqueOS                          |
| `montar`                                 | a função que o pacote recebe: monta a sobreposição fechada e devolve `quemAbre`, `abrir`, `aberta`, `dialogo`, `desmontar` | [test/montar.js](../../test/montar.js)                                     |
| vitrine (showcase)                       | a página do `yarn dev` com todos os componentes                                                                            | [dev/Vitrine.vue](../../dev/Vitrine.vue)                                   |
| `ICONES`                                 | a lista gerada de nome para SVG; os únicos ícones que existem                                                              | [src/icones.js](../../src/icones.js)                                       |
| `yarn verificar`                         | o gate: lint, formato, testes, app check                                                                                   | [package.json](../../package.json)                                         |
| `app check`                              | o comando do SDK que confere um repo contra o contrato do RoqueOS; `--sdk` roda só a regra de script de instalação         | `bin/app.mjs` do `app-sdk`                                                 |
| DCO                                      | a linha `Signed-off-by:` que o `git commit -s` escreve; o workflow `dco` reprova sem ela                                   | [.github/workflows/dco.yml](../../.github/workflows/dco.yml)               |
| Goal 28, Onda 4a                         | o plano que tirou os apps do RoqueOS; a 4a foi a das Notas, o primeiro consumidor do kit                                   | [CHANGELOG.md](../../CHANGELOG.md)                                         |

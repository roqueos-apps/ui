# Referência

_Português | [English](../REFERENCE.md)_

> **Para quem:** quem precisa do nome exato de uma prop, um script, um arquivo ou uma variável.
> **O que tem aqui:** tabelas das exportações, de cada prop, evento e slot, dos scripts com os
> códigos de saída, dos arquivos e de quem os escreve, das variáveis CSS, e o formato de
> `ICONES`.
> **Onde ir para o resto:** por que as coisas são assim está em
> [ARQUITETURA.md](ARQUITETURA.md); como acrescentar uma peça está em [ESTENDER.md](ESTENDER.md).

## Sumário

1. [Exportações](#1-exportações)
2. [Componentes](#2-componentes)
3. [Funções](#3-funções)
4. [Scripts](#4-scripts)
5. [Arquivos e pastas](#5-arquivos-e-pastas)
6. [Variáveis CSS](#6-variáveis-css)
7. [O formato de ICONES](#7-o-formato-de-icones)

## 1. Exportações

Do `exports` do [package.json](../../package.json):

| Caminho de import                | Arquivo                                            | O que sai                                                                                                             |
| -------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `@roqueos-apps/ui`               | [src/index.js](../../src/index.js)                 | `RosIcone`, `RosBotao`, `RosInterruptor`, `RosFolha`, `RosConfirmar`, `RosVazio`, `ICONES`, `prenderFoco`, `focaveis` |
| `@roqueos-apps/ui/comportamento` | [src/comportamento.js](../../src/comportamento.js) | `testarSobreposicao`, `COMPORTAMENTOS`                                                                                |

## 2. Componentes

Toda prop de texto aparece como veio: o kit não traduz. Prop obrigatória ausente é aviso do Vue
no console.

| Componente       | Prop              | Tipo                | Padrão       | Efeito                                                                         |
| ---------------- | ----------------- | ------------------- | ------------ | ------------------------------------------------------------------------------ |
| `RosIcone`       | `nome`            | String, obrigatória | nenhum       | uma chave de `ICONES`; fora da lista o validador avisa e nada é desenhado      |
| `RosIcone`       | `tamanho`         | Number ou String    | `20`         | largura e altura em pixels                                                     |
| `RosBotao`       | `variante`        | String              | `'fantasma'` | `primario`, `fantasma` ou `perigo`                                             |
| `RosBotao`       | `icone`           | String              | `''`         | nome do ícone; sem conteúdo no slot o botão é só de ícone                      |
| `RosBotao`       | `tamanhoDoIcone`  | Number ou String    | `20`         | tamanho do ícone                                                               |
| `RosBotao`       | `rotulo`          | String              | `''`         | `title`, e `aria-label` quando só de ícone (na prática obrigatório nesse caso) |
| `RosBotao`       | `acento`          | String              | `''`         | cor do app para o `primario`, o anel de foco e o estado `ligado`               |
| `RosBotao`       | `ligado`          | Boolean ou null     | `null`       | botão de alternar: dá `aria-pressed`; `null` quer dizer que não alterna        |
| `RosBotao`       | `tipo`            | String              | `'button'`   | o `type` do `<button>`                                                         |
| `RosInterruptor` | `modelValue`      | Boolean             | `false`      | ligado ou desligado (`v-model`)                                                |
| `RosInterruptor` | `rotulo`          | String, obrigatória | nenhum       | `aria-label`; o interruptor não tem texto próprio                              |
| `RosInterruptor` | `acento`          | String              | `''`         | cor quando ligado                                                              |
| `RosInterruptor` | `desabilitado`    | Boolean             | `false`      | `disabled`                                                                     |
| `RosFolha`       | `modelValue`      | Boolean             | `false`      | aberta ou fechada (`v-model`)                                                  |
| `RosFolha`       | `titulo`          | String, obrigatória | nenhum       | o título, que nomeia o diálogo (`aria-labelledby`)                             |
| `RosFolha`       | `icone`           | String              | `''`         | ícone ao lado do título                                                        |
| `RosFolha`       | `acento`          | String              | `''`         | cor do ícone                                                                   |
| `RosFolha`       | `rotuloFechar`    | String, obrigatória | nenhum       | rótulo do botão de fechar                                                      |
| `RosConfirmar`   | `modelValue`      | Boolean             | `false`      | aberta ou fechada (`v-model`)                                                  |
| `RosConfirmar`   | `titulo`          | String, obrigatória | nenhum       | a pergunta, que nomeia o diálogo                                               |
| `RosConfirmar`   | `texto`           | String              | `''`         | a explicação, que descreve o diálogo (`aria-describedby`)                      |
| `RosConfirmar`   | `icone`           | String              | `''`         | ícone acima do título                                                          |
| `RosConfirmar`   | `perigo`          | Boolean             | `false`      | ícone vermelho e botão de confirmar vermelho                                   |
| `RosConfirmar`   | `acento`          | String              | `''`         | cor do botão de confirmar quando não é `perigo`                                |
| `RosConfirmar`   | `rotuloConfirmar` | String, obrigatória | nenhum       | texto do botão de confirmar                                                    |
| `RosConfirmar`   | `rotuloCancelar`  | String, obrigatória | nenhum       | texto do botão de cancelar (o foco começa aqui)                                |
| `RosVazio`       | `titulo`          | String, obrigatória | nenhum       | a frase ("Nenhuma nota ainda")                                                 |
| `RosVazio`       | `subtitulo`       | String              | `''`         | a dica embaixo                                                                 |
| `RosVazio`       | `icone`           | String              | `''`         | ícone na cor do app                                                            |
| `RosVazio`       | `acento`          | String              | `''`         | cor do app                                                                     |
| `RosVazio`       | `carregando`      | Boolean             | `false`      | mostra a barra que corre (estado de carregando)                                |
| `RosVazio`       | `leve`            | Boolean             | `false`      | a barra fica parada (o perfil leve do sistema)                                 |

Eventos e slots:

| Componente       | Evento ou slot          | Quando                                                                         |
| ---------------- | ----------------------- | ------------------------------------------------------------------------------ |
| `RosBotao`       | slot padrão             | o texto do botão; sem ele e com `icone`, o botão é só de ícone                 |
| `RosInterruptor` | `update:modelValue`     | no clique (e no Espaço ou Enter), com o valor oposto                           |
| `RosFolha`       | `update:modelValue`     | `false` no Esc, no véu, no botão de fechar ou na alça arrastada mais de 110 px |
| `RosFolha`       | slot padrão             | o corpo da folha                                                               |
| `RosConfirmar`   | `update:modelValue`     | `false` ao confirmar ou cancelar                                               |
| `RosConfirmar`   | `confirmar`, `cancelar` | depois do botão de confirmar; depois do Esc, do véu ou do Cancelar             |
| `RosVazio`       | slot padrão             | a ação que sai do estado vazio                                                 |

## 3. Funções

| Função                                         | Arquivo                                            | Devolve                                                                                                |
| ---------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `focaveis(el)`                                 | [src/foco.js](../../src/foco.js)                   | os elementos dentro de `el` que o Tab alcança, na ordem do documento, sem `inert`                      |
| `prenderFoco(el, { inicial })`                 | [src/foco.js](../../src/foco.js)                   | `soltar()`: tira o listener do Tab e devolve o foco a quem abriu, ou ao recuo                          |
| `useSobreposicao(aberto, painel, { inicial })` | [src/sobreposicao.js](../../src/sobreposicao.js)   | nada; prende o foco enquanto `aberto()` é verdadeiro (interno, o pacote não exporta)                   |
| `testarSobreposicao(t, alvo)`                  | [src/comportamento.js](../../src/comportamento.js) | nada; registra um `describe` com os cinco comportamentos, pulando os de `pular`                        |
| `COMPORTAMENTOS`                               | [src/comportamento.js](../../src/comportamento.js) | objeto congelado: `papel`, `focoEntra`, `escFecha`, `focoVolta`, `tabDaVolta`, cada um com a descrição |

## 4. Scripts

Dos `scripts` do [package.json](../../package.json) e de [scripts/](../../scripts/icones.mjs):

| Comando                                    | O que faz                                                         | Códigos de saída                                         |
| ------------------------------------------ | ----------------------------------------------------------------- | -------------------------------------------------------- |
| `yarn verificar`                           | `lint`, `format:check`, `test`, `app:check`, nesta ordem          | 0 tudo verde; diferente de 0 no primeiro que falha       |
| `yarn lint`                                | `eslint .` ([eslint.config.js](../../eslint.config.js))           | 0 ou 1                                                   |
| `yarn format` / `yarn format:check`        | `prettier --write .` / `prettier --check .`                       | `--check`: 0 ou 1                                        |
| `yarn test`                                | `vitest run` ([vite.config.js](../../vite.config.js))             | 0 ou 1                                                   |
| `yarn app:check`                           | `app check --sdk`: só a regra de script de instalação             | 0 ok, 1 um problema, 2 uso errado                        |
| `yarn dev`                                 | `vite`: a vitrine                                                 | roda até parar                                           |
| `node scripts/icones.mjs <extras> nome...` | acrescenta ícones ao `src/icones.js` a partir do `@quasar/extras` | 0 gravou; 2 uso; 1 (erro não tratado) ícone desconhecido |
| `node scripts/icones.mjs <extras> --todos` | regera os ícones que já estão na lista                            | o mesmo                                                  |

## 5. Arquivos e pastas

| Caminho                                                                                   | Quem escreve              | Quem lê                                                         |
| ----------------------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------------------- |
| `src/*.vue`, `src/foco.js`, `src/sobreposicao.js`, `src/comportamento.js`, `src/index.js` | pessoas, por PR           | o Vite dos apps e do RoqueOS, os testes                         |
| `src/icones.js`                                                                           | só o `scripts/icones.mjs` | o `RosIcone`, o `test/regras.spec.js`, a vitrine                |
| `dev/`, `index.html`                                                                      | pessoas                   | o `yarn dev`; fora do pacote (`files` no `package.json`)        |
| `test/`                                                                                   | pessoas                   | o Vitest; o `test/preparar.js` desmonta depois de cada teste    |
| `docs/`                                                                                   | pessoas                   | quem lê; o `docs/capa.jpg` é a imagem do README, fora do pacote |
| `ASSETS.md`                                                                               | pessoas                   | a origem e a licença do `src/icones.js` e do `docs/capa.jpg`    |
| `CHANGELOG.md`                                                                            | pessoas, a cada versão    | quem consome, para escolher uma tag                             |
| `.github/workflows/ci.yml`, `dco.yml`                                                     | pessoas                   | o GitHub Actions, no push para a `main` e nos PRs               |
| `.claude/loop.md`                                                                         | pessoas                   | a rotina de manutenção ([OPERACAO.md](OPERACAO.md))             |
| `.nvmrc`                                                                                  | pessoas                   | o CI (`node-version-file`) e o nvm                              |

O que chega a quem consome é o `files` do `package.json`: `src`, `ASSETS.md`, `LICENSE`,
`README.md`.

## 6. Variáveis CSS

| Variável                             | Quem declara                         | Reserva no kit                     | Usada para                                 |
| ------------------------------------ | ------------------------------------ | ---------------------------------- | ------------------------------------------ |
| `--ros-text-rgb`                     | tema do RoqueOS                      | `255, 255, 255`                    | texto                                      |
| `--ros-fill-rgb`                     | tema do RoqueOS                      | `255, 255, 255`                    | hover, trilho, fundo de ícone              |
| `--ros-line-rgb`                     | tema do RoqueOS                      | `255, 255, 255`                    | bordas                                     |
| `--ros-surface-0-rgb`                | tema do RoqueOS                      | `30, 30, 30`                       | folha e cartão                             |
| `--ros-scrim-rgb`                    | tema do RoqueOS                      | `0, 0, 0`                          | o véu                                      |
| `--ros-shadow-rgb`                   | tema do RoqueOS                      | `0, 0, 0`                          | sombras                                    |
| `--ros-danger-rgb`                   | tema do RoqueOS                      | `255, 59, 48`                      | `perigo`                                   |
| `--ros-white-rgb`, `--ros-black-rgb` | tema do RoqueOS                      | `255, 255, 255` / `0, 0, 0`        | bolinha, texto no `perigo` e no `primario` |
| `--rui-acento`                       | o kit, da prop `acento`              | `--rui-acento-padrao` ou `#007aff` | cor do app                                 |
| `--rui-acento-padrao`                | o kit (`RosBotao`, `RosInterruptor`) | `#007aff`                          | acento padrão                              |

A folha fica em `z-index: 50` e a confirmação em `60`, as duas com
`position: absolute; inset: 0` dentro da raiz do app.

## 7. O formato de ICONES

O [src/icones.js](../../src/icones.js) exporta um objeto congelado, nome para desenho:

```js
export const ICONES = Object.freeze({
  add: { caminhos: ['M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'] },
  cameraswitch: { caminhos: ['M16,7h-1...', 'M8.57,0.51...', 'M10.95,21.96...'] },
})
```

| Campo      | Tipo             | Significado                                    |
| ---------- | ---------------- | ---------------------------------------------- |
| chave      | string           | o nome no Material Icons (`push_pin`, `tune`)  |
| `caminhos` | lista de strings | os valores `d` dos caminhos SVG, pelo menos um |
| `viewBox`  | string, opcional | só aparece quando não é `0 0 24 24`            |

O cabeçalho do arquivo diz de qual versão do `@quasar/extras` vieram os caminhos (1.18.0 hoje).

# Como começar

_Português | [English](../GETTING-STARTED.md)_

> **Para quem:** quem vai rodar o kit pela primeira vez, para contribuir ou para ver um
> componente antes de usá-lo num app.
> **O que tem aqui:** pré-requisitos, cada comando com o que ele faz e como saber que deu certo,
> o primeiro resultado visível, e os erros de primeira vez.
> **Onde ir para o resto:** usar o kit a partir de um app está em
> [INTEGRACOES.md](INTEGRACOES.md); o que cada comando aceita está em
> [REFERENCIA.md](REFERENCIA.md).

## Sumário

1. [Pré-requisitos](#1-pré-requisitos)
2. [Instalar](#2-instalar)
3. [Rodar o gate](#3-rodar-o-gate)
4. [Abrir a vitrine](#4-abrir-a-vitrine)
5. [Erros de primeira vez](#5-erros-de-primeira-vez)

## 1. Pré-requisitos

| O quê | Versão                                                                                             | Comando que confere |
| ----- | -------------------------------------------------------------------------------------------------- | ------------------- |
| Node  | 22 ou mais novo (`engines` no [package.json](../../package.json)); o [.nvmrc](../../.nvmrc) diz 24 | `node --version`    |
| Yarn  | 1.22 (`packageManager` no [package.json](../../package.json))                                      | `yarn --version`    |
| Git   | qualquer um recente                                                                                | `git --version`     |

O repo é só yarn: há um [yarn.lock](../../yarn.lock) e o gancho do `roqueos-kit` recusa `npm`
e `npx` aqui. Nenhuma chave SSH é necessária: a única dependência git,
`@roqueos-apps/app-sdk`, vem por HTTPS (`github:roqueos-apps/app-sdk#v0.2.0`).

## 2. Instalar

```bash
git clone https://github.com/roqueos-apps/ui.git
cd ui
yarn install --ignore-scripts
```

O `--ignore-scripts` impede que o script de instalação de qualquer dependência rode, que é o
mesmo que o CI faz (o [.github/workflows/ci.yml](../../.github/workflows/ci.yml) usa
`yarn install --frozen-lockfile --ignore-scripts`). Deu certo quando o yarn termina em
`Done in` e `node_modules/@roqueos-apps/app-sdk` existe.

## 3. Rodar o gate

```bash
yarn verificar
```

Ele roda, nesta ordem, `yarn lint` (ESLint), `yarn format:check` (Prettier, Markdown incluído),
`yarn test` (Vitest com jsdom) e `yarn app:check` (o `app check --sdk` do SDK). É o mesmo
comando do CI e do pre-push. Deu certo quando a saída termina assim (medido em 18/11/2026, 5
arquivos de teste e 38 testes):

```text
 Test Files  5 passed (5)
      Tests  38 passed (38)
...
$ app check --sdk
ok        scripts de instalação

ok, o repo cumpre o contrato.
Done in 11.77s.
```

As mensagens dos programas aparecem como eles imprimem.

## 4. Abrir a vitrine

```bash
yarn dev
```

O Vite serve o [index.html](../../index.html), que monta o [dev/Vitrine.vue](../../dev/Vitrine.vue):
cada componente nos estados que importam, sobre um fundo parecido com o do RoqueOS. Abra o
endereço que o Vite imprime (por padrão `http://localhost:5173/`). O primeiro resultado visível
é a página "Kit de interface do RoqueOS" com os 70 ícones, os botões, o interruptor, o estado
vazio e uma "janela" com "Abrir a folha" e "Apagar…". Abra a folha, aperte Esc, e o foco volta
para o botão que a abriu. A [imagem do README](../capa.jpg) é esta página.

Acrescente `?dir=rtl` ao endereço para ver a página em árabe, da direita para a esquerda: a
bolinha do interruptor anda para o outro lado ([dev/main.js](../../dev/main.js)).

## 5. Erros de primeira vez

| O que aparece                                                                            | O que fazer                                                                                                        |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| O gancho do `roqueos-kit` diz `usa yarn (yarn add, yarn dlx, yarn create), nao npm/npx.` | Use `yarn` (`yarn -s prettier ...` no lugar de `npx prettier ...`).                                                |
| `[warn] Code style issues found in the above file. Run Prettier with --write to fix.`    | `yarn format`, depois `yarn verificar` de novo.                                                                    |
| `Permission denied (publickey)` ao instalar                                              | Um endereço antigo por SSH; este repo não precisa de nenhum. Veja [QUANDO-QUEBRA.md](QUANDO-QUEBRA.md#1-instalar). |
| A folha abre por cima da página inteira no seu app de teste                              | A raiz do app precisa de `position: relative`. Veja [QUANDO-QUEBRA.md](QUANDO-QUEBRA.md#3-no-app).                 |

O resto está em [QUANDO-QUEBRA.md](QUANDO-QUEBRA.md).

# Quando quebra

_Português | [English](../WHEN-IT-BREAKS.md)_

> **Para quem:** quem está com o gate vermelho, a instalação falhando, ou uma sobreposição do
> kit se comportando mal num app.
> **O que tem aqui:** um primeiro comando de diagnóstico, depois, por área, o que aparece, a
> causa e o que fazer, com a mensagem literal. Falha que já aconteceu leva a data.
> **Onde ir para o resto:** como as peças se ligam está em [ARQUITETURA.md](ARQUITETURA.md); a
> rotina normal está em [OPERACAO.md](OPERACAO.md).

## Sumário

1. [Instalar](#1-instalar)
2. [Gate e CI](#2-gate-e-ci)
3. [No app](#3-no-app)
4. [No RoqueOS](#4-no-roqueos)

Comece pelo gate: ele diz qual dos quatro passos falhou.

```bash
yarn verificar
```

As mensagens abaixo estão como os programas imprimem.

## 1. Instalar

| O que aparece                                                           | Causa                                                                                                                              | O que fazer                                                                                                             |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Permission denied (publickey)` ao instalar o kit                       | um endereço por SSH (`git+ssh://git@github.com/roqueos-apps/ui.git#...`, ainda usado no front do RoqueOS) numa máquina sem a chave | num app use `github:roqueos-apps/ui#vX.Y.Z`, por HTTPS; o repo abriu em 29/09/2026 ([CHANGELOG.md](../../CHANGELOG.md)) |
| O gancho diz `usa yarn (yarn add, yarn dlx, yarn create), nao npm/npx.` | `npm` ou `npx` num repo yarn; o gancho do `roqueos-kit` lê o `pkgManager`                                                          | use `yarn`, ou `yarn -s <bin>` para um binário de `node_modules/.bin`                                                   |
| O yarn recusa a versão do Node                                          | Node mais velho que 22 (`engines`)                                                                                                 | `nvm use` (o [.nvmrc](../../.nvmrc) diz 24). A mensagem literal do yarn não foi reproduzida aqui                        |

## 2. Gate e CI

| O que aparece                                                                                                                      | Causa                                                                                      | O que fazer                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `[warn] Code style issues found in the above file. Run Prettier with --write to fix.`                                              | um arquivo, Markdown incluído, fora do formato do [.prettierrc](../../.prettierrc)         | `yarn format`, revise o diff, commite                                                                                        |
| `REPROVOU  scripts de instalação` e `package.json declara "postinstall", que roda sozinho no install de quem depende deste pacote` | um script de instalação no `package.json`; ele rodaria na máquina de quem builda o RoqueOS | tire o script; nada no kit precisa de um                                                                                     |
| Um diff de `regras.spec.js` reprovando com `usa --ros-..., que não está entre as variáveis do sistema que um app pode usar (...)`  | um `var(--ros-...)` fora de `VARIAVEIS_DO_SISTEMA`                                         | ponha a variável no `app-sdk` primeiro, com tag, depois suba o SDK aqui ([OPERACAO.md](OPERACAO.md#3-atualizar-sem-quebrar)) |
| Um diff de `regras.spec.js` reprovando com `declara --ros-...: o prefixo --ros- é do sistema, a variável do app usa outro`         | o kit declarou uma variável `--ros-*`                                                      | use o prefixo `--rui-*`                                                                                                      |
| `o kit só importa vue e arquivo dele` reprova, listando `src/...: <pacote>`                                                        | um import que não é `vue` nem `./`                                                         | tire; o kit só importa `vue` ([ARQUITETURA.md](ARQUITETURA.md#8-decisões-de-design))                                         |
| `todo ícone que um componente do kit usa está na lista` reprova, listando um nome                                                  | um componente usa um ícone literal fora de `ICONES`                                        | `node scripts/icones.mjs <extras> <nome>` ([ESTENDER.md](ESTENDER.md#2-acrescentar-um-ícone))                                |
| `documento.spec.js` reprova com a lista `doKit` não vazia ou o estilo do `body` mudado                                             | código do kit pôs listener no `document`/`window` ou mexeu no `body`/`<html>`              | leve o listener para o elemento da sobreposição; nunca estilize o `body`                                                     |
| `commit 1a2b3c4d sem Signed-off-by. Refaça com: git commit --amend -s (ou git rebase --signoff)` no check `dco`                    | um commit do PR sem `Signed-off-by`                                                        | `git rebase --signoff main` e empurre o branch de novo                                                                       |
| CI vermelho, gate local verde                                                                                                      | ambiente divergente; o CI instala com `--frozen-lockfile` e o Node do `.nvmrc`             | reproduza com o mesmo Node e `yarn install --frozen-lockfile --ignore-scripts` antes de qualquer outra coisa                 |

## 3. No app

| O que aparece                                                                                   | Causa                                                                                                   | O que fazer                                                                                                                                              |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A folha ou a confirmação cobre a página inteira, ou a caixa errada                              | a raiz do app está com `position: static`; a sobreposição é `position: absolute; inset: 0`              | `position: relative` na raiz do app ([README](../../README.pt-BR.md#como-usar-num-app))                                                                  |
| `[Vue warn]: Invalid prop: custom validator check failed for prop "nome".` e um ícone vazio     | um nome de ícone fora de `ICONES`, ou um nome do Material Symbols                                       | acrescente o ícone ([ESTENDER.md](ESTENDER.md#2-acrescentar-um-ícone)); `ink_eraser` não existe, `cleaning_services` entrou no lugar (0.3.0, 28/09/2026) |
| `"<nome>" não existe no Material Icons do @quasar/extras 1.18.0` do `scripts/icones.mjs`        | o nome não existe no Material Icons                                                                     | escolha um nome do Material Icons                                                                                                                        |
| Depois de confirmar, o foco cai no `body` e o Esc e o Tab não chegam mais na folha ainda aberta | quem abriu ficou desabilitado (o "Limpar" do QR Code, 28/09/2026); corrigido na 0.2.1                   | use a 0.2.1 ou mais nova                                                                                                                                 |
| No Safari, o Tab sai da folha a partir do primeiro botão                                        | o Safari pula botão no Tab por padrão; medido no WebKit em 27/09/2026 e corrigido na 0.1.0              | confira que nenhum código do app toma conta do Tab dentro da sobreposição                                                                                |
| Arrastar a alça da folha para baixo não faz nada                                                | versão anterior à 0.6.0 (auditoria de paridade, 28/09/2026), ou arraste menor que 110 px, que a devolve | 0.6.0 ou mais nova; arraste mais                                                                                                                         |
| A barra de carregando do `RosVazio` não anda                                                    | `leve` ligado, ou o sistema pede movimento reduzido                                                     | é o esperado                                                                                                                                             |
| O Esc numa folha aberta não fecha a janela do RoqueOS                                           | a folha segura o Esc de propósito                                                                       | é o esperado: feche a folha primeiro                                                                                                                     |

## 4. No RoqueOS

| O que aparece                                                                            | Causa                                                                                              | O que fazer                                                                         |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `uma cópia só do kit de interface, a mesma que os testes do front usam` reprova no front | o `resolutions` e o `devDependencies` apontam para tags diferentes, ou um app trouxe cópia própria | ponha a mesma tag nos dois, reinstale                                               |
| `o que está no PULAR ainda falha de verdade (a lista só encolhe)` reprova no front       | uma sobreposição do RoqueOS agora cumpre um comportamento que ainda está no `PULAR` dela           | tire a linha do `PULAR`; o comportamento passa a ser cobrado                        |
| Um teste de sobreposição do front reprova logo depois de subir o kit                     | um comportamento novo no pacote que o `ROSModal` ou o `ROSBottomSheet` não cumpre                  | conserte o componente do RoqueOS, ou ponha no `PULAR` com o motivo, na mesma subida |

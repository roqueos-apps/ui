# Estender

_Português | [English](../EXTENDING.md)_

> **Para quem:** quem precisa de um componente, um ícone ou um comportamento de sobreposição
> que o kit ainda não tem.
> **O que tem aqui:** os três pontos de extensão, passo a passo, e qual teste cobra cada regra.
> **Onde ir para o resto:** o que os testes provam está em [TESTES.md](TESTES.md); as regras de
> contribuição estão no [CONTRIBUTING.md](CONTRIBUTING.md).

## Sumário

1. [Acrescentar um componente](#1-acrescentar-um-componente)
2. [Acrescentar um ícone](#2-acrescentar-um-ícone)
3. [Acrescentar um comportamento ao pacote](#3-acrescentar-um-comportamento-ao-pacote)
4. [Acrescentar uma variável de tema](#4-acrescentar-uma-variável-de-tema)

## 1. Acrescentar um componente

Componente entra com o primeiro app que precisa dele, no mesmo ciclo: abra uma issue antes
([CONTRIBUTING.md](CONTRIBUTING.md)).

1. Escreva `src/RosNome.vue` com `<script setup>`, importando só `vue` e arquivos `./`.
2. Todo texto visível por prop, sem texto padrão. Cor só por `var(--ros-...)` da lista
   permitida, sempre com valor de reserva; as variáveis próprias como `--rui-*`; as classes
   como `rui-*`.
3. Se for sobreposição, ela mora dentro da raiz do app (`position: absolute`), trata o próprio
   Esc com `.stop`, e chama o `useSobreposicao` de [src/sobreposicao.js](../../src/sobreposicao.js).
4. Exporte em [src/index.js](../../src/index.js) e mostre em [dev/Vitrine.vue](../../dev/Vitrine.vue)
   nos estados que importam.
5. Teste em [test/componentes.spec.js](../../test/componentes.spec.js); uma sobreposição passa
   também pelo `testarSobreposicao` em [test/comportamento.spec.js](../../test/comportamento.spec.js)
   sem `pular`, e entra nos `casos` de [test/documento.spec.js](../../test/documento.spec.js).
6. Ponha a linha na tabela de componentes do README, as props na [REFERENCIA.md](REFERENCIA.md),
   uma linha de versão menor no [CHANGELOG.md](../../CHANGELOG.md).

```bash
yarn verificar
yarn dev
```

| Regra                                               | Quem cobra                                                                                |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| só importa `vue` e `./`                             | `o kit só importa vue e arquivo dele` em [test/regras.spec.js](../../test/regras.spec.js) |
| sem Quasar, sem RoqueOS, sem banco                  | `conferirImportsDoRoqueOS`, `conferirBanco` no mesmo arquivo                              |
| só variáveis `--ros-*` permitidas, nunca declaradas | `conferirVariaveis` no mesmo arquivo                                                      |
| não mexe no `document`                              | [test/documento.spec.js](../../test/documento.spec.js), para os componentes de `casos`    |
| comportamento de sobreposição                       | [test/comportamento.spec.js](../../test/comportamento.spec.js)                            |
| nenhum componente sem declaração no template        | `vue/no-undef-components` no [eslint.config.js](../../eslint.config.js)                   |

## 2. Acrescentar um ícone

A lista de ícones é contrato: o `RosIcone` recusa nome fora dela. Tenha um checkout do
`@quasar/extras` (o de `roqueos-front/node_modules/@quasar/extras` serve) e rode:

```bash
node scripts/icones.mjs <caminho do @quasar/extras> qr_code_2 download
yarn verificar
```

Ele imprime `N ícones em src/icones.js (@quasar/extras 1.18.0)` e reescreve o arquivo em
ordem de nome, mantendo os que já estavam. Nunca edite o [src/icones.js](../../src/icones.js) à
mão. Ponha o ícone no mesmo PR do componente ou do app que usa, e anote no CHANGELOG. Se a
versão do `@quasar/extras` mudar, atualize a linha no [ASSETS.md](../../ASSETS.md).

## 3. Acrescentar um comportamento ao pacote

Comportamento novo de sobreposição é mudança no que as duas famílias precisam fazer.

1. Acrescente a chave e a descrição em `COMPORTAMENTOS` e um `caso(...)` no
   `testarSobreposicao` de [src/comportamento.js](../../src/comportamento.js).
2. Atualize as chaves esperadas em [test/comportamento.spec.js](../../test/comportamento.spec.js);
   o kit tem de passar sem `pular`.
3. Confira a mutação: quebre o comportamento no kit e veja o teste reprovar, depois volte
   (CLAUDE.md: check novo passa por mutação antes de valer).
4. Lance uma versão menor e avise o front: na subida, o lado do RoqueOS ou cumpre o
   comportamento ou o registra no `PULAR` dele com o motivo ([OPERACAO.md](OPERACAO.md#3-atualizar-sem-quebrar)).

## 4. Acrescentar uma variável de tema

O kit não acrescenta uma variável `--ros-*` sozinho. A variável entra em
`VARIAVEIS_DO_SISTEMA` no `app-sdk` primeiro, com tag (e o RoqueOS reprova se ela sumir do
tema); depois o kit sobe a devDependency `@roqueos-apps/app-sdk` para essa tag no
[package.json](../../package.json), roda o `yarn verificar`, e a usa com valor de reserva.

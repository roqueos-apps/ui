# Testes

_Português | [English](../TESTING.md)_

> **Para quem:** quem escreve uma correção ou um componente e precisa saber qual teste
> escrever, e quem revisa.
> **O que tem aqui:** o que cada suíte prova, o critério de aceite, e o que nenhum teste cobre.
> **Onde ir para o resto:** como acrescentar uma peça está em [ESTENDER.md](ESTENDER.md); um
> teste vermelho com a mensagem está em [QUANDO-QUEBRA.md](QUANDO-QUEBRA.md).

## Sumário

1. [O gate](#1-o-gate)
2. [O que cada suíte prova](#2-o-que-cada-suíte-prova)
3. [Critério de aceite](#3-critério-de-aceite)
4. [O que nenhum teste cobre](#4-o-que-nenhum-teste-cobre)

## 1. O gate

```bash
yarn verificar
```

Lint, formato, testes e `app check --sdk`, o mesmo comando do CI
([.github/workflows/ci.yml](../../.github/workflows/ci.yml)) e do pre-push. Os testes são Vitest
no jsdom ([vite.config.js](../../vite.config.js)); o [test/preparar.js](../../test/preparar.js)
desmonta cada componente e esvazia o `body` depois de cada teste, para nenhum teste começar com
o documento sujo. Medido em 18/11/2026: 5 arquivos, 38 testes.

## 2. O que cada suíte prova

| Arquivo                                                        | Testes | Prova                                                                                                                                                                         |
| -------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [test/componentes.spec.js](../../test/componentes.spec.js)     | 14     | o ARIA, as variantes e os eventos de cada componente; a folha fecha pelo véu, pelo fechar e pelo arraste (110 px), mora na raiz do app; a confirmação abre no Cancelar        |
| [test/comportamento.spec.js](../../test/comportamento.spec.js) | 11     | o `RosFolha` e o `RosConfirmar` passam nos cinco comportamentos sem `pular`; o pacote tem exatamente essas cinco chaves                                                       |
| [test/documento.spec.js](../../test/documento.spec.js)         | 4      | abrir, teclar e fechar não mexem em estilo nem classe do `body`/`<html>` nem põem listener de `src/` no `document` ou na `window`; o Esc não sobe                             |
| [test/foco.spec.js](../../test/foco.spec.js)                   | 5      | o foco volta para quem abriu; recua para a sobreposição onde ele mora quando quem abriu está desabilitado (QR Code, 28/09/2026); nunca é inventado; fica onde a pessoa pôs    |
| [test/regras.spec.js](../../test/regras.spec.js)               | 4      | as regras do SDK (sem RoqueOS, sem banco, só variáveis permitidas), só imports de `vue`, cada entrada de `ICONES` é um caminho válido, todo ícone literal usado está na lista |

Contagem por arquivo como o `yarn test` imprimiu em 18/11/2026.

## 3. Critério de aceite

- `yarn verificar` verde, com a saída colada no PR ou no chat.
- Toda correção vem com um teste que reprova sem ela.
- Check novo passa por mutação antes de valer: quebre o que ele guarda e veja reprovar. O
  CHANGELOG registra a conta (por exemplo 0.6.0: 5 mutantes mortos; 0.1.0: 13 de 13).
- Mudança visível precisa também da vitrine aberta (`yarn dev`) com print.

## 4. O que nenhum teste cobre

Os testes rodam no jsdom. Layout de verdade, o arraste com um dedo de verdade, o Tab do Safari,
o D-pad da TV e o teclado do iPhone por cima da folha só se provam à mão, no `yarn dev` e no QA
de aparelho de cada app. Não provado por nenhum teste automático aqui.

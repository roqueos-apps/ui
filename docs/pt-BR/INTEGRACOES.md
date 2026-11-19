# Integrações

_Português | [English](../INTEGRATIONS.md)_

> **Para quem:** o autor de um app que usa o kit, e quem mantém o lado do RoqueOS.
> **O que tem aqui:** como o pacote se instala, o que ele exporta, o pacote de comportamento
> como API, e a cópia única que o RoqueOS força.
> **Onde ir para o resto:** cada prop está em [REFERENCIA.md](REFERENCIA.md); lançar uma tag
> está em [OPERACAO.md](OPERACAO.md).

## Sumário

1. [Instalar o pacote](#1-instalar-o-pacote)
2. [O que o pacote exporta](#2-o-que-o-pacote-exporta)
3. [O pacote de comportamento](#3-o-pacote-de-comportamento)
4. [A cópia única no RoqueOS](#4-a-cópia-única-no-roqueos)

O kit não tem API de rede, CLI, MCP nem webhook. A superfície dele é o pacote npm que outros
repos instalam do git.

## 1. Instalar o pacote

```json
{ "dependencies": { "@roqueos-apps/ui": "github:roqueos-apps/ui#v0.6.0" } }
```

Sempre uma tag exata, nunca branch nem commit solto. O `vue` é peer dependency (`^3.5.0`): o
app traz o dele. O Vite do app compila os `.vue` do kit a partir do fonte, como os do próprio
app. Quem consome hoje:

| Quem consome    | Como pina                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------ |
| Notas (`notas`) | `github:roqueos-apps/ui#v0.6.0` em `dependencies`                                          |
| QR Code         | `github:roqueos-apps/ui#v0.6.0` em `dependencies`                                          |
| Lousa (`lousa`) | `github:roqueos-apps/ui#v0.6.0` em `dependencies`                                          |
| Câmera          | `github:roqueos-apps/ui#v0.6.0` em `dependencies`                                          |
| `roqueos-front` | `git+ssh://git@github.com/roqueos-apps/ui.git#v0.6.0` em `devDependencies` e `resolutions` |

A lista foi lida do `package.json` de cada repo em 18/11/2026.

A raiz do app precisa ter posição (`position: relative`) para a folha e a confirmação, e todo
texto chega já traduzido.

## 2. O que o pacote exporta

| Import                                                                                                    | Para quê                                                     |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `import { RosIcone, RosBotao, RosInterruptor, RosFolha, RosConfirmar, RosVazio } from '@roqueos-apps/ui'` | os componentes                                               |
| `import { ICONES } from '@roqueos-apps/ui'`                                                               | listar ou conferir nomes de ícone                            |
| `import { prenderFoco, focaveis } from '@roqueos-apps/ui'`                                                | prender o foco num painel próprio do app                     |
| `import { testarSobreposicao, COMPORTAMENTOS } from '@roqueos-apps/ui/comportamento'`                     | rodar o pacote de comportamento contra qualquer sobreposição |

## 3. O pacote de comportamento

O pacote deixa qualquer sobreposição, do kit ou não, ser cobrada pelos mesmos cinco
comportamentos.

```js
import { describe, test, expect } from 'vitest'
import { testarSobreposicao } from '@roqueos-apps/ui/comportamento'

testarSobreposicao(
  { describe, test, expect },
  {
    nome: 'ROSModal',
    montar,
    pular: { tabDaVolta: 'o ROSModal não prende o Tab' },
  },
)
```

| Parâmetro | Obrigatório | Significado                                                                                                                                  |
| --------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `nome`    | sim         | nome no título do `describe`                                                                                                                 |
| `montar`  | sim         | devolve (ou resolve para), com a sobreposição fechada e montada no `document`: `quemAbre`, `abrir()`, `aberta()`, `dialogo()`, `desmontar()` |
| `pular`   | não         | por chave de `COMPORTAMENTOS`, por que este lado ainda não cumpre; o caso vira `test.skip` com o motivo no título                            |
| `esperar` | não         | como esperar entre os passos; o padrão é `setTimeout(0)`                                                                                     |

Os comportamentos (`COMPORTAMENTOS`): `papel` (diálogo modal para o leitor de tela),
`focoEntra`, `escFecha`, `focoVolta`, `tabDaVolta` (cada Tab e Shift+Tab anda por dentro e dá a
volta). O `montar` do próprio kit é o [test/montar.js](../../test/montar.js), um bom modelo.

## 4. A cópia única no RoqueOS

O front do RoqueOS instala cada app como dependência e o kit como devDependency. O
`resolutions` dele força uma cópia só do kit, na tag do front, e o teste
`apps-de-primeira-parte` dele reprova se o `resolutions` diverge do `devDependencies` ou se um
app instalado tem `node_modules/@roqueos-apps/ui` próprio. Duas cópias seriam dois kits na tela.
A consequência para o kit está em [OPERACAO.md](OPERACAO.md#3-atualizar-sem-quebrar): dentro
da 0.x ele só muda de forma compatível, ou todos os apps sobem juntos.

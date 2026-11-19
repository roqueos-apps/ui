# Documentação do ui

_Português | [English](../INDEX.md)_

> **Para quem:** quem chega ao kit de interface dos apps do RoqueOS: autor de app, quem
> contribui, o mantenedor, ou quem mexe nas sobreposições do RoqueOS.
> **O que tem aqui:** o mapa do que você quer para o documento que responde, e a lista dos
> diagramas.
> **Onde ir para o resto:** o produto e o começo em um minuto estão no
> [README](../../README.pt-BR.md).

Por onde começar depende do que você quer.

| Quero...                                              | Leia                                                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Instalar e ver funcionando**                        | [COMECAR.md](COMECAR.md): do zero à vitrine no `yarn dev` e ao gate verde                   |
| **Manter e lançar**                                   | [OPERACAO.md](OPERACAO.md): rotina, lançar uma tag, atualizar sem quebrar, desfazer         |
| **Entender uma falha**                                | [QUANDO-QUEBRA.md](QUANDO-QUEBRA.md): sintoma, causa, o que fazer                           |
| **Ver como ele é por dentro**                         | [ARQUITETURA.md](ARQUITETURA.md): contexto, componentes, fluxos, decisões, limites          |
| **Consultar um componente, prop, script ou arquivo**  | [REFERENCIA.md](REFERENCIA.md)                                                              |
| **Usar a partir de um app ou do RoqueOS**             | [INTEGRACOES.md](INTEGRACOES.md): o pacote, a tag, o pacote de comportamento, a cópia única |
| **Acrescentar um componente, ícone ou comportamento** | [ESTENDER.md](ESTENDER.md)                                                                  |
| **Saber o que cada teste prova**                      | [TESTES.md](TESTES.md)                                                                      |
| **Achar um termo**                                    | [GLOSSARIO.md](GLOSSARIO.md)                                                                |
| **Contribuir**                                        | [CONTRIBUTING.md](CONTRIBUTING.md)                                                          |
| **Ver o que mudou**                                   | [CHANGELOG.md](../../CHANGELOG.md)                                                          |

## Diagramas

Todos os diagramas são mermaid dentro do Markdown: o GitHub renderiza, a fonte é o texto, e o
par em inglês traduz os rótulos.

| Diagrama                                 | Fonte                                                                                   | Explicado em  |
| ---------------------------------------- | --------------------------------------------------------------------------------------- | ------------- |
| O kit, o SDK, os apps e o RoqueOS        | mermaid no [README](../../README.pt-BR.md#arquitetura)                                  | o README      |
| Contexto: app, kit, app-sdk, RoqueOS     | mermaid em [ARQUITETURA.md](ARQUITETURA.md#2-contexto)                                  | a mesma seção |
| Abrir e fechar uma folha                 | mermaid em [ARQUITETURA.md](ARQUITETURA.md#51-abrir-e-fechar-uma-folha)                 | a mesma seção |
| A confirmação                            | mermaid em [ARQUITETURA.md](ARQUITETURA.md#52-a-confirmação)                            | a mesma seção |
| O pacote de comportamento dos dois lados | mermaid em [ARQUITETURA.md](ARQUITETURA.md#53-o-pacote-de-comportamento-dos-dois-lados) | a mesma seção |
| De uma mudança no kit até os apps        | mermaid em [OPERACAO.md](OPERACAO.md#2-lançar-uma-versão)                               | a mesma seção |

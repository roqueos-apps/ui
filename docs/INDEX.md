# ui documentation

_[Português](pt-BR/INDEX.md) | English_

> **For whom:** anyone arriving at the RoqueOS app interface kit: an app author, a contributor,
> the maintainer, or whoever changes RoqueOS overlays.
> **What is here:** the map from what you want to the document that answers it, and the list of
> diagrams.
> **Where to go for the rest:** the product and the one-minute start are in the
> [README](../README.md).

Where to start depends on what you want.

| I want to...                                  | Read                                                                                               |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Install and see it running**                | [GETTING-STARTED.md](GETTING-STARTED.md): from zero to the showcase in `yarn dev` and a green gate |
| **Maintain and release**                      | [OPERATIONS.md](OPERATIONS.md): routine, release a tag, update without breaking, undo              |
| **Understand a failure**                      | [WHEN-IT-BREAKS.md](WHEN-IT-BREAKS.md): symptom, cause, what to do                                 |
| **See how it works inside**                   | [ARCHITECTURE.md](ARCHITECTURE.md): context, components, flows, decisions, limits                  |
| **Look up a component, prop, script or file** | [REFERENCE.md](REFERENCE.md)                                                                       |
| **Use it from an app or from RoqueOS**        | [INTEGRATIONS.md](INTEGRATIONS.md): the package, the tag, the behaviour pack, the single copy      |
| **Add a component, an icon or a behaviour**   | [EXTENDING.md](EXTENDING.md)                                                                       |
| **Know what each test proves**                | [TESTING.md](TESTING.md)                                                                           |
| **Find a term**                               | [GLOSSARY.md](GLOSSARY.md)                                                                         |
| **Contribute**                                | [CONTRIBUTING.md](../CONTRIBUTING.md)                                                              |
| **See what changed**                          | [CHANGELOG.md](../CHANGELOG.md)                                                                    |

## Diagrams

All diagrams are Mermaid inside the Markdown: GitHub renders them, the source is the text, and
the Portuguese pair translates the labels.

| Diagram                                | Source                                                                            | Explained in     |
| -------------------------------------- | --------------------------------------------------------------------------------- | ---------------- |
| The kit, the SDK, the apps and RoqueOS | Mermaid in the [README](../README.md#architecture)                                | the README       |
| Context: app, kit, app-sdk, RoqueOS    | Mermaid in [ARCHITECTURE.md](ARCHITECTURE.md#2-context)                           | the same section |
| Opening and closing a sheet            | Mermaid in [ARCHITECTURE.md](ARCHITECTURE.md#51-opening-and-closing-a-sheet)      | the same section |
| The confirmation                       | Mermaid in [ARCHITECTURE.md](ARCHITECTURE.md#52-the-confirmation)                 | the same section |
| The behaviour pack on both sides       | Mermaid in [ARCHITECTURE.md](ARCHITECTURE.md#53-the-behaviour-pack-on-both-sides) | the same section |
| From a change in the kit to the apps   | Mermaid in [OPERATIONS.md](OPERATIONS.md#2-release-a-version)                     | the same section |

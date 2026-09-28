# Changelog

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/), e o projeto
usa [versionamento semântico](https://semver.org/lang/pt-BR/): componente ou prop nova é
versão menor; mudar o que um componente faz com a mesma prop, ou tirar uma, é versão maior.

## [0.2.1] - 2026-09-28

### Corrigido

- **O foco não cai mais no `body` quando quem abriu a sobreposição não aceita mais foco.** No QR
  Code, o "Limpar" da folha do histórico abre a confirmação e fica desabilitado quando o
  histórico esvazia: o foco voltava para o `body`, e o Esc e o Tab não chegavam mais na folha,
  que continuava aberta (medido no QA do `yarn dev`, Chromium). Agora ele vai para o primeiro
  focável da sobreposição onde quem abriu mora, ou para ela mesma. Teste em `test/foco.spec.js`,
  com 2 mutantes mortos.

## [0.2.0] - 2026-09-28

### Adicionado

- 11 ícones para o QR Code (Onda 4b do Goal 28): `qr_code_2`, `download`, `content_copy`,
  `share`, `history`, `email`, `phone`, `wifi`, `sms`, `text_fields` e `delete_sweep`. São 35
  no total, do mesmo `@quasar/extras` 1.18.0.

## [0.1.0] - 2026-09-27

Nasce com o que as Notas usam, para elas saírem do RoqueOS (Onda 4a do Goal 28).

### Adicionado

- `RosIcone`, `RosBotao`, `RosInterruptor`, `RosFolha`, `RosConfirmar` e `RosVazio`, sem
  Quasar, com as cores do tema pelas variáveis do contrato do `app-sdk` 0.2.0 e valor de
  reserva para o `yarn dev`.
- 24 ícones do Material Icons em `src/icones.js`, gerados por `scripts/icones.mjs`.
- `prenderFoco` e `focaveis`, que prendem e devolvem o foco sem mexer no `document`.
- `@roqueos-apps/ui/comportamento`: o contrato de comportamento executável de uma
  sobreposição (papel de diálogo, foco que entra, Esc que fecha, foco que volta, Tab que dá a
  volta), para o RoqueOS rodar contra os componentes dele.
- Testes que reprovam o kit que mexe no `document`, importa algo além de `vue`, usa variável
  `--ros-*` fora do contrato ou ícone fora da lista. 13 mutantes, 13 mortos.

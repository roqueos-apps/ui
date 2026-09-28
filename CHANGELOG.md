# Changelog

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/), e o projeto
usa [versionamento semântico](https://semver.org/lang/pt-BR/): componente ou prop nova é
versão menor; mudar o que um componente faz com a mesma prop, ou tirar uma, é versão maior.

## [0.5.0] - 2026-09-28

### Adicionado

- **`RosVazio` com `carregando`**: a barra que corre embaixo do título, o `ROSAppLoader
state="loading"` do RoqueOS. A Câmera ("Iniciando a câmera") e a Lousa ("Carregando quadro")
  tinham essa barra dentro do núcleo e ficaram com o estado parado na saída; a auditoria de
  paridade de 28/09/2026 achou. Com `leve` (o perfil leve do sistema) ou com movimento reduzido,
  a barra fica parada. Teste em `test/componentes.spec.js`, 3 mutantes mortos.

## [0.4.0] - 2026-09-28

### Adicionado

- 14 ícones para a Câmera (Goal 28): `photo_camera`, `flash_on`, `flash_off`, `cameraswitch`,
  `photo_library`, `videocam`, `timer`, `aspect_ratio`, `hd`, `grid_on`, `flip`, `straighten`,
  `no_photography` e `videocam_off`. São 70 no total, do mesmo `@quasar/extras` 1.18.0.

## [0.3.0] - 2026-09-28

### Adicionado

- 20 ícones para a Lousa (Goal 28): `dashboard`, `save`, `undo`, `redo`, `zoom_out`, `zoom_in`,
  `fit_screen`, `draw`, `edit`, `colorize`, `near_me`, `pan_tool`, `brush`, `horizontal_rule`,
  `arrow_right_alt`, `crop_square`, `circle`, `change_history`, `cleaning_services` e `menu`.
  São 56 no total, do mesmo `@quasar/extras` 1.18.0. A borracha da Lousa usava `ink_eraser`,
  que é do Material Symbols e não existe no Material Icons (nem na fonte que o RoqueOS carrega):
  entra `cleaning_services` no lugar.

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

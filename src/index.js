// O KIT DE INTERFACE DOS APPS DO ROQUEOS.
//
// O que um app de fora do RoqueOS precisa para parecer e se comportar como um app de
// dentro: o ícone pelo nome, o botão, o interruptor, a folha de ajustes, a confirmação e o
// estado vazio. Sem Quasar e sem nada do RoqueOS: só Vue, e as variáveis de tema que o
// contrato do `app-sdk` lista (`VARIAVEIS_DO_SISTEMA`), com um valor de reserva para o app
// rodar igual no `yarn dev`, fora do RoqueOS.
//
// O kit nasce com o que as Notas usam (Onda 4a do Goal 28) e cresce com o app que precisar
// de mais, no mesmo PR. O texto que um componente mostra vem por prop, já no idioma do app:
// o kit não tem idioma próprio.

export { default as RosIcone } from './RosIcone.vue'
export { default as RosBotao } from './RosBotao.vue'
export { default as RosInterruptor } from './RosInterruptor.vue'
export { default as RosFolha } from './RosFolha.vue'
export { default as RosConfirmar } from './RosConfirmar.vue'
export { default as RosVazio } from './RosVazio.vue'
export { ICONES } from './icones.js'
export { prenderFoco, focaveis } from './foco.js'

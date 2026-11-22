<template>
  <button
    :type="tipo"
    class="rui-botao"
    :class="[
      `rui-botao--${variante}`,
      { 'rui-botao--so-icone': soIcone, 'rui-botao--ligado': ligado },
    ]"
    :style="estiloDoAcento(acento)"
    :aria-label="soIcone ? rotulo : undefined"
    :title="rotulo || undefined"
    :aria-pressed="ligado === null ? undefined : String(ligado)"
  >
    <RosIcone v-if="icone" :nome="icone" :tamanho="tamanhoDoIcone" />
    <span v-if="$slots.default" class="rui-botao__texto"><slot /></span>
  </button>
</template>

<script setup>
// O botão dos apps. Três jeitos: `primario` (a ação principal, na cor do app), `fantasma`
// (ação de barra, sem fundo) e `perigo` (apagar). Botão só de ícone precisa de `rotulo`:
// é o que o leitor de tela lê e o que aparece ao passar o mouse.
//
// O texto de cada variante passa de 4,5:1 sobre o próprio fundo nos dois temas (o teste em
// `test/contraste.spec.js` calcula a partir deste CSS). Sem `acento`, o primário é o azul de
// preenchimento do RoqueOS (#0062cc) com texto branco, 5,8:1; com `acento`, `estiloDoAcento`
// escolhe branco ou preto pela cor do app. O ligado pinta o ícone com o acento misturado à cor
// do texto do tema, que clareia no escuro e escurece no claro.
import { computed, useSlots } from 'vue'
import RosIcone from './RosIcone.vue'
import { estiloDoAcento } from './acento.js'

const props = defineProps({
  variante: {
    type: String,
    default: 'fantasma',
    validator: (v) => ['primario', 'fantasma', 'perigo'].includes(v),
  },
  icone: { type: String, default: '' },
  tamanhoDoIcone: { type: [Number, String], default: 20 },
  /** O que o botão faz, em texto. Obrigatório no botão só de ícone. */
  rotulo: { type: String, default: '' },
  /** Cor do app (`#f59e0b`) para o primário e o estado ligado. */
  acento: { type: String, default: '' },
  /** Botão de alternar (fixar, mostrar na mesa): `true`/`false`; `null` quando não alterna. */
  ligado: { type: Boolean, default: null },
  tipo: { type: String, default: 'button' },
})

const slots = useSlots()
const soIcone = computed(() => Boolean(props.icone) && !slots.default)
</script>

<style scoped>
.rui-botao {
  --rui-acento-padrao: #007aff;
  /* O azul de preenchimento do RoqueOS (`--ros-accent-fill-rgb`): branco em cima dá 5,8:1. */
  --rui-acento-fundo-padrao: #0062cc;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 14px;
  border: 0;
  border-radius: 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  color: rgba(var(--ros-text-rgb, 255, 255, 255), 0.9);
  background: transparent;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    transform 0.1s ease;
  -webkit-tap-highlight-color: transparent;
}

.rui-botao:focus-visible {
  outline: 2px solid var(--rui-acento, var(--rui-acento-padrao));
  outline-offset: 2px;
}

.rui-botao:active {
  transform: scale(0.97);
}

.rui-botao:disabled {
  opacity: 0.45;
  cursor: default;
}

.rui-botao--so-icone {
  width: 34px;
  padding: 0;
}

.rui-botao--primario {
  color: var(--rui-acento-tinta, rgb(var(--ros-white-rgb, 255, 255, 255)));
  background: var(--rui-acento, var(--rui-acento-fundo-padrao));
}

.rui-botao--primario:hover {
  filter: brightness(1.08);
}

.rui-botao--fantasma:hover {
  background: rgba(var(--ros-fill-rgb, 255, 255, 255), 0.08);
}

.rui-botao--fantasma.rui-botao--ligado {
  color: color-mix(
    in srgb,
    var(--rui-acento, var(--rui-acento-padrao)) var(--rui-acento-mistura, 72%),
    rgb(var(--ros-text-rgb, 255, 255, 255))
  );
  background: rgba(var(--ros-fill-rgb, 255, 255, 255), 0.1);
}

.rui-botao--perigo {
  color: rgb(var(--ros-white-rgb, 255, 255, 255));
  /* O vermelho do escuro (255, 59, 48) dava 3,5:1 com branco; 80% dele com preto dá 5,2:1, e
     o do claro (196, 0, 15) fica em 8,6:1. */
  background: color-mix(
    in srgb,
    rgb(var(--ros-danger-rgb, 255, 59, 48)) 80%,
    rgb(var(--ros-black-rgb, 0, 0, 0))
  );
}

.rui-botao--perigo:hover {
  filter: brightness(1.08);
}

@media (prefers-reduced-motion: reduce) {
  .rui-botao {
    transition: none;
  }

  .rui-botao:active {
    transform: none;
  }
}
</style>

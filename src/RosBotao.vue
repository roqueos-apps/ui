<template>
  <button
    :type="tipo"
    class="rui-botao"
    :class="[
      `rui-botao--${variante}`,
      { 'rui-botao--so-icone': soIcone, 'rui-botao--ligado': ligado },
    ]"
    :style="acento ? { '--rui-acento': acento } : null"
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
import { computed, useSlots } from 'vue'
import RosIcone from './RosIcone.vue'

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
  color: rgb(var(--ros-black-rgb, 0, 0, 0));
  background: var(--rui-acento, var(--rui-acento-padrao));
}

.rui-botao--primario:hover {
  filter: brightness(1.08);
}

.rui-botao--fantasma:hover {
  background: rgba(var(--ros-fill-rgb, 255, 255, 255), 0.08);
}

.rui-botao--fantasma.rui-botao--ligado {
  color: var(--rui-acento, var(--rui-acento-padrao));
  background: rgba(var(--ros-fill-rgb, 255, 255, 255), 0.1);
}

.rui-botao--perigo {
  color: rgb(var(--ros-white-rgb, 255, 255, 255));
  background: rgb(var(--ros-danger-rgb, 255, 59, 48));
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

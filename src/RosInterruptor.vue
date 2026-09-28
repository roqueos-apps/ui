<template>
  <button
    type="button"
    role="switch"
    class="rui-interruptor"
    :class="{ 'rui-interruptor--ligado': modelValue }"
    :style="acento ? { '--rui-acento': acento } : null"
    :aria-checked="String(modelValue)"
    :aria-label="rotulo"
    :disabled="desabilitado"
    @click="emit('update:modelValue', !modelValue)"
  >
    <span class="rui-interruptor__bolinha" />
  </button>
</template>

<script setup>
// Liga e desliga, como o `q-toggle` do RoqueOS. É um `<button role="switch">`: o Espaço e o
// Enter alternam sozinhos, o leitor de tela diz "ligado"/"desligado" pelo `aria-checked`, e o
// OK do controle da TV funciona como clique. O `rotulo` é obrigatório porque o interruptor
// não tem texto próprio; quem está do lado dele na tela não conta para o leitor.
defineProps({
  modelValue: { type: Boolean, default: false },
  rotulo: { type: String, required: true },
  acento: { type: String, default: '' },
  desabilitado: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.rui-interruptor {
  --rui-acento-padrao: #007aff;
  position: relative;
  flex: none;
  width: 40px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  background: rgba(var(--ros-fill-rgb, 255, 255, 255), 0.18);
  transition: background-color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.rui-interruptor:focus-visible {
  outline: 2px solid var(--rui-acento, var(--rui-acento-padrao));
  outline-offset: 2px;
}

.rui-interruptor:disabled {
  opacity: 0.45;
  cursor: default;
}

.rui-interruptor--ligado {
  background: var(--rui-acento, var(--rui-acento-padrao));
}

.rui-interruptor__bolinha {
  position: absolute;
  top: 3px;
  inset-inline-start: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgb(var(--ros-white-rgb, 255, 255, 255));
  box-shadow: 0 1px 3px rgba(var(--ros-shadow-rgb, 0, 0, 0), 0.35);
  transition: transform 0.2s ease;
}

.rui-interruptor--ligado .rui-interruptor__bolinha {
  transform: translateX(16px);
}

/* Em árabe a bolinha anda para o outro lado, como o texto. */
:dir(rtl) .rui-interruptor--ligado .rui-interruptor__bolinha {
  transform: translateX(-16px);
}

@media (prefers-reduced-motion: reduce) {
  .rui-interruptor,
  .rui-interruptor__bolinha {
    transition: none;
  }
}
</style>

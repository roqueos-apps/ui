<template>
  <Transition name="rui-folha">
    <div
      v-if="modelValue"
      class="rui-folha"
      :style="acento ? { '--rui-acento': acento } : null"
      @keydown.esc.stop.prevent="fechar"
    >
      <div class="rui-folha__veu" aria-hidden="true" @click="fechar" />
      <section
        ref="painel"
        class="rui-folha__painel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="idDoTitulo"
        tabindex="-1"
        :style="arraste > 0 ? { transform: `translateY(${arraste}px)`, transition: 'none' } : null"
      >
        <div
          class="rui-folha__puxador"
          aria-hidden="true"
          @pointerdown="comecarArraste"
          @pointermove="arrastar"
          @pointerup="soltar"
          @pointercancel="cancelarArraste"
        >
          <span class="rui-folha__alca" />
        </div>
        <header class="rui-folha__cabeca">
          <RosIcone v-if="icone" :nome="icone" :tamanho="20" class="rui-folha__icone" />
          <h2 :id="idDoTitulo" class="rui-folha__titulo">{{ titulo }}</h2>
          <RosBotao icone="close" :rotulo="rotuloFechar" @click="fechar" />
        </header>
        <div class="rui-folha__corpo">
          <slot />
        </div>
      </section>
    </div>
  </Transition>
</template>

<script setup>
// A folha que sobe de baixo, para ajustes e escolhas do app (o `ROSBottomSheet` do RoqueOS).
//
// Mora DENTRO do app: cobre a janela do app, não a tela inteira, e não mexe no `document`
// (o motivo está em `src/foco.js`). A raiz do app precisa de `position: relative` (ou
// qualquer posição que não seja `static`) para a folha se prender a ela.
//
// Fecha pelo Esc, pelo véu, pelo botão de fechar e arrastando a alça para baixo, e devolve o
// foco para quem abriu. O arrastar é do dedo (quem usa teclado tem o Esc e o fechar), e
// escuta só a alça, que prende o ponteiro: nada vai para o `window` nem para o `document`.
import { ref, useId } from 'vue'
import RosIcone from './RosIcone.vue'
import RosBotao from './RosBotao.vue'
import { useSobreposicao } from './sobreposicao.js'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  titulo: { type: String, required: true },
  icone: { type: String, default: '' },
  acento: { type: String, default: '' },
  /** O texto do botão de fechar, no idioma do app (o kit não tem idioma próprio). */
  rotuloFechar: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue'])

const painel = ref(null)
const idDoTitulo = `rui-folha-${useId()}`
const fechar = () => emit('update:modelValue', false)

// Arrastar a alça para baixo além disto fecha; menos que isto, a folha volta. O mesmo limite
// do `ROSBottomSheet`, que as Notas, a Câmera e o Quadro Branco usavam dentro do RoqueOS.
const LIMITE_DO_ARRASTE = 110
const arraste = ref(0)
let inicioDoArraste = null

function comecarArraste(evento) {
  inicioDoArraste = evento.clientY
  arraste.value = 0
  evento.currentTarget?.setPointerCapture?.(evento.pointerId)
}
function arrastar(evento) {
  if (inicioDoArraste === null) return
  // Para cima fica negativo, e a folha não sobe além do lugar (o `style` só desce).
  arraste.value = evento.clientY - inicioDoArraste
}
function soltar() {
  if (inicioDoArraste === null) return
  const passou = arraste.value > LIMITE_DO_ARRASTE
  cancelarArraste()
  if (passou) fechar()
}
function cancelarArraste() {
  inicioDoArraste = null
  arraste.value = 0
}

useSobreposicao(() => props.modelValue, painel)
</script>

<style scoped>
.rui-folha {
  position: absolute;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.rui-folha__veu {
  position: absolute;
  inset: 0;
  background: rgba(var(--ros-scrim-rgb, 0, 0, 0), 0.55);
}

.rui-folha__painel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 520px;
  max-height: 85%;
  padding: 6px 16px calc(16px + env(safe-area-inset-bottom, 0px));
  border-radius: 16px 16px 0 0;
  color: rgba(var(--ros-text-rgb, 255, 255, 255), 0.92);
  background: rgba(var(--ros-surface-0-rgb, 30, 30, 30), 0.98);
  box-shadow: 0 -12px 40px rgba(var(--ros-shadow-rgb, 0, 0, 0), 0.5);
  border: 1px solid rgba(var(--ros-line-rgb, 255, 255, 255), 0.1);
  border-bottom: 0;
  outline: none;
}

.rui-folha__puxador {
  display: flex;
  justify-content: center;
  align-self: stretch;
  margin: -6px -16px 0;
  padding: 10px 0 12px;
  cursor: grab;
  touch-action: none;
}

.rui-folha__alca {
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: rgba(var(--ros-fill-rgb, 255, 255, 255), 0.25);
}

.rui-folha__cabeca {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(var(--ros-line-rgb, 255, 255, 255), 0.08);
}

.rui-folha__icone {
  color: var(--rui-acento, #007aff);
}

.rui-folha__titulo {
  flex: 1;
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.rui-folha__corpo {
  overflow-y: auto;
  padding-top: 12px;
  overscroll-behavior: contain;
}

.rui-folha-enter-active,
.rui-folha-leave-active {
  transition: opacity 0.2s ease;
}

.rui-folha-enter-active .rui-folha__painel,
.rui-folha-leave-active .rui-folha__painel {
  transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

.rui-folha-enter-from,
.rui-folha-leave-to {
  opacity: 0;
}

.rui-folha-enter-from .rui-folha__painel,
.rui-folha-leave-to .rui-folha__painel {
  transform: translateY(24px);
}

@media (prefers-reduced-motion: reduce) {
  .rui-folha-enter-active,
  .rui-folha-leave-active,
  .rui-folha-enter-active .rui-folha__painel,
  .rui-folha-leave-active .rui-folha__painel {
    transition: none;
  }
}
</style>

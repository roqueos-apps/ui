<template>
  <Transition name="rui-confirmar">
    <div v-if="modelValue" class="rui-confirmar" @keydown.esc.stop.prevent="cancelar">
      <div class="rui-confirmar__veu" aria-hidden="true" @click="cancelar" />
      <section
        ref="painel"
        class="rui-confirmar__cartao"
        role="alertdialog"
        aria-modal="true"
        :aria-labelledby="idDoTitulo"
        :aria-describedby="texto ? idDoTexto : undefined"
        tabindex="-1"
      >
        <div
          v-if="icone"
          class="rui-confirmar__icone"
          :class="{ 'rui-confirmar__icone--perigo': perigo }"
        >
          <RosIcone :nome="icone" :tamanho="24" />
        </div>
        <h2 :id="idDoTitulo" class="rui-confirmar__titulo">{{ titulo }}</h2>
        <p v-if="texto" :id="idDoTexto" class="rui-confirmar__texto">{{ texto }}</p>
        <div class="rui-confirmar__acoes">
          <RosBotao ref="botaoCancelar" variante="fantasma" @click="cancelar">
            {{ rotuloCancelar }}
          </RosBotao>
          <RosBotao :variante="perigo ? 'perigo' : 'primario'" :acento="acento" @click="confirmar">
            {{ rotuloConfirmar }}
          </RosBotao>
        </div>
      </section>
    </div>
  </Transition>
</template>

<script setup>
// A pergunta antes do que não tem volta ("Apagar a nota?"), o `ROSModal type="confirm"` do
// RoqueOS. Mora dentro do app, como a folha, e não mexe no `document`.
//
// O foco abre no CANCELAR, de propósito: o Enter de quem estava digitando, ou o OK do
// controle da TV apertado duas vezes, não pode apagar nada. Esc e clique no véu cancelam.
import { ref, useId } from 'vue'
import RosIcone from './RosIcone.vue'
import RosBotao from './RosBotao.vue'
import { useSobreposicao } from './sobreposicao.js'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  titulo: { type: String, required: true },
  texto: { type: String, default: '' },
  icone: { type: String, default: '' },
  /** Ação destrutiva: botão vermelho e ícone vermelho. */
  perigo: { type: Boolean, default: false },
  acento: { type: String, default: '' },
  rotuloConfirmar: { type: String, required: true },
  rotuloCancelar: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue', 'confirmar', 'cancelar'])

const painel = ref(null)
const botaoCancelar = ref(null)
const id = useId()
const idDoTitulo = `rui-confirmar-${id}-titulo`
const idDoTexto = `rui-confirmar-${id}-texto`

function cancelar() {
  emit('update:modelValue', false)
  emit('cancelar')
}
function confirmar() {
  emit('update:modelValue', false)
  emit('confirmar')
}

useSobreposicao(() => props.modelValue, painel, {
  inicial: () => botaoCancelar.value?.$el ?? null,
})
</script>

<style scoped>
.rui-confirmar {
  position: absolute;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 16px;
}

.rui-confirmar__veu {
  position: absolute;
  inset: 0;
  background: rgba(var(--ros-scrim-rgb, 0, 0, 0), 0.55);
}

.rui-confirmar__cartao {
  position: relative;
  width: 100%;
  max-width: 340px;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  color: rgba(var(--ros-text-rgb, 255, 255, 255), 0.92);
  background: rgba(var(--ros-surface-0-rgb, 30, 30, 30), 0.98);
  border: 1px solid rgba(var(--ros-line-rgb, 255, 255, 255), 0.1);
  box-shadow: 0 20px 50px rgba(var(--ros-shadow-rgb, 0, 0, 0), 0.5);
  outline: none;
}

.rui-confirmar__icone {
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: 10px;
  border-radius: 50%;
  color: var(--rui-acento, #007aff);
  background: rgba(var(--ros-fill-rgb, 255, 255, 255), 0.08);
}

.rui-confirmar__icone--perigo {
  color: rgb(var(--ros-danger-rgb, 255, 59, 48));
  background: rgba(var(--ros-danger-rgb, 255, 59, 48), 0.14);
}

.rui-confirmar__titulo {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 600;
}

.rui-confirmar__texto {
  margin: 0 0 16px;
  font-size: 13px;
  line-height: 1.45;
  color: rgba(var(--ros-text-rgb, 255, 255, 255), 0.7);
}

.rui-confirmar__acoes {
  display: flex;
  gap: 8px;
}

.rui-confirmar__acoes > * {
  flex: 1;
}

.rui-confirmar-enter-active,
.rui-confirmar-leave-active {
  transition: opacity 0.18s ease;
}

.rui-confirmar-enter-from,
.rui-confirmar-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .rui-confirmar-enter-active,
  .rui-confirmar-leave-active {
    transition: none;
  }
}
</style>

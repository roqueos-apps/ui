<template>
  <svg
    class="rui-icone"
    :width="medida"
    :height="medida"
    :viewBox="desenho.viewBox ?? '0 0 24 24'"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, i) in desenho.caminhos" :key="i" :d="d" />
  </svg>
</template>

<script setup>
// Um ícone do Material Icons pelo nome, como o `<q-icon name>` do RoqueOS, desenhado em
// SVG a partir de `src/icones.js`. Decorativo por padrão (`aria-hidden`): o texto que diz o
// que o botão faz vai no botão (`aria-label` ou `title`), não no ícone.
import { computed } from 'vue'
import { ICONES } from './icones.js'

const props = defineProps({
  /** Um nome de `ICONES`. Nome fora da lista é defeito do app, e o Vue avisa no console. */
  nome: { type: String, required: true, validator: (n) => n in ICONES },
  /** Lado em pixels. */
  tamanho: { type: [Number, String], default: 20 },
})

const desenho = computed(() => ICONES[props.nome] ?? { caminhos: [] })
const medida = computed(() => Number(props.tamanho) || 20)
</script>

<style scoped>
.rui-icone {
  display: inline-block;
  flex: none;
  vertical-align: middle;
}
</style>

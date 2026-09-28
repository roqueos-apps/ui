<template>
  <div class="rui-vazio" :style="acento ? { '--rui-acento': acento } : null" role="status">
    <div v-if="icone" class="rui-vazio__icone">
      <RosIcone :nome="icone" :tamanho="32" />
    </div>
    <p class="rui-vazio__titulo">{{ titulo }}</p>
    <p v-if="subtitulo" class="rui-vazio__subtitulo">{{ subtitulo }}</p>
    <div
      v-if="carregando"
      class="rui-vazio__barra"
      :class="{ 'rui-vazio__barra--parada': leve }"
      aria-hidden="true"
    >
      <span></span>
    </div>
    <div v-if="$slots.default" class="rui-vazio__acoes"><slot /></div>
  </div>
</template>

<script setup>
// O estado vazio de um app ("Nenhuma nota ainda"), o `ROSAppLoader state="empty"` do
// RoqueOS: ícone na cor do app, uma frase, uma dica e, no slot, a ação que sai dele.
// Com `carregando`, é o `state="loading"`: a barra que corre embaixo diz que algo está
// acontecendo (a Câmera iniciando, a Lousa abrindo o quadro). Com `leve` (o perfil leve do
// sistema) ou com movimento reduzido, a barra fica parada.
import RosIcone from './RosIcone.vue'

defineProps({
  titulo: { type: String, required: true },
  subtitulo: { type: String, default: '' },
  icone: { type: String, default: '' },
  acento: { type: String, default: '' },
  carregando: { type: Boolean, default: false },
  leve: { type: Boolean, default: false },
})
</script>

<style scoped>
.rui-vazio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 32px 16px;
  text-align: center;
  color: rgba(var(--ros-text-rgb, 255, 255, 255), 0.92);
}

.rui-vazio__icone {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
  border-radius: 20px;
  color: var(--rui-acento, #007aff);
  background: rgba(var(--ros-fill-rgb, 255, 255, 255), 0.06);
  border: 1px solid rgba(var(--ros-line-rgb, 255, 255, 255), 0.08);
}

.rui-vazio__titulo {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.rui-vazio__subtitulo {
  margin: 0;
  font-size: 13px;
  color: rgba(var(--ros-text-rgb, 255, 255, 255), 0.6);
}

.rui-vazio__acoes {
  margin-top: 12px;
}

.rui-vazio__barra {
  position: relative;
  width: 120px;
  height: 3px;
  margin-top: 10px;
  overflow: hidden;
  border-radius: 3px;
  background: rgba(var(--ros-fill-rgb, 255, 255, 255), 0.1);
}

.rui-vazio__barra span {
  position: absolute;
  inset: 0 auto 0 0;
  width: 40%;
  border-radius: inherit;
  background: var(--rui-acento, #007aff);
  animation: rui-vazio-barra 1.3s ease-in-out infinite;
}

.rui-vazio__barra--parada span {
  animation: none;
  left: 30%;
}

@keyframes rui-vazio-barra {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(250%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .rui-vazio__barra span {
    animation: none;
    left: 30%;
  }
}
</style>

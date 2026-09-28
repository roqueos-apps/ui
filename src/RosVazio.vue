<template>
  <div class="rui-vazio" :style="acento ? { '--rui-acento': acento } : null" role="status">
    <div v-if="icone" class="rui-vazio__icone">
      <RosIcone :nome="icone" :tamanho="32" />
    </div>
    <p class="rui-vazio__titulo">{{ titulo }}</p>
    <p v-if="subtitulo" class="rui-vazio__subtitulo">{{ subtitulo }}</p>
    <div v-if="$slots.default" class="rui-vazio__acoes"><slot /></div>
  </div>
</template>

<script setup>
// O estado vazio de um app ("Nenhuma nota ainda"), o `ROSAppLoader state="empty"` do
// RoqueOS: ícone na cor do app, uma frase, uma dica e, no slot, a ação que sai dele.
import RosIcone from './RosIcone.vue'

defineProps({
  titulo: { type: String, required: true },
  subtitulo: { type: String, default: '' },
  icone: { type: String, default: '' },
  acento: { type: String, default: '' },
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
</style>

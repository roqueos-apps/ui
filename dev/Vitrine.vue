<template>
  <main class="vitrine">
    <h1>Kit de interface do RoqueOS</h1>

    <section>
      <h2>RosIcone</h2>
      <div class="linha icones">
        <span v-for="nome in nomes" :key="nome" :title="nome"><RosIcone :nome="nome" /></span>
      </div>
    </section>

    <section>
      <h2>RosBotao</h2>
      <div class="linha">
        <RosBotao variante="primario" icone="add" acento="#f59e0b">Nova nota</RosBotao>
        <RosBotao icone="tune" rotulo="Ajustes" />
        <RosBotao
          icone="push_pin"
          rotulo="Fixar"
          :ligado="fixa"
          acento="#f59e0b"
          @click="fixa = !fixa"
        />
        <RosBotao variante="perigo" icone="delete">Apagar</RosBotao>
        <RosBotao disabled>Desabilitado</RosBotao>
      </div>
    </section>

    <section>
      <h2>RosInterruptor</h2>
      <div class="linha">
        <RosInterruptor v-model="ligado" rotulo="Mostrar na mesa" acento="#f59e0b" />
        <span>{{ ligado ? 'ligado' : 'desligado' }}</span>
      </div>
    </section>

    <section>
      <h2>RosVazio</h2>
      <RosVazio
        icone="sticky_note_2"
        titulo="Nenhuma nota ainda"
        subtitulo="A primeira fica aqui"
        acento="#f59e0b"
      >
        <RosBotao variante="primario" icone="add" acento="#f59e0b">Nova nota</RosBotao>
      </RosVazio>
    </section>

    <section>
      <h2>RosFolha e RosConfirmar, dentro de uma "janela"</h2>
      <div class="janela">
        <div class="linha">
          <RosBotao icone="tune" @click="folha = true">Abrir a folha</RosBotao>
          <RosBotao variante="perigo" icone="delete" @click="confirmar = true">Apagar…</RosBotao>
        </div>
        <p>{{ resultado }}</p>
        <RosFolha
          v-model="folha"
          titulo="Ajustes"
          icone="tune"
          acento="#f59e0b"
          rotulo-fechar="Fechar"
        >
          <div class="linha">
            <span>Mostrar na mesa</span>
            <RosInterruptor v-model="ligado" rotulo="Mostrar na mesa" acento="#f59e0b" />
          </div>
        </RosFolha>
        <RosConfirmar
          v-model="confirmar"
          titulo="Apagar a nota?"
          texto="Ela some das Notas e da área de trabalho."
          icone="delete"
          perigo
          rotulo-confirmar="Apagar"
          rotulo-cancelar="Cancelar"
          @confirmar="resultado = 'apagou'"
          @cancelar="resultado = 'cancelou'"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import {
  ICONES,
  RosIcone,
  RosBotao,
  RosInterruptor,
  RosVazio,
  RosFolha,
  RosConfirmar,
} from '../src/index.js'

const nomes = Object.keys(ICONES)
const fixa = ref(false)
const ligado = ref(true)
const folha = ref(false)
const confirmar = ref(false)
const resultado = ref('')
</script>

<style>
body {
  margin: 0;
  min-height: 100vh;
  font-family: system-ui, sans-serif;
  color: #e9eaed;
  background: radial-gradient(circle at 30% 20%, #2b3a55, #11151d 70%);
}

.vitrine {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px 64px;
}

.vitrine h2 {
  font-size: 14px;
  opacity: 0.7;
}

.linha {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.icones span {
  display: inline-grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
}

.janela {
  position: relative;
  height: 360px;
  padding: 16px;
  overflow: hidden;
  border-radius: 12px;
  background: #1d2129;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
}
</style>

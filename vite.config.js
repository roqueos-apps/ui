// O Vite do repo serve dois usos: `yarn dev`, que abre a vitrine do kit (dev/), com cada
// componente nos estados que importam, e `yarn test`, com o Vitest. No RoqueOS quem compila
// o kit é o Vite do próprio RoqueOS, a partir do fonte: este arquivo não vai junto.
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    setupFiles: ['test/preparar.js'],
    include: ['test/**/*.spec.js'],
  },
})

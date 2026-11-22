// A vitrine do kit no `yarn dev`: cada componente nos estados que importam, sobre um fundo
// parecido com o do RoqueOS. `?dir=rtl` mostra o árabe (o interruptor anda para o outro
// lado), e `?tema=claro` liga as bases do tema claro do RoqueOS no `:root`, como o sistema
// faz (`temas.scss`). É por aqui que quem contribui vê o que mudou antes de abrir o PR.
import { createApp } from 'vue'
import Vitrine from './Vitrine.vue'

if (new URLSearchParams(location.search).get('dir') === 'rtl') {
  document.documentElement.dir = 'rtl'
  document.documentElement.lang = 'ar-AR'
}
if (new URLSearchParams(location.search).get('tema') === 'claro') {
  const claro = {
    '--ros-text-rgb': '0, 0, 0',
    '--ros-fill-rgb': '0, 0, 0',
    '--ros-line-rgb': '0, 0, 0',
    '--ros-scrim-rgb': '0, 0, 0',
    '--ros-shadow-rgb': '0, 0, 0',
    '--ros-surface-0-rgb': '240, 240, 243',
    '--ros-danger-rgb': '196, 0, 15',
  }
  for (const [nome, valor] of Object.entries(claro))
    document.documentElement.style.setProperty(nome, valor)
  document.documentElement.dataset.tema = 'claro'
}
createApp(Vitrine).mount('#vitrine')

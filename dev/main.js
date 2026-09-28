// A vitrine do kit no `yarn dev`: cada componente nos estados que importam, sobre um fundo
// parecido com o do RoqueOS. `?dir=rtl` mostra o árabe (o interruptor anda para o outro
// lado). É por aqui que quem contribui vê o que mudou antes de abrir o PR.
import { createApp } from 'vue'
import Vitrine from './Vitrine.vue'

if (new URLSearchParams(location.search).get('dir') === 'rtl') {
  document.documentElement.dir = 'rtl'
  document.documentElement.lang = 'ar-AR'
}
createApp(Vitrine).mount('#vitrine')

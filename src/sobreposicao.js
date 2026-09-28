// O comportamento comum da folha e da confirmação: quando abre, o foco entra e fica;
// quando fecha, o foco volta para quem abriu. O Esc e o clique no véu quem trata é o
// componente, porque cada um decide o que fechar quer dizer (a confirmação cancela).

import { nextTick, onBeforeUnmount, watch } from 'vue'
import { prenderFoco } from './foco.js'

/**
 * @param {() => boolean} aberto
 * @param {import('vue').Ref<HTMLElement | null>} painel
 * @param {{ inicial?: () => HTMLElement | null }} [opcoes]
 */
export function useSobreposicao(aberto, painel, { inicial = () => null } = {}) {
  let soltar = null
  const liberar = () => {
    soltar?.()
    soltar = null
  }
  watch(
    aberto,
    async (sim) => {
      if (!sim) {
        liberar()
        return
      }
      await nextTick()
      if (!aberto() || !painel.value) return
      liberar()
      soltar = prenderFoco(painel.value, { inicial: inicial() })
    },
    { immediate: true },
  )
  onBeforeUnmount(liberar)
}

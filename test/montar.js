// Monta uma sobreposição do kit como um app monta: dentro de uma raiz com posição, com um
// botão que abre e um v-model. É o `montar` que o pacote de comportamento pede.
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'

export function montadorDe(Componente, props = {}) {
  return async () => {
    const aberto = ref(false)
    const Casca = defineComponent({
      setup() {
        return () =>
          h('div', { class: 'raiz-do-app', style: 'position: relative' }, [
            h('button', { id: 'abre', onClick: () => (aberto.value = true) }, 'abrir'),
            h(
              Componente,
              {
                ...props,
                modelValue: aberto.value,
                'onUpdate:modelValue': (v) => (aberto.value = v),
              },
              // Dois focáveis no slot: com o fechar da folha são três, e o Tab tem um "meio"
              // para andar (o caso em que o Safari perdia o foco).
              {
                default: () => [
                  h('button', { id: 'dentro' }, 'uma opção'),
                  h('input', { id: 'campo', 'aria-label': 'outra opção' }),
                ],
              },
            ),
          ])
      },
    })
    const w = mount(Casca, { attachTo: document.body })
    await nextTick()
    return {
      wrapper: w,
      quemAbre: w.find('#abre').element,
      async abrir() {
        aberto.value = true
        await nextTick()
      },
      aberta: () => aberto.value,
      dialogo: () => document.querySelector('[role="dialog"], [role="alertdialog"]'),
      desmontar: () => w.unmount(),
    }
  }
}

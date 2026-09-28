// O CONTRATO DE COMPORTAMENTO DE UMA SOBREPOSIÇÃO, executável.
//
// A folha e a confirmação do kit existem ao lado das do RoqueOS (`ROSBottomSheet`,
// `ROSModal`), e as duas famílias precisam se comportar igual para quem usa: quem abre um
// ajuste nas Notas e outro no Finder não pode achar o Esc funcionando num e não no outro.
// Parecer igual se confere olhando; comportar igual, só executando. Este pacote é a
// execução: um conjunto de testes que recebe um jeito de montar a sobreposição e cobra o
// mesmo comportamento de qualquer uma.
//
// Roda no CI do kit contra `RosFolha` e `RosConfirmar`, e no RoqueOS contra os
// componentes dele. O que um lado ainda não cumpre fica escrito no teste do lado dele, e a
// lista só encolhe.
//
//   import { describe, test, expect } from 'vitest'
//   import { testarSobreposicao } from '@roqueos-apps/ui/comportamento'
//   testarSobreposicao({ describe, test, expect }, { nome: 'RosFolha', montar })
//
// `montar()` devolve, com a sobreposição fechada e montada no `document`:
//   quemAbre   o elemento que tinha o foco antes de abrir (o botão que abre)
//   abrir()    abre, como a pessoa abriria (pode ser async)
//   aberta()   se está aberta agora
//   dialogo()  o elemento com role de diálogo, ou null
//   desmontar()

/** Os comportamentos, pelo nome. `pular` de quem ainda não cumpre usa estes nomes. */
export const COMPORTAMENTOS = Object.freeze({
  papel: 'é um diálogo modal para o leitor de tela',
  focoEntra: 'ao abrir, o foco entra nela',
  escFecha: 'o Esc fecha',
  focoVolta: 'ao fechar, o foco volta para quem abriu',
  tabDaVolta: 'o Tab e o Shift+Tab andam por dentro dela e dão a volta',
})

const tecla = (el, key, extra = {}) =>
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...extra }))

const FOCAVEL =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * @param {{ describe: Function, test: Function, expect: Function }} t
 * @param {{
 *   nome: string,
 *   montar: () => Promise<object> | object,
 *   pular?: Partial<Record<keyof typeof COMPORTAMENTOS, string>>,
 *   esperar?: () => Promise<void>,
 * }} alvo `pular` diz, por comportamento, por que aquele lado ainda não cumpre.
 */
export function testarSobreposicao(
  { describe, test, expect },
  { nome, montar, pular = {}, esperar = () => new Promise((r) => setTimeout(r, 0)) },
) {
  const caso = (chave, corpo) => {
    const titulo = COMPORTAMENTOS[chave]
    if (pular[chave]) test.skip(`${titulo} (ainda não: ${pular[chave]})`, corpo)
    else test(titulo, corpo)
  }

  async function aberta() {
    const s = await montar()
    s.quemAbre.focus()
    await s.abrir()
    await esperar()
    await esperar()
    return s
  }

  describe(`comportamento de sobreposição: ${nome}`, () => {
    caso('papel', async () => {
      const s = await aberta()
      const d = s.dialogo()
      expect(d).not.toBeNull()
      expect(['dialog', 'alertdialog']).toContain(d.getAttribute('role'))
      expect(d.getAttribute('aria-modal')).toBe('true')
      s.desmontar()
    })

    caso('focoEntra', async () => {
      const s = await aberta()
      expect(s.dialogo().contains(document.activeElement)).toBe(true)
      s.desmontar()
    })

    caso('escFecha', async () => {
      const s = await aberta()
      tecla(document.activeElement ?? s.dialogo(), 'Escape')
      await esperar()
      await esperar()
      expect(s.aberta()).toBe(false)
      s.desmontar()
    })

    caso('focoVolta', async () => {
      const s = await aberta()
      tecla(document.activeElement ?? s.dialogo(), 'Escape')
      await esperar()
      await esperar()
      expect(document.activeElement).toBe(s.quemAbre)
      s.desmontar()
    })

    // Cada Tab leva ao próximo de dentro, e não só nas pontas: o Safari pula botão no Tab
    // por padrão, e uma sobreposição que deixa o navegador andar no meio perde o foco para
    // fora dela no primeiro botão.
    caso('tabDaVolta', async () => {
      const s = await aberta()
      const d = s.dialogo()
      const lista = [...d.querySelectorAll(FOCAVEL)]
      expect(lista.length).toBeGreaterThan(1)
      lista[0].focus()
      for (let i = 1; i <= lista.length; i++) {
        tecla(document.activeElement, 'Tab')
        expect(document.activeElement).toBe(lista[i % lista.length])
      }
      for (let i = lista.length - 1; i >= 0; i--) {
        tecla(document.activeElement, 'Tab', { shiftKey: true })
        expect(document.activeElement).toBe(lista[i])
      }
      s.desmontar()
    })
  })
}

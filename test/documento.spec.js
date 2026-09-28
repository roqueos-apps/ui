// O kit não mexe no documento (o motivo está em src/foco.js): nenhum estilo no body ou no
// <html>, nenhum listener no document ou na window. É o que deixa uma folha do kit aberta
// ao lado de um modal do RoqueOS sem um destravar a rolagem do outro.
import { describe, test, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import RosFolha from '../src/RosFolha.vue'
import RosConfirmar from '../src/RosConfirmar.vue'
import { montadorDe } from './montar.js'

const SRC_DO_KIT = `${process.cwd()}/src/`

const casos = [
  ['RosFolha', RosFolha, { titulo: 'Ajustes', rotuloFechar: 'Fechar' }],
  [
    'RosConfirmar',
    RosConfirmar,
    { titulo: 'Apagar?', rotuloConfirmar: 'Apagar', rotuloCancelar: 'Cancelar' },
  ],
]

describe.each(casos)('%s não mexe no documento', (_nome, Componente, props) => {
  test('abrir, teclar e fechar não tocam no body, no <html>, no document nem na window', async () => {
    document.body.setAttribute('style', 'color: red')
    const antes = {
      body: document.body.getAttribute('style'),
      bodyClasse: document.body.className,
      html: document.documentElement.getAttribute('style'),
      htmlClasse: document.documentElement.className,
    }
    // O jsdom e o test-utils penduram listener no document na primeira montagem (hover); o
    // que importa é que nenhum venha do kit, então o filtro é a pilha de quem chamou.
    const doKit = []
    const vigiar = (alvo) => {
      const original = alvo.addEventListener.bind(alvo)
      return vi.spyOn(alvo, 'addEventListener').mockImplementation((...args) => {
        if ((new Error().stack ?? '').includes(SRC_DO_KIT)) doKit.push(args[0])
        return original(...args)
      })
    }
    const noDocumento = vigiar(document)
    const naJanela = vigiar(window)
    const s = await montadorDe(Componente, props)()
    await s.abrir()
    await new Promise((r) => setTimeout(r, 0))
    document.activeElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    )
    await nextTick()
    expect(s.aberta()).toBe(false)
    expect({
      body: document.body.getAttribute('style'),
      bodyClasse: document.body.className,
      html: document.documentElement.getAttribute('style'),
      htmlClasse: document.documentElement.className,
    }).toEqual(antes)
    expect(doKit).toEqual([])
    noDocumento.mockRestore()
    naJanela.mockRestore()
    s.desmontar()
  })

  test('o Esc de dentro não sobe para o sistema', async () => {
    const s = await montadorDe(Componente, props)()
    await s.abrir()
    await new Promise((r) => setTimeout(r, 0))
    const doSistema = vi.fn()
    document.addEventListener('keydown', doSistema)
    document.activeElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    )
    document.removeEventListener('keydown', doSistema)
    // A janela do RoqueOS também ouve o Esc; com a folha aberta, o Esc é da folha.
    expect(doSistema).not.toHaveBeenCalled()
    s.desmontar()
  })
})

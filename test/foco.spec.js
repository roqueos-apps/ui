// Para onde o foco volta quando quem abriu a sobreposição não aceita mais foco.
//
// O caso real (QR Code, 28/09/2026): a folha do histórico tem o botão "Limpar", que abre a
// confirmação; confirmado, o histórico esvazia e o "Limpar" fica desabilitado. O foco voltava
// para o `body`, e o Esc e o Tab não chegavam mais na folha, que continuava aberta.
import { describe, it, expect, afterEach } from 'vitest'
import { prenderFoco } from '../src/foco.js'

const criar = (html) => {
  const raiz = document.createElement('div')
  raiz.innerHTML = html
  document.body.appendChild(raiz)
  return raiz
}

describe('o foco que volta', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('volta para quem abriu quando ele ainda aceita foco', () => {
    const raiz = criar(`
      <button id="abre">abrir</button>
      <div id="sobre"><button id="dentro">ok</button></div>`)
    raiz.querySelector('#abre').focus()
    const soltar = prenderFoco(raiz.querySelector('#sobre'))
    expect(document.activeElement.id).toBe('dentro')
    soltar()
    expect(document.activeElement.id).toBe('abre')
  })

  it('quem abriu ficou desabilitado: vai para a sobreposição onde ele mora', () => {
    const raiz = criar(`
      <div role="dialog" tabindex="-1" id="folha">
        <button id="entrada">uma entrada</button>
        <button id="limpar">limpar</button>
      </div>
      <div id="confirmar"><button id="sim">sim</button></div>`)
    const limpar = raiz.querySelector('#limpar')
    limpar.focus()
    const soltar = prenderFoco(raiz.querySelector('#confirmar'))
    limpar.disabled = true
    raiz.querySelector('#entrada').remove()
    soltar()
    // Sem focável nenhum na folha, o foco fica na própria folha (tabindex="-1").
    expect(document.activeElement.id).toBe('folha')
  })

  it('com focável sobrando na folha, o foco vai para o primeiro', () => {
    const raiz = criar(`
      <div role="dialog" tabindex="-1">
        <button id="fechar">fechar</button>
        <button id="limpar">limpar</button>
      </div>
      <div id="confirmar"><button>sim</button></div>`)
    const limpar = raiz.querySelector('#limpar')
    limpar.focus()
    const soltar = prenderFoco(raiz.querySelector('#confirmar'))
    limpar.disabled = true
    soltar()
    expect(document.activeElement.id).toBe('fechar')
  })

  it('quem abriu sumiu, ou não mora em sobreposição: o foco não é inventado', () => {
    const raiz = criar(`<button id="abre">abrir</button><div id="sobre"><button>ok</button></div>`)
    const abre = raiz.querySelector('#abre')
    abre.focus()
    const soltar = prenderFoco(raiz.querySelector('#sobre'))
    abre.disabled = true
    raiz.querySelector('#sobre').remove()
    soltar()
    expect(document.activeElement).toBe(document.body)
  })

  it('se a pessoa já pôs o foco em outro lugar do app, ele fica lá', () => {
    const raiz = criar(`
      <button id="abre">abrir</button><button id="outro">outro</button>
      <div id="sobre"><button>ok</button></div>`)
    raiz.querySelector('#abre').focus()
    const soltar = prenderFoco(raiz.querySelector('#sobre'))
    raiz.querySelector('#outro').focus()
    soltar()
    expect(document.activeElement.id).toBe('outro')
  })
})

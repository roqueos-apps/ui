// O FOCO DE UMA SOBREPOSIÇÃO (folha, confirmação).
//
// Quem abre uma sobreposição pelo teclado, pelo leitor de tela ou pelo controle da TV
// precisa que o foco entre nela, fique nela enquanto ela estiver aberta, e volte para
// onde estava quando ela fechar. Sem isso o Tab passeia pelo app atrás do véu, e o
// D-pad da TV sai da folha para o fundo.
//
// ⚠️ O KIT NÃO MEXE NO DOCUMENTO. Nenhum listener no `document`, nenhum estilo no
// `body`, nenhum Teleport para fora do app: a sobreposição mora dentro da raiz do app,
// e o teclado é ouvido nela. O RoqueOS tem as sobreposições dele, que travam a rolagem
// do `body` com um contador próprio; um kit que também mexesse ali destravaria a
// rolagem do sistema por baixo de um modal dele. Ler `document.activeElement` é o
// único contato, e só para saber para onde devolver o foco.

const FOCAVEL = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/** Se o elemento ainda está na página e aceita foco. */
const aceitaFoco = (e) =>
  Boolean(e) &&
  e.isConnected &&
  typeof e.focus === 'function' &&
  !e.disabled &&
  !e.closest('[inert]')

/**
 * Para onde vai o foco quando quem abriu não aceita mais: o primeiro focável da sobreposição
 * (diálogo) em que ele mora, ou ela mesma se aceitar foco. Fora de sobreposição, nenhum.
 */
function focoDeRecuo(e) {
  const dialogo = e?.isConnected ? e.closest('[role="dialog"],[role="alertdialog"]') : null
  if (!dialogo) return null
  return focaveis(dialogo)[0] ?? (dialogo.hasAttribute('tabindex') ? dialogo : null)
}

/** Os elementos que recebem foco pelo Tab dentro de `el`, na ordem do documento. */
export function focaveis(el) {
  return [...el.querySelectorAll(FOCAVEL)].filter((e) => !e.hasAttribute('inert'))
}

/**
 * Prende o foco em `el`: guarda quem tinha o foco, foca `inicial` (ou o primeiro
 * focável, ou o próprio `el`), e faz o Tab e o Shift+Tab darem a volta dentro dele.
 * Devolve `soltar()`, que tira o listener e devolve o foco a quem tinha.
 *
 * @param {HTMLElement} el
 * @param {{ inicial?: HTMLElement | null }} [opcoes]
 * @returns {() => void}
 */
export function prenderFoco(el, { inicial = null } = {}) {
  const doc = el.ownerDocument
  const antes = doc.activeElement
  const alvo = inicial ?? focaveis(el)[0] ?? el
  alvo.focus({ preventScroll: true })

  // ⚠️ O Tab é todo nosso, e não só nas pontas. O Safari, por padrão, pula botão no Tab
  // (Ajustes > Avançado > "Pressionar Tab para realçar cada item" vem desligado): deixar o
  // navegador andar no meio da lista mandava o foco do primeiro botão direto para fora da
  // folha, e dali o Esc e o Tab não chegavam mais nela (medido no WebKit em 27/09/2026).
  const aoTeclar = (evento) => {
    if (evento.key !== 'Tab') return
    evento.preventDefault()
    const lista = focaveis(el)
    if (lista.length === 0) {
      el.focus({ preventScroll: true })
      return
    }
    const i = lista.indexOf(doc.activeElement)
    const passo = evento.shiftKey ? -1 : 1
    const proximo =
      i === -1
        ? evento.shiftKey
          ? lista.length - 1
          : 0
        : (i + passo + lista.length) % lista.length
    lista[proximo].focus({ preventScroll: true })
  }
  el.addEventListener('keydown', aoTeclar)

  let solto = false
  return () => {
    if (solto) return
    solto = true
    el.removeEventListener('keydown', aoTeclar)
    // Só devolve se o foco ainda está na sobreposição (ou em lugar nenhum): se a pessoa
    // clicou em outro lugar do app enquanto fechava, o foco fica onde ela pôs.
    const agora = doc.activeElement
    const perdido = !agora || agora === doc.body || el.contains(agora)
    if (!perdido) return
    // Quem abriu pode não aceitar mais o foco: o "Limpar" do histórico que abriu a
    // confirmação fica desabilitado quando o histórico esvazia. Aí o foco vai para a
    // sobreposição onde ele mora (a folha do histórico), e não para o `body`, de onde o Esc
    // e o Tab não chegam mais nela (medido no QR Code em 28/09/2026).
    const destino = aceitaFoco(antes) ? antes : focoDeRecuo(antes)
    destino?.focus({ preventScroll: true })
  }
}

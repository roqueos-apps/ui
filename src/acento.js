// A COR DO APP COM CONTRASTE NOS DOIS TEMAS.
//
// O app passa a cor dele por prop (`acento="#f59e0b"`), e o kit usa essa cor de dois jeitos:
// como fundo (o botão primário) e como tinta sobre a superfície (o botão ligado, o ícone da
// folha, da confirmação e do estado vazio). Nenhum dos dois passava sempre nos 4,5:1 do WCAG:
// texto preto fixo sobre um acento escuro (o roxo #5856d6 dá 3,7:1) e o #007aff como texto
// sobre a superfície (2,8:1 no tema claro, 3,1:1 no escuro).
//
// O kit não sabe qual tema está ligado: ele só lê as variáveis do contrato do `app-sdk`. Então
// a tinta do acento sobre a superfície é uma mistura do acento com a cor do texto do tema
// (`color-mix(... rgb(var(--ros-text-rgb)))`): no escuro o texto é branco e a mistura clareia,
// no claro o texto é preto e a mistura escurece. Aqui se calcula, para a cor do app, quanto do
// acento cabe nessa mistura sem cair abaixo de 4,5:1 em nenhum dos dois temas. E, para o
// fundo, se o texto em cima vai branco ou preto: o melhor dos dois sempre passa de 4,58:1.
//
// Só entram em `style` propriedades do kit (`--rui-*`), nunca `--ros-*`.

/** O mínimo do WCAG para texto normal (AA). */
export const CONTRASTE_MINIMO = 4.5

// As bases dos dois temas do RoqueOS (`temas.scss`): a superfície do painel e a cor do texto.
// O fundo mais difícil para a tinta do acento é a superfície com o preenchimento de 10% do
// botão ligado por cima (`rgba(var(--ros-fill-rgb), .1)`), e o fill é da cor do texto.
export const TEMAS = Object.freeze({
  escuro: Object.freeze({ superficie: [30, 30, 30], texto: [255, 255, 255] }),
  claro: Object.freeze({ superficie: [240, 240, 243], texto: [0, 0, 0] }),
})
const PREENCHIMENTO_MAIS_FORTE = 0.1

/** `#rgb`, `#rrggbb` ou `rgb(r, g, b)` em `[r, g, b]`; qualquer outra coisa dá `null`. */
export function paraRgb(cor) {
  const texto = String(cor ?? '').trim()
  const hex = texto.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex) {
    const h = hex[1].length === 3 ? [...hex[1]].map((c) => c + c).join('') : hex[1]
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  }
  const rgb = texto.match(
    /^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})\s*(?:[,/]\s*1\s*)?\)$/i,
  )
  if (rgb) {
    const canais = rgb.slice(1, 4).map(Number)
    if (canais.every((c) => c <= 255)) return canais
  }
  return null
}

/** A luminância relativa do WCAG 2. */
export function luminancia([r, g, b]) {
  const linear = (c) => {
    const s = c / 255
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

/** A razão de contraste do WCAG 2 entre duas cores `[r, g, b]`. */
export function contraste(a, b) {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x)
  return (claro + 0.05) / (escuro + 0.05)
}

/** O `color-mix(in srgb, a peso, b)` do CSS: `peso` de 0 a 1 é quanto fica de `a`. */
export function misturar(a, b, peso) {
  return a.map((c, i) => c * peso + b[i] * (1 - peso))
}

/** Branco ou preto, o que der mais contraste sobre o fundo `[r, g, b]`. */
export function tintaSobre(fundo) {
  return contraste(fundo, [255, 255, 255]) >= contraste(fundo, [0, 0, 0]) ? 'branco' : 'preto'
}

/**
 * Quanto do acento (0 a 100, em %) entra na mistura com a cor do texto para a tinta passar de
 * 4,5:1 nos dois temas, sobre o fundo mais difícil de cada um. O maior que passa: a cor do
 * app fica o mais perto possível dela mesma.
 */
export function misturaDoTexto(acento) {
  for (let p = 100; p > 0; p--) {
    const passa = Object.values(TEMAS).every(({ superficie, texto }) => {
      const fundo = misturar(texto, superficie, PREENCHIMENTO_MAIS_FORTE)
      return contraste(misturar(acento, texto, p / 100), fundo) >= CONTRASTE_MINIMO
    })
    if (passa) return p
  }
  return 0
}

const TINTA = {
  branco: 'rgb(var(--ros-white-rgb, 255, 255, 255))',
  preto: 'rgb(var(--ros-black-rgb, 0, 0, 0))',
}

/**
 * O `style` de um componente que recebe `acento`: a cor, a tinta do texto em cima dela
 * (`--rui-acento-tinta`) e quanto dela entra na tinta sobre a superfície
 * (`--rui-acento-mistura`). Sem acento, `null`, e valem os padrões do CSS, feitos para o azul
 * do sistema. Cor que o kit não sabe ler (`var(--x)`, um nome) passa só como cor, sem a
 * garantia de contraste.
 */
export function estiloDoAcento(acento) {
  if (!acento) return null
  const rgb = paraRgb(acento)
  if (!rgb) return { '--rui-acento': acento }
  return {
    '--rui-acento': acento,
    '--rui-acento-tinta': TINTA[tintaSobre(rgb)],
    '--rui-acento-mistura': `${misturaDoTexto(rgb)}%`,
  }
}

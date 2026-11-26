// O contraste do kit nos dois temas do RoqueOS, calculado do CSS que cada componente usa.
//
// O teste lê a regra de verdade do `.vue` (a cor do texto e a do fundo), troca cada `var()`
// pelo valor do tema (ou pela reserva, fora do RoqueOS), resolve `rgb()`, `rgba()` sobre a
// superfície e `color-mix()`, e mede a razão do WCAG com uma conta própria, que não é a de
// `src/acento.js`. As propriedades do kit (`--rui-*`) vêm do `style` que o componente montado
// põe na raiz, com a cor do app que ele recebeu.
import { describe, test, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { RosBotao, RosFolha, RosVazio } from '../src/index.js'
import {
  estiloDoAcento,
  misturaDoTexto,
  paraRgb,
  contraste as contrasteDoKit,
} from '../src/acento.js'

const SRC = join(resolve(process.cwd()), 'src')

// As bases dos temas como o RoqueOS declara (`temas.scss`, `tokens-root.scss`). "fora" é o
// app no `yarn dev`, sem o RoqueOS: valem as reservas.
const TEMAS = {
  fora: { superficie: [30, 30, 30], vars: {} },
  escuro: {
    superficie: [30, 30, 30],
    vars: {
      '--ros-text-rgb': '255, 255, 255',
      '--ros-fill-rgb': '255, 255, 255',
      '--ros-line-rgb': '255, 255, 255',
      '--ros-surface-0-rgb': '30, 30, 30',
      '--ros-danger-rgb': '255, 59, 48',
      '--ros-white-rgb': '255, 255, 255',
      '--ros-black-rgb': '0, 0, 0',
    },
  },
  claro: {
    superficie: [240, 240, 243],
    vars: {
      '--ros-text-rgb': '0, 0, 0',
      '--ros-fill-rgb': '0, 0, 0',
      '--ros-line-rgb': '0, 0, 0',
      '--ros-surface-0-rgb': '240, 240, 243',
      '--ros-danger-rgb': '196, 0, 15',
      '--ros-white-rgb': '255, 255, 255',
      '--ros-black-rgb': '0, 0, 0',
    },
  },
}

// Cores de app de verdade e as difíceis: o azul do sistema, o âmbar das Notas, o roxo (preto
// em cima reprovava), o verde, o vermelho, o cinza e o amarelo (os dois extremos de claro).
const ACENTOS = ['', '#007aff', '#f59e0b', '#5856d6', '#34c759', '#ff3b30', '#8e8e93', '#ffcc00']

// ── a conta do WCAG, separada da do kit ──────────────────────────────────────────────────
const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
const razao = (a, b) => {
  const [x, y] = [lum(a), lum(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

// ── o CSS do componente ──────────────────────────────────────────────────────────────────
function partirNoTopo(texto, sep) {
  const partes = []
  let fundo = 0
  let atual = ''
  for (const c of texto) {
    if (c === '(') fundo++
    if (c === ')') fundo--
    if (c === sep && fundo === 0) {
      partes.push(atual.trim())
      atual = ''
    } else atual += c
  }
  if (atual.trim()) partes.push(atual.trim())
  return partes
}

function regra(arquivo, seletor) {
  const fonte = readFileSync(join(SRC, arquivo), 'utf8')
  const css = fonte.slice(fonte.indexOf('<style')).replace(/\/\*[\s\S]*?\*\//g, '')
  const inicio = css.indexOf(`\n${seletor} {`)
  if (inicio < 0) throw new Error(`${arquivo}: sem a regra ${seletor}`)
  const corpo = css.slice(css.indexOf('{', inicio) + 1, css.indexOf('\n}', inicio))
  return Object.fromEntries(
    partirNoTopo(corpo, ';').map((d) => {
      const i = d.indexOf(':')
      return [
        d.slice(0, i).trim(),
        d
          .slice(i + 1)
          .replace(/\s+/g, ' ')
          .trim(),
      ]
    }),
  )
}

function resolverVars(valor, vars) {
  const i = valor.indexOf('var(')
  if (i < 0) return valor
  let fundo = 0
  let fim = i + 3
  for (; fim < valor.length; fim++) {
    if (valor[fim] === '(') fundo++
    if (valor[fim] === ')' && --fundo === 0) break
  }
  const [nome, ...reserva] = partirNoTopo(valor.slice(i + 4, fim), ',')
  const trocado = vars[nome] ?? reserva.join(', ')
  return resolverVars(valor.slice(0, i) + trocado + valor.slice(fim + 1), vars)
}

/** `{ rgb, alfa }` de um valor de cor já sem `var()`. */
function cor(valor) {
  const v = valor.trim()
  if (v.startsWith('#')) {
    const h = v.length === 4 ? [...v.slice(1)].map((c) => c + c).join('') : v.slice(1)
    return { rgb: [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)), alfa: 1 }
  }
  const mix = v.match(/^color-mix\((.*)\)$/)
  if (mix) {
    const [espaco, a, b] = partirNoTopo(mix[1], ',')
    expect(espaco).toBe('in srgb')
    const [, corA, peso] = a.match(/^(.*)\s(\d+(?:\.\d+)?)%$/)
    const [ca, cb] = [cor(corA).rgb, cor(b).rgb]
    const p = Number(peso) / 100
    return { rgb: ca.map((c, i) => c * p + cb[i] * (1 - p)), alfa: 1 }
  }
  const rgb = v.match(/^rgba?\((.*)\)$/)
  if (rgb) {
    const n = partirNoTopo(rgb[1], ',').map(Number)
    return { rgb: n.slice(0, 3), alfa: n[3] ?? 1 }
  }
  throw new Error(`cor que o teste não lê: ${valor}`)
}

const sobre = ({ rgb, alfa }, fundo) => rgb.map((c, i) => c * alfa + fundo[i] * (1 - alfa))
const pintar = (valor, vars, fundo) => sobre(cor(resolverVars(valor, vars)), fundo)

/** As `--rui-*` que o componente montado põe no `style` da raiz. */
function varsDoKit(el) {
  const vars = {}
  for (const nome of ['--rui-acento', '--rui-acento-tinta', '--rui-acento-mistura']) {
    const v = el.style.getPropertyValue(nome)
    if (v) vars[nome] = v.trim()
  }
  return vars
}

async function varsDe(Componente, acento) {
  if (Componente === RosFolha) {
    mount(RosFolha, {
      props: { modelValue: true, titulo: 'Ajustes', rotuloFechar: 'Fechar', acento },
      attachTo: document.body,
    })
    await nextTick()
    return varsDoKit(document.querySelector('.rui-folha'))
  }
  const props = Componente === RosVazio ? { titulo: 'Vazio', acento } : { acento }
  const el = mount(Componente, { props, slots: { default: 'x' } }).element
  // O botão declara os padrões dele na própria regra (`--rui-acento-padrao`); o `style` vem
  // depois e ganha, como no navegador.
  const padroes =
    Componente === RosBotao
      ? Object.fromEntries(
          Object.entries(regra('RosBotao.vue', '.rui-botao')).filter(([k]) => k.startsWith('--')),
        )
      : {}
  return { ...padroes, ...varsDoKit(el) }
}

const casos = []
for (const [tema, { superficie, vars }] of Object.entries(TEMAS))
  for (const acento of ACENTOS) casos.push({ tema, acento, superficie, vars })
const nomeDo = ({ tema, acento }) => `${tema}, acento ${acento || 'padrão'}`

describe('o texto sobre a cor do app passa de 4,5:1 nos dois temas', () => {
  test.each(casos.map((c) => [nomeDo(c), c]))('RosBotao primário: %s', async (_, c) => {
    const vars = { ...c.vars, ...(await varsDe(RosBotao, c.acento)) }
    const r = regra('RosBotao.vue', '.rui-botao--primario')
    const fundo = pintar(r.background, vars, c.superficie)
    expect(razao(pintar(r.color, vars, fundo), fundo)).toBeGreaterThanOrEqual(4.5)
  })

  test.each(Object.entries(TEMAS))('RosBotao perigo: %s', (_, { vars, superficie }) => {
    const r = regra('RosBotao.vue', '.rui-botao--perigo')
    const fundo = pintar(r.background, vars, superficie)
    expect(razao(pintar(r.color, vars, fundo), fundo)).toBeGreaterThanOrEqual(4.5)
  })
})

describe('a cor do app como tinta sobre a superfície passa de 4,5:1 nos dois temas', () => {
  // [componente que põe as --rui-* na raiz, arquivo, regra da tinta, regra do fundo dela]
  const usos = [
    ['RosBotao ligado', RosBotao, 'RosBotao.vue', '.rui-botao--fantasma.rui-botao--ligado', null],
    ['RosFolha ícone', RosFolha, 'RosFolha.vue', '.rui-folha__icone', null],
    // A confirmação herda o acento de quem está em volta (a folha, o app).
    ['RosConfirmar ícone', RosFolha, 'RosConfirmar.vue', '.rui-confirmar__icone', null],
    ['RosVazio ícone', RosVazio, 'RosVazio.vue', '.rui-vazio__icone', null],
  ]
  for (const [nome, Componente, arquivo, seletor] of usos) {
    test.each(casos.map((c) => [nomeDo(c), c]))(`${nome}: %s`, async (_, c) => {
      const vars = { ...c.vars, ...(await varsDe(Componente, c.acento)) }
      const r = regra(arquivo, seletor)
      const fundo = r.background ? pintar(r.background, vars, c.superficie) : c.superficie
      expect(razao(pintar(r.color, vars, fundo), fundo)).toBeGreaterThanOrEqual(4.5)
    })
  }
})

describe('estiloDoAcento', () => {
  test('a raiz do botão, da folha e do estado vazio leva a cor e as duas derivadas', async () => {
    for (const Componente of [RosBotao, RosFolha, RosVazio]) {
      expect(await varsDe(Componente, '#5856d6')).toMatchObject({
        '--rui-acento': '#5856d6',
        '--rui-acento-tinta': expect.stringContaining('--ros-white-rgb'),
        '--rui-acento-mistura': `${misturaDoTexto([88, 86, 214])}%`,
      })
    }
  })

  test('lê #rgb, #rrggbb e rgb(); o resto passa só como cor', () => {
    expect(paraRgb('#0af')).toEqual([0, 170, 255])
    expect(paraRgb('#F59E0B')).toEqual([245, 158, 11])
    expect(paraRgb('rgb(0, 98, 204)')).toEqual([0, 98, 204])
    expect(paraRgb('rgb(300, 0, 0)')).toBeNull()
    expect(estiloDoAcento('var(--cor-do-app)')).toEqual({ '--rui-acento': 'var(--cor-do-app)' })
    expect(estiloDoAcento('')).toBeNull()
  })

  test('texto preto no âmbar, branco no roxo', () => {
    expect(estiloDoAcento('#f59e0b')['--rui-acento-tinta']).toContain('--ros-black-rgb')
    expect(estiloDoAcento('#5856d6')['--rui-acento-tinta']).toContain('--ros-white-rgb')
  })

  test('a mistura é a maior que passa: um ponto a mais reprova em algum tema', () => {
    for (const acento of ACENTOS.filter(Boolean)) {
      const rgb = paraRgb(acento)
      const p = misturaDoTexto(rgb)
      if (p === 100) continue
      const reprova = [
        [
          [255, 255, 255],
          [30, 30, 30],
        ],
        [
          [0, 0, 0],
          [240, 240, 243],
        ],
      ].some(([texto, superficie]) => {
        const fundo = superficie.map((c, i) => c * 0.9 + texto[i] * 0.1)
        const tinta = rgb.map((c, i) => (c * (p + 1)) / 100 + texto[i] * (1 - (p + 1) / 100))
        return contrasteDoKit(tinta, fundo) < 4.5
      })
      expect(reprova, acento).toBe(true)
    }
  })

  test('o padrão do CSS (72%) é o que o kit calcula para o azul do sistema', () => {
    expect(misturaDoTexto([0, 122, 255])).toBe(72)
    expect(regra('RosBotao.vue', '.rui-botao--fantasma.rui-botao--ligado').color).toContain(
      'var(--rui-acento-mistura, 72%)',
    )
  })
})

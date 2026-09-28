// O kit entra no app, e o app passa no `app check` do SDK. Então o kit segue as mesmas
// regras que valem para o `src/` de um app: não importa nada do RoqueOS nem o Quasar, não
// fala com banco, e só usa as variáveis de tema do contrato. E ele é mais estrito que um
// app: só importa `vue` e os próprios arquivos.
import { describe, test, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import {
  conferirBanco,
  conferirImportsDoRoqueOS,
  conferirVariaveis,
  semComentarios,
} from '@roqueos-apps/app-sdk/verificacao'
import { ICONES } from '../src/icones.js'

// O Vitest roda na raiz do repo (e o `import.meta.url` dele não é file: no jsdom).
const RAIZ = resolve(process.cwd())
const SRC = join(RAIZ, 'src')
const arquivos = readdirSync(SRC).map((n) => join(SRC, n))

describe('as regras do app check valem para o kit', () => {
  test('sem RoqueOS, sem Quasar, sem banco, só as variáveis do contrato', () => {
    expect(conferirImportsDoRoqueOS(RAIZ)).toEqual([])
    expect(conferirBanco(RAIZ)).toEqual([])
    expect(conferirVariaveis(RAIZ)).toEqual([])
  })

  test('o kit só importa vue e arquivo dele', () => {
    const fora = []
    for (const arquivo of arquivos) {
      const codigo = semComentarios(readFileSync(arquivo, 'utf8'))
      for (const [, de] of codigo.matchAll(/\bfrom\s*['"]([^'"]+)['"]/g)) {
        if (de !== 'vue' && !de.startsWith('./')) fora.push(`${arquivo.slice(RAIZ.length)}: ${de}`)
      }
    }
    expect(fora).toEqual([])
  })
})

describe('os ícones', () => {
  test('cada entrada é um desenho SVG de verdade', () => {
    for (const [nome, { caminhos, viewBox }] of Object.entries(ICONES)) {
      expect(caminhos.length, nome).toBeGreaterThan(0)
      for (const d of caminhos) expect(d, nome).toMatch(/^[MmZzLlHhVvCcSsQqTtAa0-9.,\s-]+$/)
      if (viewBox) expect(viewBox, nome).toMatch(/^\d+ \d+ \d+ \d+$/)
    }
  })

  test('todo ícone que um componente do kit usa está na lista', () => {
    const usados = new Set()
    for (const arquivo of arquivos.filter((a) => a.endsWith('.vue'))) {
      const codigo = readFileSync(arquivo, 'utf8')
      // Só o valor literal (`icone="close"`); o ligado (`:nome="icone"`) é uma variável.
      for (const [, nome] of codigo.matchAll(/(?<![:\w-])(?:icone|nome)="([a-z0-9_]+)"/g))
        usados.add(nome)
    }
    expect([...usados].filter((n) => !(n in ICONES))).toEqual([])
    expect(usados.has('close')).toBe(true)
  })
})

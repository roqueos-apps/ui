import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { RosIcone, RosBotao, RosInterruptor, RosVazio, ICONES } from '../src/index.js'
import RosFolha from '../src/RosFolha.vue'
import RosConfirmar from '../src/RosConfirmar.vue'
import { montadorDe } from './montar.js'

describe('RosIcone', () => {
  test('desenha os caminhos do ícone pelo nome, decorativo para o leitor de tela', () => {
    const w = mount(RosIcone, { props: { nome: 'push_pin', tamanho: 18 } })
    const svg = w.find('svg')
    expect(svg.attributes()).toMatchObject({
      width: '18',
      height: '18',
      viewBox: '0 0 24 24',
      'aria-hidden': 'true',
    })
    expect(w.findAll('path').map((p) => p.attributes('d'))).toEqual(ICONES.push_pin.caminhos)
  })

  test('nome fora da lista é defeito do app, e o Vue avisa', () => {
    const aviso = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mount(RosIcone, { props: { nome: 'nao_existe' } })
    expect(aviso.mock.calls.some(([m]) => /Invalid prop.*"nome"/.test(String(m)))).toBe(true)
    aviso.mockRestore()
  })
})

describe('RosBotao', () => {
  test('só ícone: o rótulo vira aria-label e title', () => {
    const w = mount(RosBotao, { props: { icone: 'tune', rotulo: 'Ajustes' } })
    expect(w.attributes()).toMatchObject({
      type: 'button',
      'aria-label': 'Ajustes',
      title: 'Ajustes',
    })
    expect(w.classes()).toContain('rui-botao--so-icone')
  })

  test('com texto não repete o rótulo no aria-label; alternar diz aria-pressed', () => {
    const w = mount(RosBotao, {
      props: { icone: 'add', rotulo: 'Nova nota', ligado: true },
      slots: { default: 'Nova nota' },
    })
    expect(w.attributes('aria-label')).toBeUndefined()
    expect(w.attributes('aria-pressed')).toBe('true')
    expect(w.text()).toBe('Nova nota')
    expect(
      mount(RosBotao, { props: { icone: 'add', rotulo: 'x' } }).attributes('aria-pressed'),
    ).toBeUndefined()
  })

  test('as três variantes', () => {
    for (const v of ['primario', 'fantasma', 'perigo']) {
      expect(
        mount(RosBotao, { props: { variante: v }, slots: { default: 'x' } }).classes(),
      ).toContain(`rui-botao--${v}`)
    }
  })
})

describe('RosInterruptor', () => {
  test('é um switch com aria-checked, e o clique pede o valor oposto', async () => {
    const w = mount(RosInterruptor, { props: { modelValue: false, rotulo: 'Mostrar na mesa' } })
    expect(w.attributes()).toMatchObject({
      role: 'switch',
      'aria-checked': 'false',
      'aria-label': 'Mostrar na mesa',
    })
    await w.trigger('click')
    expect(w.emitted('update:modelValue')).toEqual([[true]])
    await w.setProps({ modelValue: true })
    expect(w.attributes('aria-checked')).toBe('true')
  })
})

describe('RosVazio', () => {
  test('título, subtítulo, ícone e a ação no slot', () => {
    const w = mount(RosVazio, {
      props: { titulo: 'Nenhuma nota', subtitulo: 'Crie a primeira', icone: 'sticky_note_2' },
      slots: { default: '<button>Nova nota</button>' },
    })
    expect(w.attributes('role')).toBe('status')
    expect(w.text()).toContain('Nenhuma nota')
    expect(w.text()).toContain('Crie a primeira')
    expect(w.find('button').text()).toBe('Nova nota')
    expect(w.find('svg').exists()).toBe(true)
    expect(w.find('.rui-vazio__barra').exists()).toBe(false)
  })

  test('carregando mostra a barra que corre, parada no perfil leve', async () => {
    // O `ROSAppLoader state="loading"` do RoqueOS tinha a barra; a Câmera e a Lousa a perderam
    // na saída do núcleo (auditoria de paridade de 28/09/2026).
    const w = mount(RosVazio, { props: { titulo: 'Iniciando a câmera', carregando: true } })
    const barra = w.find('.rui-vazio__barra')
    expect(barra.exists()).toBe(true)
    expect(barra.attributes('aria-hidden')).toBe('true')
    expect(barra.find('span').exists()).toBe(true)
    expect(barra.classes()).not.toContain('rui-vazio__barra--parada')
    await w.setProps({ leve: true })
    expect(w.find('.rui-vazio__barra').classes()).toContain('rui-vazio__barra--parada')
  })
})

describe('RosFolha', () => {
  test('o título nomeia o diálogo; o véu e o botão de fechar fecham', async () => {
    const s = await montadorDe(RosFolha, { titulo: 'Ajustes', rotuloFechar: 'Fechar' })()
    await s.abrir()
    const d = s.dialogo()
    expect(document.getElementById(d.getAttribute('aria-labelledby')).textContent).toBe('Ajustes')
    expect(d.querySelector('#dentro')).not.toBeNull()
    document.querySelector('.rui-folha__veu').click()
    await nextTick()
    expect(s.aberta()).toBe(false)
    await s.abrir()
    document.querySelector('[aria-label="Fechar"]').click()
    await nextTick()
    expect(s.aberta()).toBe(false)
  })

  test('mora dentro do app, não no body', async () => {
    const s = await montadorDe(RosFolha, { titulo: 'Ajustes', rotuloFechar: 'Fechar' })()
    await s.abrir()
    expect(document.querySelector('.raiz-do-app').contains(s.dialogo())).toBe(true)
  })
})

describe('RosConfirmar', () => {
  const props = {
    titulo: 'Apagar a nota?',
    texto: 'Não tem volta.',
    perigo: true,
    icone: 'delete',
    rotuloConfirmar: 'Apagar',
    rotuloCancelar: 'Cancelar',
  }

  test('abre com o foco no Cancelar: Enter ou OK duas vezes não apaga nada', async () => {
    const s = await montadorDe(RosConfirmar, props)()
    s.quemAbre.focus()
    await s.abrir()
    await new Promise((r) => setTimeout(r, 0))
    expect(document.activeElement.textContent.trim()).toBe('Cancelar')
  })

  test('confirmar avisa e fecha; cancelar pelo véu avisa e fecha', async () => {
    const w = mount(RosConfirmar, {
      props: { ...props, modelValue: true },
      attachTo: document.body,
    })
    await nextTick()
    const [, apagar] = w.findAll('button')
    await apagar.trigger('click')
    expect(w.emitted('confirmar')).toHaveLength(1)
    expect(w.emitted('update:modelValue')).toEqual([[false]])
    const v = mount(RosConfirmar, {
      props: { ...props, modelValue: true },
      attachTo: document.body,
    })
    await nextTick()
    await v.find('.rui-confirmar__veu').trigger('click')
    expect(v.emitted('cancelar')).toHaveLength(1)
    expect(v.emitted('confirmar')).toBeUndefined()
  })

  test('texto descreve o diálogo; perigo pinta o ícone e o botão', async () => {
    const w = mount(RosConfirmar, {
      props: { ...props, modelValue: true },
      attachTo: document.body,
    })
    await nextTick()
    const d = w.find('[role="alertdialog"]')
    expect(document.getElementById(d.attributes('aria-describedby')).textContent).toBe(
      'Não tem volta.',
    )
    expect(w.find('.rui-confirmar__icone--perigo').exists()).toBe(true)
    expect(w.find('.rui-botao--perigo').text()).toBe('Apagar')
  })
})

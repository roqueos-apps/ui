// O pacote de comportamento (src/comportamento.js) contra as duas sobreposições do kit.
// O RoqueOS roda o mesmo pacote contra as dele; aqui o kit tem de passar em tudo, sem pular.
import { describe, test, expect } from 'vitest'
import { testarSobreposicao, COMPORTAMENTOS } from '../src/comportamento.js'
import RosFolha from '../src/RosFolha.vue'
import RosConfirmar from '../src/RosConfirmar.vue'
import { montadorDe } from './montar.js'

testarSobreposicao(
  { describe, test, expect },
  {
    nome: 'RosFolha',
    montar: montadorDe(RosFolha, { titulo: 'Ajustes', rotuloFechar: 'Fechar' }),
  },
)

testarSobreposicao(
  { describe, test, expect },
  {
    nome: 'RosConfirmar',
    montar: montadorDe(RosConfirmar, {
      titulo: 'Apagar a nota?',
      texto: 'Não tem volta.',
      perigo: true,
      rotuloConfirmar: 'Apagar',
      rotuloCancelar: 'Cancelar',
    }),
  },
)

describe('o pacote de comportamento', () => {
  test('cobre os cinco comportamentos, e cada um tem nome para o `pular`', () => {
    expect(Object.keys(COMPORTAMENTOS)).toEqual([
      'papel',
      'focoEntra',
      'escFecha',
      'focoVolta',
      'tabDaVolta',
    ])
  })
})

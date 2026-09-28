#!/usr/bin/env node
// GERA src/icones.js a partir do Material Icons do @quasar/extras.
//
// O RoqueOS desenha ícone pelo nome com a fonte do Material Icons (`<q-icon name="tune">`).
// Um app fora dele não tem a fonte nem o Quasar, então o kit leva o desenho de cada ícone
// que um app usa, como SVG, com os mesmos traços da fonte. A origem é o pacote
// `@quasar/extras` (MIT), que traz o Material Icons do Google (Apache-2.0) como caminhos SVG;
// o kit não depende dele: este script roda de vez em quando, contra um `@quasar/extras` de
// qualquer checkout (o do roqueos-front serve), e o resultado é commitado.
//
// Uso:
//   node scripts/icones.mjs <caminho do @quasar/extras> nome1 nome2 ...   # acrescenta
//   node scripts/icones.mjs <caminho do @quasar/extras> --todos           # regera os que já estão
//
// A lista é contrato: o `RosIcone` recusa nome fora dela, e o teste confere que cada entrada
// é um desenho válido. Ícone novo entra aqui, no mesmo PR do componente que usa.

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..')
const DESTINO = join(RAIZ, 'src/icones.js')
const [extras, ...pedidos] = process.argv.slice(2)
if (!extras || pedidos.length === 0) {
  console.error('uso: node scripts/icones.mjs <caminho do @quasar/extras> nome... | --todos')
  process.exit(2)
}

const versao = JSON.parse(readFileSync(join(extras, 'package.json'), 'utf8')).version
const fonte = readFileSync(join(extras, 'material-icons/index.mjs'), 'utf8')
const camel = (nome) =>
  'mat' +
  nome
    .split('_')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('')

/** O desenho de um ícone: os caminhos (sem a caixa transparente) e o viewBox. */
function desenho(nome) {
  const achado = fonte.match(new RegExp(`export const ${camel(nome)} = '([^']*)'`))
  if (!achado) throw new Error(`"${nome}" não existe no Material Icons do @quasar/extras ${versao}`)
  const [corpo, viewBox = '0 0 24 24'] = achado[1].split('|')
  const caminhos = corpo
    .split('&&')
    .map((parte) => parte.split('@@'))
    .filter(([, estilo = '']) => !/fill:\s*none/.test(estilo))
    .map(([d]) => d)
  if (caminhos.length === 0) throw new Error(`"${nome}" sem caminho desenhável`)
  return { caminhos, viewBox }
}

const atuais = await import(DESTINO).then((m) => m.ICONES).catch(() => ({}))
const nomes = pedidos.includes('--todos')
  ? Object.keys(atuais)
  : [...new Set([...Object.keys(atuais), ...pedidos])]
nomes.sort()

const linhas = nomes.map((nome) => {
  const { caminhos, viewBox } = desenho(nome)
  const vb = viewBox === '0 0 24 24' ? '' : `, viewBox: '${viewBox}'`
  return `  ${nome}: { caminhos: ${JSON.stringify(caminhos).replace(/"/g, "'")}${vb} },`
})

writeFileSync(
  DESTINO,
  `// GERADO por scripts/icones.mjs a partir do Material Icons (Google, Apache-2.0) que o
// @quasar/extras ${versao} traz como SVG. Não edite: rode o script com o nome do ícone.
//
// São os traços da fonte que o RoqueOS usa (\`<q-icon name="tune">\`), então o ícone de um app
// fora do RoqueOS é o mesmo de dentro dele. A licença e a origem estão no ASSETS.md.

/** Nome do Material Icons → os caminhos SVG do desenho (viewBox 24x24 quando não diz). */
export const ICONES = Object.freeze({
${linhas.join('\n')}
})
`,
)
console.log(`${nomes.length} ícones em src/icones.js (@quasar/extras ${versao})`)

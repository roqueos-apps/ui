// Todo componente montado num teste é desmontado no fim dele: o que fica vivo continua com
// listener e foco preso, e o teste seguinte começa com o documento sujo.
import { afterEach } from 'vitest'
import { enableAutoUnmount } from '@vue/test-utils'

enableAutoUnmount(afterEach)

afterEach(() => {
  document.body.innerHTML = ''
})

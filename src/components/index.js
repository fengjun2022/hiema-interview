import PkgTable from './PkgTable'
import Search from './search'
export default {
  install(Vue) {
    Vue.component('PkgTable', PkgTable)
    Vue.component('Search', Search)
  }
}

import PkgTable from './PkgTable'
<<<<<<< HEAD
export default {
  install (Vue) {
    Vue.component('PkgTable', PkgTable)
=======
import Search from './search'
export default {
  install(Vue) {
    Vue.component('PkgTable', PkgTable)
    Vue.component('Search', Search)
>>>>>>> feature/articles
  }
}

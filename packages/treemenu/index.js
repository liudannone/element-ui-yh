import Treemenu from './src/main';

/* istanbul ignore next */
Treemenu.install = function(Vue) {
  Vue.component(Treemenu.name, Treemenu);
};

export default Treemenu;

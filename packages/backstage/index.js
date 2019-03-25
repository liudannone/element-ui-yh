import Backstage from './src/main';

/* istanbul ignore next */
Backstage.install = function(Vue) {
  Vue.component(Backstage.name, Backstage);
};

export default Backstage;

/** 以http,https开头的
 * @param {string} path 判断的路径
 * @return {Boolean} 判断的路径
 */
export const isHttpStart = (path = '') => {
  const reg = /(http|https):\/\/([\w.]+\/?)\S*/;
  return reg.test(path);
};
/** 首字母变大写
 * @param {string} str 判断的路径
 * @return {string} 判断的路径
 */
export const firstUpercase = (str = '') => {
  if (str.length < 1) {
    return '';
  }
  if (typeof str !== 'string') {
    return str;
  }
  return str.substring(0, 1).toUpperCase() + str.substring(1);
};
/**
 * 数据整理为树形结构
 * @param {Array} array 老数据
 * @param {String} fatherKey 新数据
 * @param {String} sortKey 返回变化的数据
 * @param {String} currentKey 当前Id
 * @return {Object} 返回树形数据
 */
export const filterData = (array, fatherKey = 'parentId', sortKey = 'orderNumber', currentKey = 'id') => {
  const sortArr = data => data.sort((a, b) => {
    const x = a[sortKey];
    const y = b[sortKey];
    return (x < y) ? -1 : ((x > y) ? 1 : 0); // eslint-disable-line
  });
  let _data = [...array];
  _data = sortArr(_data);
  return _data.filter((father) => {
    let branchArr = _data.filter(child => father[currentKey] === child[fatherKey]);
    if (branchArr && branchArr.length > 0) {
      branchArr = sortArr(branchArr);
      father.children = branchArr; // eslint-disable-line
    }
    return !father[fatherKey] || father[fatherKey] === 'null';
  });
};

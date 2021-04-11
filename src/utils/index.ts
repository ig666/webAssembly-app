/**
 * @描述 数组扁平化
 * @param setTree 需要扁平化的数组
 */
export const treeToList = (setTree: shouldRenderProps[]) => {
  const tree=JSON.parse(JSON.stringify(setTree))
  var queen: shouldRenderProps[] = [];
  var out: shouldRenderProps[] = [];
  queen = queen.concat(tree);
  while(queen.length){
      var first = queen.shift()
      if (first?.children) {
          queen = queen.concat(first.children)
      }
      if (first) {
          out.push(first)
      }
  }
  return out
};

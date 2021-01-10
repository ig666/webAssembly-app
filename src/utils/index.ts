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
      var first=queen.shift()
      if(first?.childrens){
          queen=queen.concat(first.childrens)
      }
      if(first){
        out.push(first)
      }
  }
  return out
};

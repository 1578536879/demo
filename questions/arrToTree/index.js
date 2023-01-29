function findParent(tree, child) {
  for (const cur of tree) {
    if (
      cur.id !== child.parentId &&
      cur.children &&
      cur.children.length !== 0
    ) {
      cur = findParent(cur.children, child);
    } else if (cur.id === child.parentId) {
      if (cur.children) {
        cur.children.push(child);
      } else {
        cur.children = [child];
      }
      return tree;
    }
  }
  return tree;
}

function arrToTree(arr) {
  let tree = [];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (arr[i].parentId === 0) {
      tree.push(arr[i]);
    } else {
      tree = findParent(tree, arr[i]);
    }
  }
  return tree;
}

function con(arr) {
  const res = [];
  const map = arr.reduce((res, v) => ((res[v.id] = v), res), {});
  for (const item of arr) {
    if (item.parentId in map) {
      const parent = map[item.parentId];
      parent.children = parent.children || [];
      parent.children.push(item);
    }else{
      res.push(item);
    }
  }
  return res;
}


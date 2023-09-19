export function list2tree(data: object, option?: any) {
  const options = Object.assign(
    {
      root: 0,
      id: "id",
      pid: "pid",
      children: "children",
    },
    option
  );
  const source: any = JSON.parse(JSON.stringify(data));
  const dataMap: any = {};
  const res: any[] = [];
  const { root, id, pid, children } = options;
  let itemId, itemPid;
  for (let item of source) {
    itemId = item[id];
    itemPid = item[pid];
    if (!dataMap[itemId]) {
      dataMap[itemId] = item;
    }
    if (itemPid === root) {
      res.push(item);
      continue;
    }
    if (!dataMap[itemPid]) {
      dataMap[itemPid] = {};
    }
    if (!dataMap[itemPid][children]) {
      dataMap[itemPid][children] = [];
    }
    dataMap[itemPid][children].push(item);
  }

  return res;
}

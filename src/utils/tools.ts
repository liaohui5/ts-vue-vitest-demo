/**
 * 随机获取数组中的某一项目
 * @param {string[]} arr
 * @returns {string}
 */
export const randomInArray = (arr: string[]): string => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

/**
 * 获取随机渐变背景颜色
 * @returns {string}
 */
export function getRandomBgColor(): string {
  const dirs = ["left", "right", "top", "bottom"];
  const colors = [
    "#a8c0ff, #3f2b96",
    "#4e54c8, #8f94fb",
    "#355c7d, #6c5b7b, #c06c84",
    "#fc5c7d, #6a82fb",
    "#108dc7, #ef8e38",
  ];
  const dir = randomInArray(dirs);
  const color = randomInArray(colors);
  return `linear-gradient(to ${dir}, ${color})`;
}

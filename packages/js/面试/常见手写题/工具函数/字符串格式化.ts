let str = `
1 2 4342    3 4 5
23 4
    4  5
`

function strToArr(s: string) {
  const firstDivide = s.split('\n').filter((item) => item !== '');

  const ans = firstDivide.map(item =>
    item.split(' ')
      .filter((item) => item !== '')
      .map((item) => Number(item))
  )

  console.log(ans);
}

strToArr(str)
let ans = [[1, 2, 4342, 3, 4, 5], [23, 4], [4, 5]] 
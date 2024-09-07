/*
有 n 个 a[] 
a[] => 速通记录 ai = 0 -> i 节点花费的时间

思路：找到到达每个关卡的最佳时间 -> 差分 -> 排序
1 4 7 9 13
1 3 3 2  4

2 3 8 11 14
2 1 5 3  3

1 3 7 12 13
1 2 4 5  1

1 1 3 2 1
*/


/*
样例
3 5
1 4 7 9 13
2 3 8 11 14
1 3 7 12 13
*/
#include <iostream>
using namespace std;

int main () {
  int n, m;
  int record[310];
  int best[310];

  cin >> n >> m;

  for (int i = 0; i < m; i++) best[i] = 1e9 + 10;

  while (n--) {
    for (int i = 0; i < m; i++) {
      cin >> record[i];
    }

    for (int i = 0; i < m; i++) {
      int diff = 0;
      if (!i) {
        diff = record[i]; 
      } else {
        diff = record[i] - record[i - 1];
      }

      if (best[i] > diff) {
        best[i] = diff;
      }
    }

  }

  int res = 0;
  for (int i = 0; i < m; i++) {
    res += best[i];
  }

  cout << res << endl;

  return 0;
};
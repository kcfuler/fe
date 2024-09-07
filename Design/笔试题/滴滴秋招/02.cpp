/*
m 个物品，放入 n 个位置中，让相邻位置的差值最大

从数据来看，使用int应该会爆，需要使用long long

样例分析：
1. n = 1, m = 50 
    => n == 1 
    => res = 0
2. n = 2, m = 2
    => n == 2
    => 0 2
    => 2
3. n = 3, m = 1
    => n == 3
    => 0 1 0
    => 2
4. n = 3, m = 2
  => n > m
  => m * 2
5. n = 

猜想：
n = 1  => 0
n = 2  => m
n >= 3 => m * 2

n = 4, m = 3
*/

#include <iostream>
using namespace ' '

int main () {
  int t;
  cin >> t;

  int n, m;
  while (t --) {
    cin >> n >> m;

    if (n === 1) {
      cout << 0 << ' ';
    } else if (n === 2) {
      cout << m << ' ';
    } else if (n >= 3) {
      cout << m * 2 << ' ';
    }
  }

  return 0;
}

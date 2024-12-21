# 给我一份最长公共子序列的解答，使用python实现
def longest_common_subsequence(text1: str, text2: str) -> int:
    """
    计算两个字符串的最长公共子序列长度
    使用动态规划求解
    dp[i][j]表示text1[:i]和text2[:j]的最长公共子序列长度
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # 动态规划填表
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]


def print_lcs(text1: str, text2: str) -> str:
    """
    打印最长公共子序列
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # 构建DP表
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    # 回溯构建最长公共子序列
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if text1[i-1] == text2[j-1]:
            lcs.append(text1[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1

    return ''.join(reversed(lcs))


# 测试代码
if __name__ == "__main__":
    text1 = "abcde"
    text2 = "ace"
    print(f"字符串1: {text1}")
    print(f"字符串2: {text2}")
    print(f"最长公共子序列长度: {longest_common_subsequence(text1, text2)}")
    print(f"最长公共子序列: {print_lcs(text1, text2)}")

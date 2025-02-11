package main

func validSubstringCount(word1 string, word2 string) int64 {
	n, m := len(word1), len(word2)
	if m > n {
		return 0
	}

	// 统计word2的字符频率
	need := make([]int, 26)
	for i := 0; i < m; i++ {
		need[word2[i]-'a']++
	}

	count := int64(0)
	// 遍历所有可能的起点
	for start := 0; start <= n-m; start++ {
		window := make([]int, 26)
		// 从起点开始，累积字符频率
		for end := start; end < n; end++ {
			window[word1[end]-'a']++

			// 检查当前窗口是否合法
			isValid := true
			for i := 0; i < 26; i++ {
				if window[i] < need[i] {
					isValid = false
					break
				}
			}
			if isValid {
				count++
			}
		}
	}

	return count
}

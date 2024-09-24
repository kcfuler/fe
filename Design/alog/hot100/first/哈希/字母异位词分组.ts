function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  for (let i = 0; i < strs.length; i++) {
    const key = strs[i].split('').sort().join('');
    if (map.has(key)) {
      map.get(key)!.push(strs[i]);
    } else {
      map.set(key, [strs[i]]);
    }
  }
  return Array.from(map.values());
}
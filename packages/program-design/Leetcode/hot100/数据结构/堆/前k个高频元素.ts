/*
* 使用最小堆实现
* */
function topKFrequent(nums: number[], k: number): number[] {
    // 建立一个哈希表来存储每个数字及其出现的频率
    const frequencyMap: Record<number, number> = {};
    for (const num of nums) {
        if (frequencyMap.hasOwnProperty(num)) {
            frequencyMap[num]++;
        } else {
            frequencyMap[num] = 1;
        }
    }

    const minHeap: [number, number][] = [];
    Object.keys(frequencyMap).forEach((num) => {
        const freq = frequencyMap[+num];
        // 堆的大小小于 k， 直接添加
        if (minHeap.length < k) {
            minHeap.push([+num, freq]);
            bubbleUP(minHeap, minHeap.length - 1);
        } else if (freq > minHeap[0][1]) {
            // 如果当前数字的频率大于堆顶元素的频率，替换并调整堆
            minHeap[0] = [+num, freq];
            bubbleDown(minHeap, 0, k);
        }
    })

    return minHeap.map(([num]) => num);
}

function bubbleUP(heap: [number, number][], index: number) {
    while (index > 0) {
        const parentIdx = Math.floor((index - 1) / 2);
        // 当前节点和父节点比较， 如果小就交换
        if (heap[parentIdx][1] > heap[index][1]) {
            [heap[parentIdx], heap[index]] = [heap[index], heap[parentIdx]];
            index = parentIdx; // 迭代
        } else {
            break;
        }
    }
}

function bubbleDown(heap: [number, number][], index: number, size: number) {
    let smallest = index;
    while (true) {
        const leftIdx = 2 * index + 1;
        const rightIdx = 2 * index + 2;
        if (leftIdx < size && heap[leftIdx][1] < heap[smallest][1]) {
            smallest = leftIdx;
        }
        if (rightIdx < size && heap[rightIdx][1] < heap[smallest][1]) {
            smallest = rightIdx
        }
        // 交换
        if (smallest !== index) {
            [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
            index = smallest;
        } else {
            break;
        }
    }
}
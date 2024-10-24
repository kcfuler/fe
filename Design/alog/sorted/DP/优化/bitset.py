import sys
import array


def measure_memory_int(size):
    # 测量大整数的内存占用
    num = (1 << size) - 1
    return sys.getsizeof(num)


def measure_memory_array(size):
    # 测量列表的内存占用
    arr = [True] * size
    return sys.getsizeof(arr)


def measure_memory_bitarray(size):
    # 使用 bytearray 来模拟位数组
    bits = bytearray((size + 7) // 8)
    for i in range(size):
        byte_index = i // 8
        bit_index = i % 8
        bits[byte_index] |= 1 << bit_index
    return sys.getsizeof(bits)


def run_test():
    sizes = [1e3, 1e4, 1e5, 1e6, 1e7]

    print("Memory usage (in bytes):")
    print("Size\t\tInt\t\tList\t\tBitArray")
    print("-" * 60)

    for size in sizes:
        size = int(size)
        int_mem = measure_memory_int(size)
        array_mem = measure_memory_array(size)
        bitarray_mem = measure_memory_bitarray(size)

        print(f"{size:.1e}\t\t"
              f"{int_mem:,}\t\t"
              f"{array_mem:,}\t\t"
              f"{bitarray_mem:,}")


run_test()

fn main() {
    // Demo 1: 基本类型和变量
    let x = 5;
    let y = 10;
    println!("x = {}, y = {}", x, y);

    // Demo 2: 条件语句
    if x < y {
        println!("x is less than y");
    } else {
        println!("x is not less than y");
    }

    // Demo 3: 循环
    for i in 0..5 {
        println!("i = {}", i);
    }

    // Demo 4: 函数
    fn add(a: i32, b: i32) -> i32 {
        a + b
    }
    println!("5 + 3 = {}", add(5, 3));

    // Demo 5: 向量（动态数组）
    let mut vec = Vec::new();
    vec.push(1);
    vec.push(2);
    vec.push(3);
    println!("Vector: {:?}", vec);

    // Demo 6: 匹配模式
    let number = 13;
    match number {
        1 => println!("One"),
        2 | 3 | 5 | 7 | 11 => println!("This is a prime"),
        13..=19 => println!("A teen"),
        _ => println!("Ain't special"),
    }

    // Demo 7: 结构体
    struct Person {
        name: String,
        age: u8,
    }
    let person = Person {
        name: String::from("Alice"),
        age: 30,
    };
    println!("{} is {} years old.", person.name, person.age);
}

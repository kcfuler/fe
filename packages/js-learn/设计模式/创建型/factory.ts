// 定义子类需要满足的接口
interface Transport {
  deliver: () => void;
}

// 定义工厂函数中使用的方式
enum TransportMethod {
  'ship' = 1,
  'road' = 2
}

// 实现了不同功能的类
class RoadLogic implements Transport {
  constructor() {

  }
  deliver: () => {

  };
}

class RiverLogic implements Transport {
  constructor() {

  }
  deliver: () => {

  };
}

function createTransport(type: TransportMethod): Transport {
  // 在这里分发不同的方法
  switch (type) {
    case TransportMethod.road:
      return new RoadLogic();
    case TransportMethod.ship:
      return new RiverLogic();
    default:
      return {
        deliver() {

        },
      }
  }
}

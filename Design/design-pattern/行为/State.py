from abc import ABC, abstractmethod

class State(ABC):
    @abstractmethod
    def insert_coin(self, machine):
        pass

    @abstractmethod
    def eject_coin(self, machine):
        pass

    @abstractmethod
    def select_item(self, machine):
        pass

    @abstractmethod
    def dispense(self, machine):
        pass

class NoCoinState(State):
    def insert_coin(self, machine):
        print("硬币已插入")
        machine.set_state(machine.has_coin_state)

    def eject_coin(self, machine):
        print("没有硬币可退")

    def select_item(self, machine):
        print("请先插入硬币")

    def dispense(self, machine):
        print("请先选择商品")

class HasCoinState(State):
    def insert_coin(self, machine):
        print("已经插入硬币,无需再插")

    def eject_coin(self, machine):
        print("硬币已退回")
        machine.set_state(machine.no_coin_state)

    def select_item(self, machine):
        print("商品已选择")
        machine.set_state(machine.sold_state)

    def dispense(self, machine):
        print("请先选择商品")

class SoldState(State):
    def insert_coin(self, machine):
        print("请等待商品发放")

    def eject_coin(self, machine):
        print("抱歉,您已选择商品")

    def select_item(self, machine):
        print("请等待商品发放")

    def dispense(self, machine):
        print("商品已发放")
        machine.set_state(machine.no_coin_state)

class VendingMachine:
    def __init__(self):
        self.no_coin_state = NoCoinState()
        self.has_coin_state = HasCoinState()
        self.sold_state = SoldState()
        self.state = self.no_coin_state

    def set_state(self, state):
        self.state = state

    def insert_coin(self):
        self.state.insert_coin(self)

    def eject_coin(self):
        self.state.eject_coin(self)

    def select_item(self):
        self.state.select_item(self)

    def dispense(self):
        self.state.dispense(self)

# 使用示例
machine = VendingMachine()
machine.insert_coin()
machine.select_item()
machine.dispense()
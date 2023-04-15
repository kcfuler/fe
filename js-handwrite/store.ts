// flux model
interface State {
  count: number;
}
interface Action {
  type: string;
}
interface Reducer<T> {
  (state: T, action: Action): T;
}
interface Listener {
  (): void;
}

class Store<T> {
  private state: T;
  private listeners: Listener[] = [];
  private reducer: Reducer<T>;
  constructor(reducer: Reducer<T>, initState: T) {
    this.state = initState;
    this.reducer = reducer;
  }
  getState() {
    return this.state;
  }
  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach((listener) => listener());
  }
  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }
}

// Path: js-handwrite\index.ts
// test
const initState = {
  count: 0,
};
const reducer: Reducer<State> = (state, action) => {
  switch (action.type) {
    case "add":
      return { count: state.count + 1 };
    case "minus":
      return { count: state.count - 1 };
    default:
      return state;
  }
};
const store = new Store<State>(reducer, initState);
const listener = () => {
  console.log("state change", store.getState());
};
store.subscribe(listener);
store.dispatch({ type: "add" });

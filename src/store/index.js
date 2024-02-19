import { legacy_createStore, combineReducers } from "redux";
// import rootReducer from './reducers'; // 导入根Reducer
// import { thunk } from "redux-thunk";
const cart = (state, actions) => {
  //判断state是否存在，如果不存在返回默认值
  if (!state) {
    return {
      arr: [{ title: "首页" }],
      Tabarr: []
    };
  }
  //下面可以通过switch语句或者if语句判断，
  //dispatch提交的type值，也可以接受payload附加参数
  //我们以switch为例，type值尽量大写
  console.log(state, actions);
  switch (actions.type) {
    case "PLUS":
      return {
        ...state,
        arr: [{ title: "首页" }, ...actions.arr]
      };
    case "CHANGE_COLOR":
      return {
        ...state,
        color: "#0088dd"
      };
    case "ADD_TABARR":
      return {
        ...state,
        Tabarr:[...actions.Tabarr]
      };
    case "DEL_TABARR":
      return {
        ...state,
        Tabarr:[...actions.Tabarr]
      } 
    default:
      return state;
  }
};

const reducer = combineReducers({
  cart
});

const store = legacy_createStore(reducer);

export default store;
   
import { combineReducers } from "redux";
import fetchDetail from './reducers/employeeDetail';
const rootReducers = combineReducers({
   fetchDetail
})
export default rootReducers;
import { combineReducers } from "redux";
import { dashboardReducer } from "./dashboardReducer";
import { productsReducer } from "./productsReducer";
import { testsReducer } from "./testsReducer";
import { patientsReducer } from "./patientsReducer";
import { availableReducer } from "./availableReducer";
import { customersReducer } from "./customersReducer";
import { amaanoReducer } from "./amaanoReducer";
import { tableDataReducer } from "./tableDataReducer";
import { tableDalabReducer } from "./tableDalabReducer";
import { tableTestDataReducer } from "./tableTestDataReducer";
import { purchasesReducer } from "./purchasesReducer";
import { purchases2Reducer } from "./purchases2Reducer";
import { salesReducer } from "./salesReducer";
import { servicesReducer } from "./servicesReducer";
import { vendorsReducer } from "./vendorsReducer";
import { productTypesReducer } from "./productTypesReducer";
import { serviceTypesReducer } from "./serviceTypesReducer";
import { categoryReducer } from "./categoryReducer";
import { ordersReducer } from "./ordersReducer";
import { menusReducer } from "./menusReducer";
import { usersReducer } from "./usersReducer";
import { companyInfoReducer } from "./companyInfoReducer";
import { activeUserReducer } from "./activeUserReducer";
import { employeesReducer } from "./employeesReducer"; 
import { stylesReducer } from "./stylesReducer"; 
import { employeeTitleReducer } from "./employeeTitleReducer"; 
import { isLoginReducer } from "./isLoginReducer";
import { tokenReducer } from "./tokenReducer";
import { socketIdReducer } from "./socketIdReducer";

const reducers = combineReducers({
  dashboard: dashboardReducer,
  customers: customersReducer,
  amaano: amaanoReducer,
  vendors: vendorsReducer,
  activeUser: activeUserReducer,
  companyInfo: companyInfoReducer,
  categories: categoryReducer,
  users: usersReducer,
  isLogin: isLoginReducer,
  token: tokenReducer,
  socketId: socketIdReducer,

});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined; // Reset state to undefined
  }
  return reducers(state, action);
};
// export default reducers;
export default rootReducer;

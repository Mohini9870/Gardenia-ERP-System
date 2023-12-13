import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Areas from "./components/area/Areas";
import Brands from "./components/brand/Brands";
import Categories from "./components/category/Categories";
import Cities from "./components/city/Cities";
import Countries from "./components/country/Countries";
import Distributors from "./components/distributor/Distributors";
import Districts from "./components/district/Districts";
import Families from "./components/family/Families";
import Home from "./components/Home";
import Hqs from "./components/hq/Hqs";
import ImportModal from "./components/import/ImportModal";
import LoginPage from "./components/login/LoginPage";
import PageNotFound from "./components/PageNotFound";
import Products from "./components/product/Products";
import Regions from "./components/region/Regions";
import ProtectedRoute from "./components/route/ProtectedRoute";
import States from "./components/state/States";
import Users from "./components/user/Users";
import { getUserDetails } from "./reducers/user";
// import UpdateStock from "./components/SNS/UpdateStock/UpdateStock";
import UpdateStockForm from "./components/SNS/UpdateStock/UpdateStockForm";
import UpdateStockInvoiceForm from "./components/SNS/UpdateStockInvoice/UpdateStockInvoiceForm";
// import Hqq from "./hqqs/hqq";

const App = () => {
  const {
    isRoleMis,
    isRoleRsm,
    isRoleDistApprover,
    isRoleUser,
    isRoleProductApprover,
    isRoleProduct,
  } = useSelector(getUserDetails);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} exact />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
            exact
          />
          {isRoleMis && (
            <>
              <Route
                path="/countries"
                element={
                  <ProtectedRoute>
                    <Countries />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/states"
                element={
                  <ProtectedRoute>
                    <States />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/regions"
                element={
                  <ProtectedRoute>
                    <Regions />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/districts"
                element={
                  <ProtectedRoute>
                    <Districts />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/cities"
                element={
                  <ProtectedRoute>
                    <Cities />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/areas"
                element={
                  <ProtectedRoute>
                    <Areas />
                  </ProtectedRoute>
                }
                exact
              />

              <Route
                path="/hqs"
                element={
                  <ProtectedRoute>
                    <Hqs />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/updatestockform"
                element={
                  <ProtectedRoute>
                    <UpdateStockForm />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/updatestockinvoiceform"
                element={
                  <ProtectedRoute>
                    <UpdateStockInvoiceForm />
                  </ProtectedRoute>
                }
                exact
              />
            </>
          )}
          {(isRoleMis || isRoleProduct || isRoleProductApprover) && (
            <>
              <Route
                path="/brands"
                element={
                  <ProtectedRoute>
                    <Brands />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/families"
                element={
                  <ProtectedRoute>
                    <Families />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/products/:productStatus"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
                exact
              />
            </>
          )}
          {(isRoleMis || isRoleRsm) && (
            <>
              <Route
                path="/distributors/:distributorStatus"
                element={
                  <ProtectedRoute>
                    <Distributors />
                  </ProtectedRoute>
                }
                exact
              />
              <Route
                path="/users/:userStatus"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
                exact
              />
            </>
          )}
          {isRoleDistApprover && (
            <Route
              path="/distributors/:distributorStatus"
              element={
                <ProtectedRoute>
                  <Distributors />
                </ProtectedRoute>
              }
              exact
            />
          )}
          {isRoleUser && (
            <Route
              path="/users/:userStatus"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
              exact
            />
          )}
          <Route path="" element={<Navigate to="/login" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <ImportModal />
    </>
  );
};

export default App;

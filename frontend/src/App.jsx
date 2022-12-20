import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Header from './components/Header';
import OrderListScreen from './screens/dashboard/OrderListScreen.jsx';
import UserListScreen from './screens/dashboard/UserListScreen';
import ProductListScreen from './screens/dashboard/ProductListScreen';
import ProductEditScreen from './screens/dashboard/ProductEditScreen';
import UserEditScreen from './screens/dashboard/UserEditScreen';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import AdminPanel from './screens/dashboard/adminpanel/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <Header />
        <main>
          <Routes>
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            {/************ ADMIN ROUTES ***********/}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            >
              <Route
                path="Dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              />
              <Route
              path="orders"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />
               <Route
              path="users"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            </Route>

            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            {/*Admin Routes */}
          
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orderhistory"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            />

         
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/product/:id"
              element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/user/:id"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            ></Route>

            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
        <footer>
          <div className="text-center">Todos los derechos reservados</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

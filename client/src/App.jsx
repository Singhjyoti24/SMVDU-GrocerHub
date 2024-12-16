import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AuthLayout from './components/auth/AuthLayout'
import AdminLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/AdminDashboard'
import AdminProducts from './pages/admin-view/AdminProducts'
import AdminOrders from './pages/admin-view/AdminOrders'
import ShopLayout from './components/shopping-view/ShopLayout'
import NotFound from './pages/not-found/NotFound'
import MainHome from './pages/shopping-view/MainHome'
import Listing from './pages/shopping-view/Listing'
import Checkout from './pages/shopping-view/Checkout'
import Account from './pages/shopping-view/Account'
import CheckAuth from './components/common/CheckAuth'
import UnAuth from './pages/unauth-page/UnAuth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import Feedback from './pages/shopping-view/Feedback'
import RecipeSuggestions from './components/shopping-view/RecipeSuggestions'
import PaypalReturn from './pages/shopping-view/PaypalReturn'
import PaymentSuccess from './pages/shopping-view/PaymentSuccess'
import Search from './pages/shopping-view/Search'

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      <Routes>
        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        } />
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShopLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<MainHome />} />
          <Route path="list" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="search" element={<Search />} />
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuth />} />
        <Route path="/recipes" element={<RecipeSuggestions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

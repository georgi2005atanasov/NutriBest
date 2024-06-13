import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout, { loader as tokenLoader } from './pages/Root';
import LoginPage, { action as loginAction } from './pages/auth/Login';
import RegisterPage, { action as registerAction } from './pages/auth/Register';
import { action as logoutAction } from './pages/auth/Logout';
import HomePage from './pages/Home';
import AddProduct, { action as addProductAction, loader as removeFilters } from './pages/products/AddProduct';
import AllProducts, { loader as getAllProducts } from './pages/products/AllProducts';
import ProductsLayout from './pages/products/ProductsLayout';
import ErrorPage from './pages/Error';
import MultiSelectCategory, { loader as getCategoriesCount } from './components/UI/Form/MultiSelectCategory';
import EditProduct, { loader as productLoader, action as editProduct } from './pages/products/EditProduct';
import Profile, { loader as profileLoader, action as editProfile } from './pages/profile/Profile';
import AllPromotions, { loader as promotionsLoader } from './pages/promotions/AllPromotions';
import AddPromotion, { action as addPromotion } from './pages/promotions/AddPromotion';
import EditPromotion, { loader as promotionLoader, action as editPromotion } from './pages/promotions/EditPromotion';
import PromotionsLayout from './pages/promotions/PromotionsLayout';
import ProductDetails, { loader as productDetailsLoader } from './pages/products/details/ProductDetails';
import CategoriesLayout from './pages/categories/CategoriesLayout';
import AllCategories from './pages/categories/AllCategories';
import AddCategoryPage, { action as addCategory } from './pages/categories/AddCategory';
import BrandsLayout from './pages/brands/BrandsLayout';
import AllBrands from './pages/brands/AllBrands';
import AddBrandPage, { action as addBrand } from './pages/brands/AddBrand';
import FlavoursLayout from './pages/flavours/FlavoursLayout';
import AllFlavours, { loader as flavoursLoader } from './pages/flavours/AllFlavours';
import AddFlavour, { action as addFlavour } from './pages/flavours/AddFlavour';
import PackagesLayout from './pages/packages/PackagesLayout';
import AllPackages, { loader as packagesLoader } from './pages/packages/AllPackages';
import AddPackage, { action as addPackage } from './pages/packages/AddPackage';
import MoreLayout from './pages/more/MoreLayout';
import Cart from './pages/cart/Cart';
import AllPromoCodes, { loader as getAllPromoCodes } from './pages/promo-codes/AllPromoCodes';
import PromoCodeForm, { action as createPromoCodes } from './pages/promo-codes/PromoCodeForm';
import PromoCodesLayout from './pages/promo-codes/PromoCodesLayout';
import OrderLayout from './pages/order/OrderLayout';
import OrderForm, { loader as loadOrder } from './pages/order/OrderForm';
import AddressForm, { loader as loadAddress } from './pages/profile/address/AddressForm.jsx';
import FinishedOrder from './pages/order/FinishedOrder.jsx';
import ConfirmOrder from './pages/order/ConfirmOrder.jsx';
import ForgotPassword, { action as sendForgotPassword } from './pages/auth/ForgotPassword.jsx';
import ResetPassword, { action as resetPassword } from './pages/auth/ResetPassword.jsx';
import AllOrders, { loader as loadOrders } from './pages/order/AllOrders.jsx';
import AllProfiles, { loader as allProfiles } from './pages/profile/AllProfiles.jsx';
import ProfileDetails, { loader as profileDetailsLoader } from './pages/profile/ProfileDetails.jsx';
import MyOrders, { loader as loadUserOrders } from './pages/order/MyOrders.jsx';
import ShippingDiscountsLayout from './pages/shipping-discounts/ShippingDiscountsLayout.jsx';
import AddShippingDiscount, { loader as loadCountries } from './pages/shipping-discounts/AddShippingDiscount.jsx';
import AllShippingDiscounts, { loader as loadShippingDiscounts } from './pages/shipping-discounts/AllShippingDiscounts.jsx';
import LiveLayout from './pages/live/LiveLayout.jsx';
import LiveDashboard from './pages/live/LiveDashboard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage />, action: loginAction },
      { path: 'forgot-password', element: <ForgotPassword />, action: sendForgotPassword },
      { path: 'Identity/ResetPassword', element: <ResetPassword />, action: resetPassword },
      { path: 'register', element: <RegisterPage />, action: registerAction },
      { path: 'logout', action: logoutAction },
      { path: 'home', element: <HomePage /> },
      {
        path: 'products', element: <ProductsLayout />, children: [
          { path: 'add', element: <AddProduct />, action: addProductAction, loader: removeFilters, id: "brandsLoader" },
          {
            path: "all", element: <AllProducts />, loader: getAllProducts, children: [
              {
                index: true, element: <MultiSelectCategory />,
                loader: getCategoriesCount, id: "categoriesCount"
              }
            ]
          },
          {
            path: "edit/:id", element: <EditProduct />, loader: productLoader, action: editProduct
          },
          {
            path: "details/:id/:name", element: <ProductDetails />, loader: productDetailsLoader, id: "productDetails"
          }
        ]
      },
      {
        path: 'profile', element: <Profile />, loader: profileLoader, action: editProfile,
      },
      {
        path: 'profile/:id', element: <ProfileDetails />, loader: profileDetailsLoader,
      },
      {
        path: 'profile/address', element: <AddressForm />, loader: loadAddress
      },
      {
        path: 'profiles', element: <AllProfiles />, loader: allProfiles
      },
      {
        path: 'promotions', element: <PromotionsLayout />, children: [
          {
            index: true, element: <AllPromotions />, loader: promotionsLoader, id: "loadPromo",
          },
          {
            path: 'add', element: <AddPromotion />, action: addPromotion
          },
          {
            path: 'edit/:id', element: <EditPromotion />, id: "promoLoader",
            loader: promotionLoader, action: editPromotion
          }
        ]
      },

      {
        path: 'categories', element: <CategoriesLayout />, children: [
          { index: true, element: <AllCategories /> },
          { path: 'add', element: <AddCategoryPage />, action: addCategory }
        ]
      },

      {
        path: 'brands', element: <BrandsLayout />, children: [
          { index: true, element: <AllBrands /> },
          { path: 'add', element: <AddBrandPage />, action: addBrand }
        ]
      },

      {
        path: 'flavours', element: <FlavoursLayout />, children: [
          { index: true, element: <AllFlavours />, loader: flavoursLoader },
          { path: 'add', element: <AddFlavour />, action: addFlavour }
        ]
      },

      {
        path: 'packages', element: <PackagesLayout />, children: [
          { index: true, element: <AllPackages />, loader: packagesLoader },
          { path: 'add', element: <AddPackage />, action: addPackage }
        ]
      },
      {
        path: 'more', element: <MoreLayout />
      },
      {
        path: 'cart', element: <Cart />
      },
      {
        path: 'promo-codes', element: <PromoCodesLayout />,
        children: [
          {
            index: true, element: <AllPromoCodes />, loader: getAllPromoCodes
          },
          {
            path: 'add', element: <PromoCodeForm />, action: createPromoCodes
          }
        ]
      },
      {
        path: 'order', element: <OrderLayout />, children: [
          {
            index: true, element: <OrderForm />, loader: loadOrder
          },
          {
            path: 'finished', element: <FinishedOrder />
          },
          {
            path: 'confirm', element: <ConfirmOrder />
          }
        ]
      },
      {
        path: 'orders', element: <AllOrders />, loader: loadOrders
      },
      {
        path: 'my-orders', element: <MyOrders />, loader: loadUserOrders
      },
      {
        path: 'shipping-discounts', element: <ShippingDiscountsLayout />, children: [
          {
            path: 'add', element: <AddShippingDiscount />, loader: loadCountries
          },
          {
            path: 'all', element: <AllShippingDiscounts />, loader: loadShippingDiscounts
          }
        ]
      },
      {
        path: 'live', element: <LiveLayout />, children: [
          {
            path: 'dashboard', element: <LiveDashboard />
          }
        ]
      }
    ],
    id: "rootLoader",
    loader: tokenLoader,
    errorElement: <ErrorPage />
  },
]);

function App() {
  return <>
    <RouterProvider router={router} />
  </>
}

export default App;
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout, { loader as tokenLoader } from './pages/Root';
import LoginPage, { action as loginAction } from './pages/auth/Login';
import RegisterPage, { action as registerAction } from './pages/auth/Register';
import { action as logoutAction } from './pages/auth/Logout';
import HomePage from './pages/Home';
import AddProductPage, { action as addProductAction, loader as removeFilters } from './pages/products/AddProduct';
import AllProducts, { loader as getAllProducts } from './pages/products/AllProducts';
import ProductsLayout from './pages/products/ProductsLayout';
import ErrorPage from './pages/Error';
import MultiSelectCategory, { loader as getCategoriesCount } from './components/UI/Form/MultiSelectCategory';
import EditProduct, { loader as productLoader, action as editProduct } from './pages/products/EditProduct';
import Profile, { loader as profileLoader, action as editProfile } from './pages/profile/Profile';
import AllPromotionsPage, { loader as promotionsLoader } from './pages/promotions/AllPromotions';
import AddPromotionPage, { action as addPromotion } from './pages/promotions/AddPromotion';
import EditPromotionPage, { loader as promotionLoader, action as editPromotion } from './pages/promotions/EditPromotion';
import PromotionsLayout from './pages/promotions/PromotionsLayout';
import ProductDetailsPage, { loader as productDetailsLoader } from './pages/products/ProductDetails';
import CategoriesLayout from './pages/categories/CategoriesLayout';
import AllCategories from './pages/categories/AllCategories';
import AddCategoryPage, { action as addCategory } from './pages/categories/AddCategory';
import BrandsLayout from './pages/brands/BrandsLayout';
import AllBrands from './pages/brands/AllBrands';
import AddBrandPage, { action as addBrand } from './pages/brands/AddBrand';
import FlavoursLayout from './pages/flavours/FlavoursLayout';
import AllFlavours, { loader as flavoursLoader } from './pages/flavours/AllFlavours';
import AddFlavourPage, { action as addFlavour } from './pages/flavours/AddFlavour';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage />, action: loginAction },
      { path: 'register', element: <RegisterPage />, action: registerAction },
      { path: 'logout', action: logoutAction },
      { path: 'home', element: <HomePage /> },
      {
        path: 'products', element: <ProductsLayout />, children: [
          { path: 'add', element: <AddProductPage />, action: addProductAction, loader: removeFilters, id: "brandsLoader" },
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
            path: "details/:id/:name", element: <ProductDetailsPage />, loader: productDetailsLoader
          }
        ]
      },
      { path: 'profile', element: <Profile />, loader: profileLoader, action: editProfile },

      {
        path: 'promotions', element: <PromotionsLayout />, children: [
          {
            index: true, element: <AllPromotionsPage />, loader: promotionsLoader, id: "loadPromo",
          },
          {
            path: 'add', element: <AddPromotionPage />, action: addPromotion
          },
          {
            path: 'edit/:id', element: <EditPromotionPage />, id: "promoLoader",
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
          { path: 'add', element: <AddFlavourPage />, action: addFlavour }
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
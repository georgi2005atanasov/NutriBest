import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout, { loader as tokenLoader } from './pages/Root';
import LoginPage, { action as loginAction } from './pages/auth/Login';
import RegisterPage, { action as registerAction } from './pages/auth/Register';
import { action as logoutAction } from './pages/auth/Logout';
import HomePage from './pages/Home';
import AddProductPage, { action as addProductAction, loader as removeFilters } from './pages/products/AddProduct';
import AllProducts, { loader as getAllProducts } from './pages/products/AllProducts';
import ProductsLayout from './pages/products/Products';
import ErrorPage from './pages/Error';
import MultiSelectCategory, { loader as getCategoriesCount } from './components/UI/Form/MultiSelectCategory';
import SideBar from './components/UI/Sidebar/SideBar';
import ProductItem from './pages/products/ProductItem';
import EditProduct, { loader as productLoader, action as editProduct } from './pages/products/EditProduct';
import Profile, { loader as profileLoader, action as editProfile } from './pages/profile/Profile';

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
          { path: 'add', element: <AddProductPage />, action: addProductAction, loader: removeFilters },
          {
            path: "all", element: <AllProducts />, loader: getAllProducts, children: [
              {
                index: true, element: <MultiSelectCategory />,
                loader: getCategoriesCount, id: "categoriesCount"
              },
              {
                index: true, element: <SideBar />
              },
              {
                index: true, element: <ProductItem />
              }
            ]
          },
          {
            path: "edit/:id", element: <EditProduct />, loader: productLoader, action: editProduct
          }
        ]
      },
      { path: 'error', element: <ErrorPage /> },
      { path: 'profile', element: <Profile />, loader: profileLoader, action: editProfile }
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
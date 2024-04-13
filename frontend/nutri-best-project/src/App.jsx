import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout, { loader as tokenLoader } from './pages/Root';
import LoginPage, { action as loginAction } from './pages/auth/Login';
import RegisterPage, { action as registerAction } from './pages/auth/Register';
import { action as logoutAction } from './pages/auth/Logout';
import HomePage from './pages/Home';
import AddProductPage, { action as addProductAction } from './pages/products/AddProduct';
import AllProducts, { loader as getAllProducts } from './pages/products/AllProducts';
import ProductsLayout from './pages/products/Products';
import ErrorPage from './pages/Error';
import MultiSelectCategory, { loader as getCategoriesCount } from './components/UI/Form/MultiSelectCategory';

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
          { path: 'add', element: <AddProductPage />, action: addProductAction},
          {
            path: 'all', element: <AllProducts />, loader: getAllProducts, children: [
              {
                index: true, element: <MultiSelectCategory />,
                loader: getCategoriesCount, id: "categoriesCount"
              }
            ]
          },
        ]
      },
      { path: 'error', element: <ErrorPage /> }
    ],
    id: "rootLoader",
    loader: tokenLoader
  }
]);

function App() {
  return <>
    <RouterProvider router={router} />
  </>
}

export default App;
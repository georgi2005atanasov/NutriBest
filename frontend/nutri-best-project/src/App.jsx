import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout, { loader as tokenLoader } from './pages/Root';
import LoginPage, { action as loginAction } from './pages/auth/Login';
import RegisterPage, { action as registerAction } from './pages/auth/Register';
import { action as logoutAction } from './pages/auth/Logout';
import HomePage from './pages/Home';
import AddProduct from './pages/AddProduct';
import ErrorPage from './pages/Error';

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
      { path: 'add-product', element: <AddProduct /> },
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
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import LoginPage, { action as loginAction } from './pages/auth/Login';
import RegisterPage, { action as registerAction } from './pages/auth/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: 'login', element: <LoginPage />, action: loginAction},
      { path: 'register', element: <RegisterPage />, action: registerAction },
    ]
  }
]);

function App() {
  return <>
    <RouterProvider router={router} />
  </>
}

export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
// import ErrorPage from './ErrorPage.tsx'
// import Login from './components/Login.tsx'

// const router = createBrowserRouter([
//   {
//     path: "*",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "login",
//         element: <Login />
//       }
//     ]
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* <RouterProvider router={router}/> */}
  </React.StrictMode>,
)

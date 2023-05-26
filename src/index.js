import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Register } from './features';
import './index.css';
import Bashir from './components/Bashir/Bashir';
import Login from './components/Login/Login'

const container = document.getElementById('root');
const root = createRoot(container);

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
    children:[
      { index: true, element: <Register/> },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Register/>
      },
      {
        path: "/bashir",
        element: <Bashir/>
      },
    ]
	},
]);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


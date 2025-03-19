import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AuthLayout, Login, TestPage } from "./components/index.js";
import TestSummary from "./pages/TestSummary.jsx";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllTest from "./pages/alltests.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-tests/:subjectid",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllTest />
          </AuthLayout>
        ),
      },
      {
        path: "/all-tests",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllTest />
          </AuthLayout>
        ),
      },
      {
        path: "/test/:testid",
        element: (
          <AuthLayout authentication>
            {" "}
            <TestPage />
          </AuthLayout>
        ),
      },
      {
        path: "/test-summary/:testid",
        element: (
          <AuthLayout authentication>
            {" "}
            <TestSummary />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Component/Home/Home.jsx'
import AuthProvider from './Component/Authprovider/AuthProvider.jsx'

import MenageUsee from "./Component/Users/Users.jsx";
import Projects from './Component/Projects/Projects.jsx'
import Services from './Component/Services/Services.jsx'
import Review from './Component/Review/Review.jsx'
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/users",
        element: <MenageUsee></MenageUsee>,
      },
      {
        path: "/projects",
        element: <Projects></Projects>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/review",
        element: <Review></Review>,
      },
      {
        path: "/Social",
        element: <Social></Social>,
      },
    ],
  },
]);

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Social from './Component/Social/Social.jsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);

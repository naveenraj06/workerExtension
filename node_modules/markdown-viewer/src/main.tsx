import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import router from './routes';
// import App from './App.tsx'

const routesConfig = createBrowserRouter(router);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routesConfig} />
  </StrictMode>,
)

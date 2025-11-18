import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './app/styles/global.css'
import { router } from './app/router'
import { AppQueryProvider } from './app/providers/QueryClientProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppQueryProvider>
      <RouterProvider router={router} />
    </AppQueryProvider>
  </StrictMode>,
)

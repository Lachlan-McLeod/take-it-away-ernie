import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Auth0Provider } from '@auth0/auth0-react'

import { routes } from './routes'

const router = createBrowserRouter(routes)

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="dev-7mcgbbrsd00oul3y.au.auth0.com"
      clientId="HYUkmcJ8epl0i6JAE8953PY6BRHdOOFf"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https:/tiae/api',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient , QueryClientProvider } from '@tanstack/react-query' 
import { Provider } from "react-redux"
import { store } from './store/store.ts';
import router from './router/index.ts'
import './index.css'

const query = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={query}>
          <RouterProvider router={router}/>
        </QueryClientProvider>
      </LocalizationProvider>
  </Provider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient , QueryClientProvider } from '@tanstack/react-query' 
import { Provider } from "react-redux"
import { store } from './store/store.ts';
import router from './router/index.tsx'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; 
const query = new QueryClient()

// import utc from 'dayjs/plugin/utc' // ES 2015


dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('it')
dayjs.tz.setDefault('Europe/Rome')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={query}>
          <ToastContainer/>
            <RouterProvider router={router}/>
        </QueryClientProvider>
      </LocalizationProvider>
  </Provider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from "react-redux"
import { store } from './store/store.ts';
import router from './router/index.ts'
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router}/>
      </LocalizationProvider>
  </Provider>
  </StrictMode>,
)

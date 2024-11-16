import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { SignIn } from './page/sign.tsx'
import { LogIn } from './page/login.tsx'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/login' element={<LogIn/> }/>
        </Routes>
      </LocalizationProvider>
    </BrowserRouter>
  </StrictMode>,
)

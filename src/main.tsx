import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { UserSignIn } from './page/UserSignIn.tsx'
import { CompanySignIn } from './page/CompanySignIn.tsx'
import { LogIn } from './page/login.tsx'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from "react-redux"
import { store } from "./services/store.ts"
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route path='/user/signin/' element={<UserSignIn/>}/>
            <Route path='/company/signin/' element={<CompanySignIn/>}/>
            <Route path='/login' element={<LogIn/> }/>
          </Routes>
        </LocalizationProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)

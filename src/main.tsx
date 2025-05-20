//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from '@router/router'
import { Provider } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { store } from '@store/store'


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:false,
    }
  }
})

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>

            <ToastContainer autoClose={2000}/>    
            <RouterProvider router={router}/>

      </QueryClientProvider>
      
    </Provider>
  //</StrictMode>,
)

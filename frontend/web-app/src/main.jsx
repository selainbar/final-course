import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import LogInComp from './Components/LogInComp.jsx'
import NotFoundPage from './Components/NotFoundPage.jsx'
import Lobby from './Components/Lobby/Lobby.jsx'
import SignUpComp from './Components/SignUpComp.jsx'
import { UserProvider } from './UserContext.jsx'

const router =createBrowserRouter([{
  path:'/',
  element:<LogInComp/>,
  errorElement:<NotFoundPage/>
},
{
  path:'/Lobby',
  element:<Lobby/>,
},
{
path:'/SignUp',
element:<SignUpComp/>,
errorElement:<NotFoundPage/>
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider value={{user:{userName:'',status:''}}}>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
  </UserProvider>
)

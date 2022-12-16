import './App.css';
 import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/Login';
import PrivateRoutes from './Components/PrivateRoutes';
import Home from './Components/Home';
import Perfil from './Components/Perfil';
import Posts from './Components/Posts';
import Register from './Components/Register';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
         <Routes>
            <Route path='/' element={
              <PrivateRoutes>
                <Home>
                  <Posts/>
                </Home>
              </PrivateRoutes>
            }></Route>
            <Route path='/perfil' element={
              <PrivateRoutes>
                 <Home>
                    <Perfil/>
                 </Home>
              </PrivateRoutes>
            }></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import TextFile from './Pages/TextFile'
import ShareFile from './Components/ShareFile'
import { useAuth } from './AuthContext'
import CreateComponent from './Components/CreateComponent'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
    const {isOpenComponent} = useAuth();
  return (
    <>
     <Routes>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/' element={<Home/>}/>
       <Route path='/text-file' element={<TextFile/>}/>
     </Routes>
    { isOpenComponent.share && <ShareFile/>}
    { (isOpenComponent.newFolder || isOpenComponent.newExcel || isOpenComponent.newDocs ) && <CreateComponent/>}
    </>
  )
}

export default App

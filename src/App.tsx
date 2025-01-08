import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import TextFile from './Pages/TextFile'
import ShareFile from './Components/ShareFile'
import { useAuth } from './AuthContext'
import CreateComponent from './Components/CreateComponent'
import { ToastContainer } from 'react-toastify'
import { FileProvider } from './FileContext'

function App() {
  const { isOpenComponent } = useAuth()

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <FileProvider> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-file" element={<TextFile />} />
        </Routes>
      </FileProvider>

      {isOpenComponent.share && <ShareFile />}
      {(isOpenComponent.newFolder || isOpenComponent.newExcel || isOpenComponent.newDocs) && <CreateComponent />}
    </>
  )
}

export default App

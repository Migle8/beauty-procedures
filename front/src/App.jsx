
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProcedurePage from './pages/ProcedurePage'
import MyProceduresPage from './pages/MyProceduresPage'
import MyProcedureInfoPage from './pages/MyProcedureInfoPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<LoginPage />}></Route>
        <Route path='/signup' element={<RegisterPage />}></Route>
        <Route path='/procedures' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }></Route>
        <Route path='/:id' element={
          <ProtectedRoute>
            <ProcedurePage />
          </ProtectedRoute>
        }></Route>
        <Route path='/myprocedures' element={
          <ProtectedRoute>
            <MyProceduresPage />
          </ProtectedRoute>
        }></Route>
        <Route path='/myprocedures/:id' element={
          <ProtectedRoute>
            <MyProcedureInfoPage />
          </ProtectedRoute>
        }></Route>
      </Routes>
    </>
  )
}

export default App

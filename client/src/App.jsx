import { Route, Routes } from "react-router-dom"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import ProtectedRoute from "./utils/ProtectedRoute"
import Home from "./Pages/Home"



function App() {

  return (
    <>
    <Routes>
     <Route path="/" element={
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
      } />
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/signup" element={<SignUp/>} />

    </Routes>
     
    </>
  )
}

export default App

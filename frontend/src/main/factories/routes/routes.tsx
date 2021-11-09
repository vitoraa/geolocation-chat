import React from 'react'
import { Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { makeSignUp } from '../pages/signup/signup-factory'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={makeSignUp()}></Route>
      </Routes>
    </BrowserRouter >
  )
}

export default Router

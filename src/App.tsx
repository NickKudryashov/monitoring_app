import React, { Suspense, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Counter from './components/Counter'
import './styles/index.scss'
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async'
import { MainPageLazy } from './pages/MainPage/MainPage.lazy'
import { useTheme } from './theme/useTheme'
import classNames from './helpers/classNames/classNames'



const App = () => {
  const {theme,toggleTheme} = useTheme()
  return (
    <div className={classNames('app',{},[theme,])}>
      <button onClick={toggleTheme}>Сменить тему123</button>
      <Link to={'/'}>Главная</Link>
      <Link to={'/about'}>О странице</Link>
      <Suspense fallback={<div>Loading</div>}>
      <Routes>
            <Route path={"/about"} element={<AboutPageAsync/>}/>
            <Route path={"/"} element={<MainPageLazy/>}/>
      </Routes>
      </Suspense>
      <Counter/>
    </div>
  )
}

export default App

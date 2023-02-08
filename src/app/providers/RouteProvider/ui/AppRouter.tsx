import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { RouteConfig } from "../config/RouteConfig"

export const AppRouter = () => {
    return (
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
              {Object.values(RouteConfig).map(({path,element})=>(
              <Route 
                  key={path} 
                  path={path} 
                  element={<div className='page-wrapper'>{element}</div>}/>
                  ))}
        </Routes>
        </Suspense>
    )
              }
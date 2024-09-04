import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './Context/UserContext.jsx'
import { CourseContextProvider } from './Context/CourseContext.jsx'

export const server='https://e-learning-server-2amx.onrender.com'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
    <App />
    </CourseContextProvider>
    </UserContextProvider>
  </StrictMode>,
)
// Note we have make the ParentProvider as UserContextProvide
//because we will use too many things in courses where we
//need to be login or logout so make it parent

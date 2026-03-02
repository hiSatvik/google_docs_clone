import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SketchyForm from "./forms/forms"
import Home from "./pages/home/home"
import DocumentEditor from "./pages/editor/editor"

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/register",
      element: <SketchyForm mode="register" />
    },
    {
      path: "/login",
      element: <SketchyForm mode="login" />
    },
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/editor",
      element: <DocumentEditor />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
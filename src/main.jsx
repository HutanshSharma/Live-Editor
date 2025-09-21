import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Homepage from './components/Homepage.jsx'
import CodeEditor from './components/CodeEditor.jsx'
import { ImageProvider } from './store/ImageContext.jsx'
import "./index.css"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index:true,
        element: <Homepage />
      },
      {
        path: '/codeeditor',
        element: <CodeEditor />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <ImageProvider>
    <RouterProvider router={router} />
  </ImageProvider>
)

import Home from './pages/Home'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'

function App() {
  const path = window.location.pathname

  if (path === '/admin') {
    return <Admin />
  }

  if (path === '/admin/login') {
    return <AdminLogin />
  }

  return <Home />
}

export default App
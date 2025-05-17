import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar.jsx'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-neutral-100 dark:bg-neutral-800 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
          © {new Date().getFullYear()} Ma'man - مأمن
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
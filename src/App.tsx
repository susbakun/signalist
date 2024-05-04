import { AppContent, AppSideBar, RootLayout } from '@/components'
import { BiMoon } from 'react-icons/bi'

function App() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    document.body.classList.toggle('darkmode')
  }

  return (
    <RootLayout className="flex">
      <AppSideBar />
      <button className="bg-black absolute right-0" onClick={toggleDarkMode}>
        <BiMoon />
      </button>
      <AppContent />
    </RootLayout>
  )
}

export default App
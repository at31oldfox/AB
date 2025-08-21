import { ReactNode } from 'react'

import { Link } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="mb-4">
        <div className="bg-[#F2F9FF] max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="block">
            <img src="/logo.svg" alt="Золотая Линия" className="h-10" />
            <div className="text-[#CCCBCC] text-xs leading-4 font-normal mt-1">
              ООО "Золотая линия" ИНН 5024225885
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex">
        <div className="bg-[#F2F9FF] max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          {children}
        </div>
      </main>

      <footer className="bg-white mt-4">
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
          <img src="/logo-small.svg" alt="AurumCMS" className="h-5" />
        </div>
      </footer>
    </div>
  )
}

export default Layout

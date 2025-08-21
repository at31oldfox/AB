import { Suspense, lazy } from 'react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import ErrorBoundary from './shared/components/ErrorBoundary'
import Layout from './shared/layouts/Layout'

// Lazy load page components
const Branches = lazy(() => import('./pages/Branches/Branches'))
const SelectionPage = lazy(() => import('./pages/SelectionPage/SelectionPage'))
const SpecialistPage = lazy(() => import('./pages/SpecialistsPage/SpecialistPage'))
const SpecialistDetailsPage = lazy(
  () => import('./pages/SpecialistDetailsPage/SpecialistDetailsPage')
)
const ServicesPage = lazy(() => import('./pages/ServicesPage/ServicesPage'))
const DateTimePage = lazy(() => import('./pages/DateTimePage'))
const BookingInfoPage = lazy(() => import('./pages/BookingInfo/BookingInfoPage'))
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage'))
const SelectDateTimeSpecialist = lazy(
  () => import('./pages/SelectDateTimeSpecialist/SelectDateTimeSpecialist')
)

const queryClient = new QueryClient()

// Loading fallback component
const PageLoader = () => (
  <div className="flex justify-center items-center h-64">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Загрузка...</p>
    </div>
  </div>
)

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Router>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Branches />} />
                <Route path="/selection" element={<SelectionPage />} />
                <Route path="/specialists" element={<SpecialistPage />} />
                <Route path="/specialists/:id" element={<SpecialistDetailsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/datetime" element={<DateTimePage />} />
                <Route path="/datetime-specialist" element={<SelectDateTimeSpecialist />} />
                <Route path="/booking-info" element={<BookingInfoPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App

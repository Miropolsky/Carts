import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { CartDetailsPage } from './routes/CartDetailsPage'
import { CartsListPage } from './routes/CartsListPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/carts" replace />} />
        <Route path="/carts" element={<CartsListPage />} />
        <Route path="/carts/:id" element={<CartDetailsPage />} />
      </Routes>
    </Layout>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import FoodFest from './pages/FoodFest'
import OrderBiriyani from './pages/OrderBiriyani'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/foodfest" replace />} />
            <Route path="/foodfest" element={<FoodFest />} />
            <Route path="/foodfest/orderbiriyani" element={<OrderBiriyani />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

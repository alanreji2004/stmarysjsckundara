import { Link } from 'react-router-dom'
import { Calendar, MapPin, Clock } from 'lucide-react'

export default function FoodFest() {
  const foodItems = [
    { name: 'Chicken Biriyani', price: '₹150', desc: 'Authentic dum biriyani cooked with fragrant basmati rice and tender chicken pieces.' },
    { name: 'Kappa & Fish Curry', price: '₹120', desc: 'Traditional Kerala style tapioca with spicy sardine fish curry.' },
    { name: 'Beef Roast', price: '₹140', desc: 'Slow-roasted beef with coconut slices and Kerala spices.' },
    { name: 'Pazhampori', price: '₹20', desc: 'Crispy and sweet Kerala style banana fritters.' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold tracking-wide">
            St Marys Youth Association
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Grand Food Fest
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Join us at St Marys JSC Kundara for a delightful evening of authentic Kerala delicacies prepared with love.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-gray-100">
          <div className="flex items-center space-x-3 text-gray-600">
            <Calendar className="w-5 h-5 text-primary-500" />
            <span className="font-medium">25 Dec 2026</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <Clock className="w-5 h-5 text-primary-500" />
            <span className="font-medium">5:00 PM Onwards</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <MapPin className="w-5 h-5 text-primary-500" />
            <span className="font-medium">St Marys JSC, Kundara</span>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Menu</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {foodItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:border-primary-200 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <span className="font-bold text-primary-600">{item.price}</span>
                </div>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <Link
            to="/foodfest/orderbiriyani"
            className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Order Biriyani in Advance
          </Link>
          <p className="text-center text-sm text-gray-400 mt-4">
            Pre-book to avoid waiting. Limited tokens available!
          </p>
        </div>

      </div>
    </div>
  )
}

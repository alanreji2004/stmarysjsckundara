import { Link } from 'react-router-dom'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function FoodFest() {
  const foodItems = [
    { name: 'Chicken Biriyani', price: '₹150', desc: 'Authentic dum biriyani cooked with fragrant basmati rice and tender chicken pieces.', highlight: true },
    { name: 'Kappa & Fish Curry', price: '₹120', desc: 'Traditional Kerala style tapioca with spicy sardine fish curry.' },
    { name: 'Beef Roast', price: '₹140', desc: 'Slow-roasted beef with coconut slices and Kerala spices.' },
    { name: 'Pazhampori', price: '₹20', desc: 'Crispy and sweet Kerala style banana fritters.' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-10 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100">
        
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold tracking-wide">
            St Marys Youth Association
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Grand Food Fest
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Join us at St Marys JSC Kundara for a delightful evening of authentic Kerala delicacies prepared with love.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 py-6 border-y border-gray-100">
          <div className="flex items-center space-x-3 text-gray-600">
            <Calendar className="w-5 h-5 text-primary-500" />
            <span className="font-medium">25 Dec 2026</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300" />
          <div className="flex items-center space-x-3 text-gray-600">
            <Clock className="w-5 h-5 text-primary-500" />
            <span className="font-medium">5:00 PM Onwards</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300" />
          <div className="flex items-center space-x-3 text-gray-600">
            <MapPin className="w-5 h-5 text-primary-500" />
            <span className="font-medium">St Marys JSC, Kundara</span>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center sm:text-left">Featured Menu</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {foodItems.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col p-5 rounded-2xl transition-all ${
                  item.highlight 
                    ? 'border-2 border-primary-500 bg-primary-50/30 shadow-md hover:shadow-lg' 
                    : 'border border-gray-100 bg-gray-50 hover:border-primary-200'
                }`}
              >
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`text-xl font-bold ${item.highlight ? 'text-primary-800' : 'text-gray-900'}`}>{item.name}</h3>
                      <span className="font-bold text-primary-600 text-lg bg-white px-3 py-1 rounded-full shadow-sm">{item.price}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${item.highlight ? 'text-primary-800/70 mb-5' : 'text-gray-500'}`}>{item.desc}</p>
                  </div>
                  
                  {item.highlight && (
                    <div className="mt-2 text-right">
                      <Link
                        to="/foodfest/orderbiriyani"
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        Order Now <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

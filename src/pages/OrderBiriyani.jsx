import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Loader2, Utensils } from 'lucide-react'
import { supabase } from '../services/supabase'

export default function OrderBiriyani() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    whatsapp: '',
    biriyani_count: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderNumber, setOrderNumber] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!formData.name || !formData.address || !formData.whatsapp || !formData.biriyani_count) {
        throw new Error('Please fill all required fields.')
      }

      if (parseInt(formData.biriyani_count) < 1) {
        throw new Error('Please enter a valid count.')
      }

      const { data, error: supabaseError } = await supabase
        .from('orders')
        .insert([
          {
            name: formData.name,
            address: formData.address,
            whatsapp: formData.whatsapp,
            biriyani_count: parseInt(formData.biriyani_count)
          }
        ])
        .select('id')
        .single()

      if (supabaseError) throw supabaseError

      if (data && data.id) {
        setOrderNumber(data.id)
      }

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderNumber) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Order Confirmed!</h2>
            <p className="text-gray-500 text-lg">Your pre-booking has been recorded.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-inner">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Your Order Number</p>
            <p className="text-6xl font-black text-primary-600">#{orderNumber}</p>
          </div>
          <Link
            to="/foodfest"
            className="inline-block pt-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            Return to Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100">
        
        <div className="flex items-center space-x-4 mb-4">
          <Link to="/foodfest" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
              <Utensils className="w-7 h-7 text-primary-500" />
              Order Biriyani
            </h1>
          </div>
        </div>
        
        <p className="text-gray-500 text-base leading-relaxed">
          Fill in your details below to lock in your order. We'll keep it ready for you!
        </p>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 flex items-center">
            <div className="flex-1">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7 mt-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-bold text-gray-800">
              Name <span className="font-normal text-gray-500 ml-1">(പേര്)</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="input-field shadow-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-bold text-gray-800">
              Address <span className="font-normal text-gray-500 ml-1">(വിലാസം)</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              rows="3"
              className="input-field shadow-sm resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div className="space-y-2">
              <label htmlFor="whatsapp" className="block text-sm font-bold text-gray-800">
                WhatsApp Number <span className="font-normal text-gray-500 ml-1">(വാട്സ്ആപ്പ് നമ്പർ)</span>
              </label>
              <input
                id="whatsapp"
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+91"
                className="input-field shadow-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="biriyani_count" className="block text-sm font-bold text-gray-800">
                Biriyani Count <span className="font-normal text-gray-500 ml-1">(ബിരിയാണിയുടെ എണ്ണം)</span>
              </label>
              <input
                id="biriyani_count"
                type="number"
                name="biriyani_count"
                value={formData.biriyani_count}
                onChange={handleChange}
                min="1"
                max="50"
                placeholder="How many?"
                className="input-field shadow-sm"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-3 px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-md active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Confirm Order</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

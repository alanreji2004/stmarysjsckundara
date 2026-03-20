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
  const [tokenNumber, setTokenNumber] = useState(null)
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
        setTokenNumber(data.id)
      }

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (tokenNumber) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Order Confirmed!</h2>
            <p className="text-gray-500">Your pre-booking has been successfully recorded.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Your Token Number</p>
            <p className="text-5xl font-black text-primary-600">#{tokenNumber}</p>
          </div>
          <Link
            to="/foodfest"
            className="inline-block mt-4 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100">
        
        <div className="flex items-center space-x-4 mb-2">
          <Link to="/foodfest" className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Utensils className="w-6 h-6 text-primary-500" />
              Order Biriyani
            </h1>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm">
          Fill in your details below to lock in your order. We'll keep it ready for you!
        </p>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="input-field"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Address / Location</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              rows="3"
              className="input-field resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700">WhatsApp Number</label>
              <input
                id="whatsapp"
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+91"
                className="input-field"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="biriyani_count" className="block text-sm font-semibold text-gray-700">Quantity</label>
              <input
                id="biriyani_count"
                type="number"
                name="biriyani_count"
                value={formData.biriyani_count}
                onChange={handleChange}
                min="1"
                max="50"
                placeholder="How many?"
                className="input-field"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Confirming Order...</span>
              </>
            ) : (
              <span>Confirm & Generate Token</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

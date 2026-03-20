import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Loader2, Utensils, Share2 } from 'lucide-react'
import { supabase } from '../services/supabase'
import * as htmlToImage from 'html-to-image'

const BIRIYANI_PRICE = 150

export default function OrderBiriyani() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    whatsapp: '',
    biriyani_count: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedOrder, setSubmittedOrder] = useState(null)
  const [error, setError] = useState('')
  const [isSharing, setIsSharing] = useState(false)
  
  const ticketRef = useRef(null)

  const totalCost = (parseInt(formData.biriyani_count) || 0) * BIRIYANI_PRICE

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleShare = async () => {
    if (!ticketRef.current) return
    setIsSharing(true)
    
    try {
      // Small pause to let DOM paint completely before capture
      await new Promise(resolve => setTimeout(resolve, 150))
      
      const dataUrl = await htmlToImage.toPng(ticketRef.current, { 
        quality: 1, 
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      })
      
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], `Order_${submittedOrder.id}.png`, { type: 'image/png' })

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Food Fest Order Confirmation',
          text: `My order #${submittedOrder.id} is confirmed for the St Marys Food Fest!`,
          files: [file]
        })
      } else {
        const link = document.createElement('a')
        link.download = `Order_${submittedOrder.id}.png`
        link.href = dataUrl
        link.click()
      }
    } catch (err) {
      console.error('Failed to generate image', err)
      alert("Failed to share the ticket. Please try taking a screenshot or try again.")
    } finally {
      setIsSharing(false)
    }
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
        setSubmittedOrder({
          id: data.id,
          name: formData.name,
          address: formData.address,
          count: parseInt(formData.biriyani_count)
        })
      }

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submittedOrder) {
    const finalCost = submittedOrder.count * BIRIYANI_PRICE
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        
        {/* Shareable Document Area */}
        <div 
          ref={ticketRef} 
          className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100 text-center space-y-6 animate-fade-in relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-primary-500" />
          
          <div className="pt-2 pb-4 border-b border-gray-100 mb-2">
            <h1 className="text-xl font-black text-gray-900 tracking-tight">St Marys JSC Kundara</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Food Fest by St Marys Youth Association</p>
          </div>
          
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-2 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Order Confirmed!</h2>
          </div>
          
          <div className="bg-primary-50 py-8 px-6 rounded-2xl border border-primary-100 shadow-inner">
            <p className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-1">Order Number</p>
            <p className="text-6xl font-black text-primary-700">#{submittedOrder.id}</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-left space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Customer Name</p>
              <p className="text-gray-900 font-bold text-lg">{submittedOrder.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Address</p>
              <p className="text-gray-700 font-medium">{submittedOrder.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Biriyani Count</p>
                <p className="text-gray-900 font-bold text-[1.05rem]">{submittedOrder.count}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Cost</p>
              <p className="text-2xl font-black text-gray-900">₹{finalCost}</p>
            </div>
          </div>
        </div>

        {/* User Interactive Buttons (Excluded from Image Capture) */}
        <div className="max-w-md w-full mt-6 space-y-3 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-md active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isSharing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Generating Ticket...</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5 mr-1" />
                <span>Share</span>
              </>
            )}
          </button>

          <Link
            to="/foodfest"
            className="inline-flex w-full items-center justify-center px-6 py-4 border border-gray-200 text-base font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-sm active:scale-[0.98]"
          >
            Return to Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
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
              <label htmlFor="biriyani_count" className="flex justify-between items-center text-sm font-bold text-gray-800">
                <span>Biriyani Count <span className="font-normal text-gray-500 ml-1">(ബിരിയാണിയുടെ എണ്ണം)</span></span>
              </label>
              <div className="relative">
                <input
                  id="biriyani_count"
                  type="number"
                  name="biriyani_count"
                  value={formData.biriyani_count}
                  onChange={handleChange}
                  min="1"
                  max="50"
                  placeholder="How many?"
                  className="input-field shadow-sm pr-20"
                  required
                />
                <div className="absolute right-0 top-0 bottom-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-gray-400 text-sm font-medium">x ₹{BIRIYANI_PRICE}</span>
                </div>
              </div>
            </div>
          </div>

          {totalCost > 0 && (
            <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 flex justify-between items-center animate-fade-in">
              <span className="text-primary-800 font-semibold">ആകെ തുക (Total Cost)</span>
              <span className="text-primary-700 font-black text-xl">₹{totalCost}</span>
            </div>
          )}

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
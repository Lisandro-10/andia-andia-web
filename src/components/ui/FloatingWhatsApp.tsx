'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

interface FloatingWhatsAppProps {
  phoneNumber: string
  message?: string
}

export function FloatingWhatsApp({ 
  phoneNumber, 
  message = 'Hola! Me interesa consultar sobre...' 
}: FloatingWhatsAppProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Button */}
      <div className="relative">       
        {/* Main button */}
        <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
          <MessageCircle 
            className="w-7 h-7 sm:w-8 sm:h-8 text-white" 
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Tooltip - hidden on mobile, shown on hover on desktop */}
      <div className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        ¿Necesitas ayuda?
        {/* Arrow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
          <div className="border-8 border-transparent border-l-gray-800" />
        </div>
      </div>
    </Link>
  )
}
'use client'

import { useState } from 'react'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(e.currentTarget)
    const FORM_KEY = process.env.FORMSUBMIT_KEY;

    try {
      const response = await fetch(`https://formsubmit.co/${FORM_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.get('nombre'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        e.currentTarget.reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-gray-darker py-16 md:py-20 lg:py-24">
      <div className="section-container max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-12">
            ¡Hablemos de tu proyecto! Contacta con nuestro equipo.
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label
              htmlFor="nombre"
              className="md:w-1/3 text-primary md:text-lg font-medium"
            >
              Nombre
            </label>
            <div className="md:w-2/3">
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                required
                className="w-full px-4 py-2 border-b-2 border-gray-dark bg-gray-darker text-white focus:outline-none focus:border-primary-dark transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label
              htmlFor="email"
              className="md:w-1/3 text-primary md:text-lg font-medium"
            >
              Correo
            </label>
            <div className="md:w-2/3">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu email"
                required
                className="w-full px-4 py-2 border-b-2 border-gray-dark bg-gray-darker text-white focus:outline-none focus:border-primary-dark transition-colors"
              />
            </div>
          </div>

          {/* Mensaje */}
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <label
              htmlFor="message"
              className="md:w-1/3 text-primary md:text-lg font-medium md:pt-2"
            >
              Descripción
            </label>
            <div className="md:w-2/3">
              <textarea
                id="message"
                name="message"
                placeholder="Tu consulta"
                required
                rows={5}
                className="w-full px-4 py-2 border-b-2 border-gray-dark bg-gray-darker text-white focus:outline-none focus:border-primary-dark transition-colors resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/3" />
            <div className="md:w-2/3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-gray-darker hover:bg-primary-light text-white border-2 border-primary-light px-8 py-3 rounded-full transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <p className="mt-4 text-green-400">
                  ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="mt-4 text-red-400">
                  Hubo un error al enviar el mensaje. Por favor intenta
                  nuevamente.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
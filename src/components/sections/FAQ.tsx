const faqs = [
  {
    question: '¿Qué servicios ofrece el Estudio Andia Andia?',
    answer:
      'Ofrecemos dirección de obra, construcción, estudio y asesoramiento en eficiencia energética y aquitectura bioclimática para viviendas unifamiliares, complejos residenciales y desarrollos inmobiliarios en Mendoza.',
  },
  {
    question: '¿Cuánto tiempo lleva el diseño de una vivienda?',
    answer:
      'El tiempo varía según la complejidad del proyecto. En general, la etapa de diseño y proyecto ejecutivo de una vivienda unifamiliar toma entre 2 y 4 meses. Consultanos para una estimación personalizada.',
  },
  {
    question: '¿En qué zonas de Mendoza trabajan?',
    answer:
      'Trabajamos en toda la provincia de Mendoza, con especial presencia en Guaymallén, Capital, Godoy Cruz, Las Heras y Luján de Cuyo.',
  },
  {
    question: '¿Cómo inicio el proceso con el estudio?',
    answer:
      'El primer paso es una consulta inicial donde evaluamos tu proyecto, necesidades y presupuesto. Podés contactarnos por WhatsApp o completar el formulario de contacto para coordinar una reunión sin cargo.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-12 md:py-20 lg:py-24">
      <div className="section-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-heading">Preguntas Frecuentes</h2>
        </div>

        <dl className="max-w-3xl mx-auto divide-y divide-gray-dark/20">
          {faqs.map((faq, index) => (
            <div key={index} className="py-8">
              <dt className="text-white text-base md:text-lg font-normal mb-3">
                {faq.question}
              </dt>
              <dd className="text-gray-light text-sm md:text-base leading-relaxed">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

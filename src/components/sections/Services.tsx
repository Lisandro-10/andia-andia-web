import { Lightbulb, Home, Hammer, Network } from 'lucide-react'

const services = [
  {
    icon: Lightbulb,
    title: 'Creación',
    items: ['Relevamiento', 'Concepto', 'Croquis / Idea'],
  },
  {
    icon: Home,
    title: 'Materialización',
    items: ['Diseño', 'Proyecto', 'Ingeniería'],
  },
  {
    icon: Hammer,
    title: 'Evaluación',
    items: ['Técnica', 'Económica', 'Eficiencia Energética'],
  },
  {
    icon: Network,
    title: 'Ejecución',
    items: ['Dirección', 'Administración', 'Construcción'],
  },
]

export function Services() {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-heading">Nuestros Servicios</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group text-center px-4 py-8 md:py-12 transition-all duration-300 hover:transform hover:-translate-x-4"
            >
              {/* Icon */}
              <div className="mb-6">
                <service.icon
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto text-orange transition-transform duration-300 group-hover:transform group-hover:-translate-x-4"
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h4 className="text-xl md:text-2xl font-normal mb-6">
                {service.title}
              </h4>

              {/* Items List */}
              <ul className="space-y-3 lg:opacity-0 lg:group-hover:opacity-85 lg:transition-opacity lg:duration-700 border-t-2 border-b-2 border-primary py-4">
                {service.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-base md:text-lg font-normal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
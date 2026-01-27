import { Shirt, Home, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: 'Ethnic Wear',
    description: 'Premium embroidery for Sherwani, Indo-sherwani, and Bandi with intricate traditional designs.',
    items: ['Sherwani', 'Indo-Sherwani', 'Bandi', 'Traditional Jackets'],
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Shirt,
    title: 'Casual Wear',
    description: 'Custom logo and design embroidery for everyday fashion and casual garments.',
    items: ['T-Shirts', 'Jeans', 'Shirts', 'Jackets'],
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Home,
    title: 'Home Décor',
    description: 'Elegant embroidery for home textiles and decorative items.',
    items: ['Curtains', 'Cushion Covers', 'Table Runners', 'Fabric Items'],
    color: 'from-red-500 to-rose-500'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert craftsmanship across a wide range of embroidery services tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              style={{
                animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
              <div className="p-8">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-amber-50 rounded-2xl p-8 border-2 border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Embroidery Techniques We Use</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Hand Embroidery', 'Machine Embroidery', 'Stone & Sequin Work', 'Digital Design'].map((technique) => (
                <span
                  key={technique}
                  className="px-6 py-2 bg-white rounded-full text-gray-700 font-medium shadow-sm"
                >
                  {technique}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890?text=Hi, I would like to inquire about custom embroidery services', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:artisan@embroidery.com?subject=Custom Embroidery Inquiry';
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to bring your embroidery vision to life? Contact us today and let's create something beautiful together
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ animation: 'fade-in-left 0.6s ease-out' }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">WhatsApp</h3>
            <p className="text-gray-600 mb-6">
              Chat with us directly on WhatsApp. Share your design ideas, upload reference images, and get instant responses.
            </p>
            <button
              onClick={handleWhatsApp}
              className="w-full px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Chat on WhatsApp
            </button>
          </div>

          <div
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ animation: 'fade-in-right 0.6s ease-out' }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Email</h3>
            <p className="text-gray-600 mb-6">
              Send us detailed requirements via email. Attach design references and get a comprehensive quote within 24 hours.
            </p>
            <button
              onClick={handleEmail}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Send Email
            </button>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                <p className="text-gray-600">+1 (234) 567-8900</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                <p className="text-gray-600">Serving Nationwide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            Working Hours: Monday - Saturday, 9:00 AM - 7:00 PM
          </p>
        </div>
      </div>
    </section>
  );
}

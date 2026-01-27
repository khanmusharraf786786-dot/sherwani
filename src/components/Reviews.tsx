import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const reviews = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Wedding Client',
    rating: 5,
    text: 'The embroidery work on my wedding sherwani was absolutely stunning! The attention to detail and craftsmanship exceeded all my expectations. Highly recommended!',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Fashion Designer',
    rating: 5,
    text: 'I have been working with them for my boutique for over a year. Their quality is consistent and the custom designs they create are always exactly what I envision.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Corporate Client',
    rating: 5,
    text: 'Got our company logo embroidered on 100+ shirts. The precision and quality were remarkable. They delivered on time and the communication was excellent throughout.',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'Home Décor Enthusiast',
    rating: 5,
    text: 'The embroidered curtains transformed my living room! The intricate patterns and color coordination were perfect. True artisans at work.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Groom',
    rating: 5,
    text: 'My Indo-sherwani was the highlight of my wedding! Everyone complimented the beautiful embroidery. Thank you for making my special day even more memorable.',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <Quote className="w-12 h-12 text-amber-600 mb-6" />

            <div className="mb-6">
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                {reviews[currentIndex].text}
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={reviews[currentIndex].image}
                  alt={reviews[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{reviews[currentIndex].name}</h4>
                  <p className="text-gray-600">{reviews[currentIndex].role}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-amber-600 text-gray-900 hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-amber-600 text-gray-900 hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-amber-600' : 'w-2 bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 text-white">
            <div>
              <div className="text-4xl font-bold text-amber-400">500+</div>
              <div className="text-gray-300">Happy Clients</div>
            </div>
            <div className="h-16 w-px bg-gray-700"></div>
            <div>
              <div className="text-4xl font-bold text-amber-400">1000+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div className="h-16 w-px bg-gray-700"></div>
            <div>
              <div className="text-4xl font-bold text-amber-400">15+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

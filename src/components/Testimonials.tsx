export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      content: "The aloe vera products are incredible! My skin has never felt so smooth and healthy. NF Plantation truly delivers on quality.",
      author: "Priya Perera",
      location: "Colombo",
      rating: 5
    },
    {
      id: 2,
      content: "Fast delivery to Kandy and the wooden furniture is beautifully crafted. The honey is pure and delicious too!",
      author: "Ravi Silva",
      location: "Kandy",
      rating: 5
    },
    {
      id: 3,
      content: "I love the herbal tea collection! Perfect for relaxing evenings. The organic quality is exactly what I was looking for.",
      author: "Malini Fernando",
      location: "Galle",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-[var(--secondary-green)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 font-primary">
            What Our Clients Say
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-secondary">
            Real reviews from our valued customers across Sri Lanka
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex text-[var(--neutral-brown)] mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <p className="text-[var(--text-secondary)] mb-6 italic font-secondary leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--primary-green)] rounded-full flex items-center justify-center text-white font-semibold font-secondary">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-[var(--text-primary)] font-secondary">{testimonial.author}</p>
                  <p className="text-sm text-[var(--text-secondary)] font-secondary">{testimonial.location}, Sri Lanka</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
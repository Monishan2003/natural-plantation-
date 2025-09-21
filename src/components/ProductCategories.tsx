import { Shield, Package, Leaf, Star, Heart, Truck } from 'lucide-react';

export function ProductCategories() {
  const categories = [
    {
      icon: <Star className="h-12 w-12 text-[var(--primary-green)]" />,
      title: "Premium Quality",
      description: "Carefully selected natural products with the highest quality standards for your wellness",
      bgColor: "bg-[var(--secondary-green)]"
    },
    {
      icon: <Shield className="h-12 w-12 text-[var(--primary-green)]" />,
      title: "Safe & Secure",
      description: "Eco-friendly packaging that preserves freshness while protecting our environment",
      bgColor: "bg-[var(--background-light)]"
    },
    {
      icon: <Heart className="h-12 w-12 text-[var(--primary-green)]" />,
      title: "Customer Care",
      description: "Dedicated support team ensuring your satisfaction with every natural product experience",
      bgColor: "bg-[var(--secondary-green)]"
    },
    {
      icon: <Leaf className="h-12 w-12 text-[var(--primary-green)]" />,
      title: "100% Natural",
      description: "Pure, organic ingredients sourced directly from nature without any artificial additives",
      bgColor: "bg-[var(--background-light)]"
    },
    {
      icon: <Truck className="h-12 w-12 text-[var(--primary-green)]" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to bring nature's goodness directly to your doorstep",
      bgColor: "bg-[var(--secondary-green)]"
    },
    {
      icon: <Package className="h-12 w-12 text-[var(--primary-green)]" />,
      title: "Sustainable",
      description: "Environmentally responsible practices in every step of our product lifecycle",
      bgColor: "bg-[var(--background-light)]"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 font-primary">
            Explore Our Natural Range
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto font-secondary leading-relaxed">
            Discover the power of nature with our carefully curated collection of premium organic products, 
            designed to enhance your natural lifestyle and well-being.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.bgColor} rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-[var(--border)]`}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-white rounded-full p-4 shadow-md">
                  {category.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)] font-secondary">{category.title}</h3>
              <p className="text-[var(--text-secondary)] font-secondary leading-relaxed">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
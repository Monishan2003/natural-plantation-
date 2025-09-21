import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Leaf, Heart, Shield, Award } from 'lucide-react';

export function About() {
  return (
    <div className="pt-8 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
              About Natural Plantation
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-6 font-secondary">
              Founded with a passion for sustainable agriculture and organic living, Natural Plantation has been 
              Sri Lanka's trusted source for premium organic products since our establishment.
            </p>
            <p className="text-lg text-[var(--text-secondary)] font-secondary">
              We believe in nurturing both the earth and our community through responsible farming practices, 
              fair trade partnerships, and a commitment to providing the highest quality natural products.
            </p>
          </div>
          <div className="relative">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1622123651884-e3d30eebfbff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybWluZyUyMHBsYW50YXRpb24lMjB3b3JrZXJzfGVufDF8fHx8MTc1ODI4NzE5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Organic farming workers in plantation"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-[var(--secondary-green)] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
            Our Mission & Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-[var(--text-secondary)] font-secondary">
                Committed to environmentally responsible farming practices that preserve our planet for future generations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-[var(--text-secondary)] font-secondary">
                Supporting local farmers and communities through fair trade partnerships and sustainable livelihoods.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-[var(--text-secondary)] font-secondary">
                Ensuring the highest standards of organic certification and product quality in everything we offer.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-[var(--text-secondary)] font-secondary">
                Striving for excellence in customer service, product innovation, and sustainable business practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1755253944160-c952443703b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGFncmljdWx0dXJlJTIwZmFybXxlbnwxfHx8fDE3NTgyODcxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Sustainable agriculture farm"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              Our Story
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-6 font-secondary">
              What began as a small family farm in Kilinochchi has grown into Sri Lanka's leading organic 
              plantation company. Our journey started with a simple belief: that nature provides the best 
              ingredients for healthy living.
            </p>
            <p className="text-lg text-[var(--text-secondary)] mb-6 font-secondary">
              Over the years, we've expanded our operations to include aloe vera cultivation, sustainable 
              wood furniture manufacturing, and a comprehensive range of organic health products, all while 
              maintaining our commitment to environmental stewardship.
            </p>
            <p className="text-lg text-[var(--text-secondary)] font-secondary">
              Today, Natural Plantation serves customers across Sri Lanka and beyond, bringing the purest 
              gifts of nature directly to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-[var(--background-light)] py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-[var(--primary-green)] mb-2">500+</h3>
              <p className="text-[var(--text-secondary)] font-secondary">Organic Products</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[var(--primary-green)] mb-2">10,000+</h3>
              <p className="text-[var(--text-secondary)] font-secondary">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[var(--primary-green)] mb-2">50+</h3>
              <p className="text-[var(--text-secondary)] font-secondary">Partner Farms</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[var(--primary-green)] mb-2">100%</h3>
              <p className="text-[var(--text-secondary)] font-secondary">Organic Certified</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import { Button } from "./ui/button";

export function TrustSection() {
  return (
    <section className="py-20 bg-[var(--background-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <img 
              src="https://farmrise.bayer.com/webp_images/aloe-vera-farming_24865_1677490303.webp"
              alt="Fresh green plants"
              className="rounded-2xl shadow-xl w-full h-96 object-cover"
            />
          </div>
          
          {/* Right side - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 font-primary">
              Rooted in Nature, Trusted by Thousands!
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-6 font-secondary leading-relaxed">
              At NF Plantation, we believe in the power of nature to heal, nourish, and sustain. 
              Our commitment to organic farming and sustainable practices has earned the trust of 
              customers across Sri Lanka and beyond.
            </p>
            <p className="text-lg text-[var(--text-secondary)] mb-8 font-secondary leading-relaxed">
              From our farms in Kilinochchi to your home, every product carries our promise of 
              purity, quality, and environmental responsibility. Join our growing community of 
              nature enthusiasts today.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--primary-green)] mb-2 font-secondary">5000+</div>
                <div className="text-sm text-[var(--text-secondary)] font-secondary">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--primary-green)] mb-2 font-secondary">100%</div>
                <div className="text-sm text-[var(--text-secondary)] font-secondary">Natural Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--primary-green)] mb-2 font-secondary">24/7</div>
                <div className="text-sm text-[var(--text-secondary)] font-secondary">Support</div>
              </div>
            </div>
            
            <Button className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-white px-8 py-4 font-secondary text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
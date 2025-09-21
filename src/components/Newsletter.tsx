import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Newsletter() {
  return (
    <section className="py-20 bg-[var(--primary-green)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-primary">
            Stay Connected with Nature
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto font-secondary leading-relaxed">
            Subscribe to our newsletter for the latest updates on new organic products, special offers, 
            sustainable living tips, and exclusive deals from NF Plantation.
          </p>
          
          <div className="max-w-lg mx-auto flex gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 bg-white border-0 text-[var(--text-primary)] placeholder-[var(--text-secondary)] py-3 font-secondary"
            />
            <Button className="bg-[var(--accent-red)] hover:bg-[var(--accent-red)]/90 text-white px-8 py-3 font-secondary">
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm text-white/80 mt-6 font-secondary">
            By subscribing, you agree to our Privacy Policy and Terms of Service. 
            We respect your privacy and never share your information.
          </p>
        </div>
      </div>
    </section>
  );
}
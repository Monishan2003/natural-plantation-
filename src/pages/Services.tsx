import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Truck, Users, Leaf, Zap, Phone, Calendar, CheckCircle } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Truck,
      title: "Home Delivery",
      description: "Fast and reliable delivery of fresh organic products directly to your doorstep across Sri Lanka.",
      features: ["Same-day delivery in Colombo", "Island-wide delivery", "Temperature-controlled transport", "Eco-friendly packaging"],
      price: "Free delivery on orders over LKR 5,000"
    },
    {
      icon: Users,
      title: "Organic Farming Consultation",
      description: "Expert guidance for farmers transitioning to organic agriculture and sustainable farming practices.",
      features: ["Soil analysis and testing", "Crop planning assistance", "Organic certification support", "Training workshops"],
      price: "Starting from LKR 15,000"
    },
    {
      icon: Leaf,
      title: "Custom Product Sourcing",
      description: "Specialized sourcing of rare organic products and bulk orders for businesses and institutions.",
      features: ["Bulk order discounts", "Custom packaging", "Quality guarantees", "Seasonal product planning"],
      price: "Contact for pricing"
    },
    {
      icon: Zap,
      title: "Subscription Services",
      description: "Regular delivery of your favorite organic products with flexible subscription plans.",
      features: ["Weekly, bi-weekly, or monthly delivery", "Customizable product selection", "Easy plan modifications", "Subscriber exclusive discounts"],
      price: "Save up to 15% with subscriptions"
    }
  ];

  return (
    <div className="pt-8 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Our Services
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-secondary max-w-2xl mx-auto">
            Beyond providing premium organic products, we offer comprehensive services to support 
            your journey towards sustainable living and organic farming.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-[var(--border)] hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--primary-green)] rounded-lg flex items-center justify-center mr-4">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="font-secondary">{service.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-[var(--text-secondary)] font-secondary">
                      <CheckCircle className="h-4 w-4 text-[var(--primary-green)] mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--primary-green)]">{service.price}</span>
                  <Button className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Service Features */}
      <section className="bg-[var(--secondary-green)] py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
                Why Choose Our Services?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary-green)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Expert Knowledge</h4>
                    <p className="text-[var(--text-secondary)] font-secondary">
                      Our team has decades of experience in organic farming and sustainable agriculture.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary-green)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Personalized Solutions</h4>
                    <p className="text-[var(--text-secondary)] font-secondary">
                      Every service is tailored to meet your specific needs and requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary-green)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Quality Guarantee</h4>
                    <p className="text-[var(--text-secondary)] font-secondary">
                      We stand behind all our services with a satisfaction guarantee.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-[var(--primary-green)] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Ongoing Support</h4>
                    <p className="text-[var(--text-secondary)] font-secondary">
                      Our relationship doesn't end with delivery - we provide continuous support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1744726010540-bf318d4a691f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdWx0YXRpb24lMjBtZWV0aW5nJTIwb3JnYW5pYyUyMGZhcm1pbmd8ZW58MXx8fHwxNzU4Mjg3MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Consultation meeting organic farming"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center bg-[var(--background-light)] rounded-lg p-12">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-secondary mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our services and how we can help you achieve 
            your organic farming or healthy living goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90">
              <Phone className="h-4 w-4 mr-2" />
              Call +94 74 268 4140
            </Button>
            <Button variant="outline" className="border-[var(--primary-green)] text-[var(--primary-green)] hover:bg-[var(--primary-green)] hover:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
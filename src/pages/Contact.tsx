import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-8 pb-16">
      {/* Header */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-secondary max-w-2xl mx-auto">
            Get in touch with us for any questions about our products, services, or to start your 
            journey towards organic living. We're here to help!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="border-[var(--border)]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 text-[var(--primary-green)] mr-2" />
                    Visit Our Farm
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text-secondary)] font-secondary">
                    99JG+4Q9 Karadipok<br />
                    Kilinochchi, Sri Lanka
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[var(--border)]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 text-[var(--primary-green)] mr-2" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text-secondary)] font-secondary">
                    +94 74 268 4140<br />
                    Available 7 days a week
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[var(--border)]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 text-[var(--primary-green)] mr-2" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text-secondary)] font-secondary">
                    info@naturalplantation.lk<br />
                    orders@naturalplantation.lk
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[var(--border)]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 text-[var(--primary-green)] mr-2" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-[var(--text-secondary)] font-secondary space-y-1">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-[var(--border)]">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription className="font-secondary">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-[var(--input-background)] border-[var(--border)]"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-[var(--input-background)] border-[var(--border)]"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-[var(--input-background)] border-[var(--border)]"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-[var(--input-background)] border-[var(--border)]"
                        placeholder="What is this about?"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-[var(--input-background)] border-[var(--border)] min-h-[120px]"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="border-[var(--border)]">
            <CardHeader>
              <CardTitle>Find Us on the Map</CardTitle>
              <CardDescription className="font-secondary">
                Visit our plantation and experience organic farming firsthand.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96 bg-[var(--background-light)] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-[var(--primary-green)] mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    Interactive Map
                  </h4>
                  <p className="text-[var(--text-secondary)] font-secondary">
                    Map integration would be implemented here<br />
                    showing our location in Kilinochchi, Sri Lanka
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-[var(--border)]">
              <CardHeader>
                <CardTitle className="text-lg">What are your delivery areas?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)] font-secondary">
                  We deliver island-wide across Sri Lanka. Same-day delivery is available in Colombo and surrounding areas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border)]">
              <CardHeader>
                <CardTitle className="text-lg">Are all your products organic certified?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)] font-secondary">
                  Yes, all our products are certified organic and meet international organic standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border)]">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer bulk discounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)] font-secondary">
                  Yes, we offer special pricing for bulk orders and institutional customers. Contact us for details.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[var(--border)]">
              <CardHeader>
                <CardTitle className="text-lg">Can I visit your plantation?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)] font-secondary">
                  Absolutely! We offer guided tours of our plantation. Please call ahead to schedule your visit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
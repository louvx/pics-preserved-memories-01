import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
const Testimonials = () => {
  const testimonials = [{
    name: "Sarah Johnson",
    location: "New York, NY",
    text: "I thought my grandmother's wedding photo was beyond repair after the flood. Restore.pics brought it back to life! The attention to detail was incredible.",
    rating: 5,
    service: "Premium Human Restoration"
  }, {
    name: "Michael Chen",
    location: "San Francisco, CA",
    text: "The AI restoration was amazing for the price. Got 5 family photos restored quickly and they look fantastic. Will definitely use again!",
    rating: 5,
    service: "5 Photo AI Package"
  }, {
    name: "Emily Rodriguez",
    location: "Austin, TX",
    text: "Fast, affordable, and great quality. The single photo restoration exceeded my expectations for such a reasonable price.",
    rating: 5,
    service: "1 Photo AI Restoration"
  }, {
    name: "David Thompson",
    location: "Boston, MA",
    text: "The premium service was worth every penny. They reconstructed missing parts of an old family portrait that I thought was impossible to fix.",
    rating: 5,
    service: "Premium Human Restoration"
  }, {
    name: "Lisa Park",
    location: "Seattle, WA",
    text: "Professional service from start to finish. The team communicated well and delivered exactly what they promised. Highly recommended!",
    rating: 5,
    service: "5 Photo AI Package"
  }, {
    name: "Robert Williams",
    location: "Miami, FL",
    text: "Incredible transformation of my father's military photos from WWII. The historical value of these memories has been preserved beautifully.",
    rating: 5,
    service: "Premium Human Restoration"
  }];
  const stats = [{
    number: "10,000+",
    label: "Photos Restored"
  }, {
    number: "4.9/5",
    label: "Average Rating"
  }, {
    number: "98%",
    label: "Customer Satisfaction"
  }, {
    number: "24hr",
    label: "Average Delivery"
  }];
  return <section id="testimonials" className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have trusted us with their precious memories.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>)}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-xl">★</span>)}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-sm text-blue-600 mt-1">{testimonial.service}</p>
                </div>
              </CardContent>
            </Card>)}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">Ready to restore your precious memories?</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors" onClick={() => document.getElementById('services')?.scrollIntoView({
          behavior: 'smooth'
        })}>
            Get Started Today
          </button>
        </div>
      </div>
    </section>;
};
export default Testimonials;
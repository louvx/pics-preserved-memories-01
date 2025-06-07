import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const Services = () => {
  const services = [{
    title: "Restore 1 Foto (AI)",
    price: "$9.99",
    description: "Perfect for single photos with minor damage",
    features: ["AI-powered restoration", "Fixes scratches & fading", "Reduces noise & grain", "24-hour delivery", "High-resolution output"],
    popular: false,
    cta: "Upload Photo",
    ctaAction: () => console.log("Upload single photo")
  }, {
    title: "Restore 5 Foto (AI)",
    price: "$39.99",
    originalPrice: "$49.95",
    description: "Great value package for multiple photos",
    features: ["AI restoration for 5 photos", "All features from single restore", "Bulk processing discount", "48-hour delivery", "Priority support"],
    popular: true,
    cta: "Upload Photos",
    ctaAction: () => console.log("Upload multiple photos")
  }, {
    title: "Restore by Human (Premium)",
    price: "From $49",
    description: "Expert restoration for severely damaged photos",
    features: ["AI + Human expert touch", "Repairs tears & water damage", "Reconstructs missing details", "Color correction & enhancement", "Unlimited revisions"],
    popular: false,
    cta: "Request Quote",
    ctaAction: () => console.log("Request premium quote")
  }];
  return <section id="services" className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Perfect Plan for Every Memory</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From quick AI fixes to premium human expertise, we have the perfect solution for your photo restoration needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => <Card key={index} className={`relative ${service.popular ? 'border-blue-500 border-2 shadow-lg' : 'border-gray-200'} hover:shadow-xl transition-all duration-300`}>
              {service.popular && <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600">{service.price}</span>
                  {service.originalPrice && <span className="text-lg text-gray-400 line-through ml-2">{service.originalPrice}</span>}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>)}
                </ul>
              </CardContent>

              <CardFooter>
                <Button className={`w-full ${service.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'} text-white`} onClick={service.ctaAction}>
                  {service.cta}
                </Button>
              </CardFooter>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Services;
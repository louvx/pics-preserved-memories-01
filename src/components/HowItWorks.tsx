
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HowItWorks = () => {
  const steps = [{
    step: "1",
    title: "Upload Your Photo",
    description: "Securely upload your damaged photo through our platform. We accept all common formats and ensure your memories are handled with care.",
    icon: "📸"
  }, {
    step: "2",
    title: "AI Analysis & Processing",
    description: "Our advanced AI analyzes the damage and begins restoration. For premium service, our experts review and plan additional enhancements.",
    icon: "🤖"
  }, {
    step: "3",
    title: "Expert Enhancement",
    description: "For premium restorations, our skilled artists add the human touch, carefully reconstructing details and perfecting the restoration.",
    icon: "👨‍🎨"
  }, {
    step: "4",
    title: "Quality Check & Delivery",
    description: "Every restoration undergoes quality control before delivery. Receive your restored photo in high resolution, ready for printing or sharing.",
    icon: "✨"
  }];

  const packageProcesses = [{
    title: "AI Restoration Process",
    subtitle: "For 1 Photo & 5 Photo packages",
    steps: ["Upload", "AI Processing", "Quality Check", "Delivery"],
    timeline: "24-48 hours"
  }, {
    title: "Premium Human Process",
    subtitle: "For Restore by Human package",
    steps: ["Upload", "Expert Assessment", "AI + Human Work", "Review & Delivery"],
    timeline: "3-7 business days"
  }];

  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From upload to delivery, we make photo restoration simple and reliable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{step.icon}</div>
                <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {packageProcesses.map((process, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">{process.title}</CardTitle>
                <p className="text-gray-600">{process.subtitle}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  {process.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mb-2">
                        {stepIndex + 1}
                      </div>
                      <span className="text-sm text-gray-600">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-blue-600 font-semibold">{process.timeline}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Upload Your Photo",
      description: "Securely upload your damaged photo through our platform. We accept all common formats and ensure your memories are handled with care.",
      icon: "📸"
    },
    {
      step: "2",
      title: "AI Analysis & Processing",
      description: "Our advanced AI analyzes the damage and begins restoration. For premium service, our experts review and plan additional enhancements.",
      icon: "🤖"
    },
    {
      step: "3",
      title: "Expert Enhancement",
      description: "For premium restorations, our skilled artists add the human touch, carefully reconstructing details and perfecting the restoration.",
      icon: "👨‍🎨"
    },
    {
      step: "4",
      title: "Quality Check & Delivery",
      description: "Every restoration undergoes quality control before delivery. Receive your restored photo in high resolution, ready for printing or sharing.",
      icon: "✨"
    }
  ];

  const packageProcesses = [
    {
      title: "AI Restoration Process",
      subtitle: "For 1 Photo & 5 Photo packages",
      steps: ["Upload", "AI Processing", "Quality Check", "Delivery"],
      timeline: "24-48 hours"
    },
    {
      title: "Premium Human Process", 
      subtitle: "For Restore by Human package",
      steps: ["Upload", "Expert Assessment", "AI + Human Work", "Review & Delivery"],
      timeline: "3-7 business days"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures your precious memories are restored with the highest quality and care.
          </p>
        </div>

        {/* Main Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">{step.icon}</div>
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Package-Specific Processes */}
        <div className="grid md:grid-cols-2 gap-8">
          {packageProcesses.map((process, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{process.title}</h3>
              <p className="text-gray-600 mb-4">{process.subtitle}</p>
              
              <div className="flex justify-between items-center mb-4">
                {process.steps.map((step, stepIndex) => (
                  <React.Fragment key={stepIndex}>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mb-2">
                        {stepIndex + 1}
                      </div>
                      <p className="text-sm text-gray-700">{step}</p>
                    </div>
                    {stepIndex < process.steps.length - 1 && (
                      <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  ⏱️ {process.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

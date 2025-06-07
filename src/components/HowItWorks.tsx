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
  return;
};
export default HowItWorks;

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (credits: number, price: number) => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onPurchase }) => {
  const plans = [
    {
      id: 'starter',
      title: 'Starter',
      credits: 1,
      price: 10,
      pricePerPhoto: 10.00,
      popular: false
    },
    {
      id: 'creator',
      title: 'Creator Pack',
      credits: 10,
      price: 50,
      pricePerPhoto: 5.00,
      popular: true,
      savings: 'Save 50%'
    },
    {
      id: 'archive',
      title: 'Archive Pack',
      credits: 50,
      price: 150,
      pricePerPhoto: 3.00,
      popular: false,
      savings: 'Save 70%'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl mx-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900 mb-2">
            To download your photo in high resolution without the watermark, please choose a credit pack
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 gap-6 py-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-blue-500 border-2 shadow-lg' : 'border-gray-200'} hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-900">{plan.title}</CardTitle>
                <div className="mt-4">
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    {plan.credits} Credit{plan.credits > 1 ? 's' : ''}
                  </div>
                  <span className="text-3xl font-bold text-blue-600">${plan.price}</span>
                  <div className="text-sm text-gray-500 mt-1">
                    (${plan.pricePerPhoto.toFixed(2)} per photo)
                  </div>
                  {plan.savings && (
                    <div className="text-green-600 font-semibold mt-2">{plan.savings}</div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pb-6">
                <Button 
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'} text-white`}
                  onClick={() => onPurchase(plan.credits, plan.price)}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;

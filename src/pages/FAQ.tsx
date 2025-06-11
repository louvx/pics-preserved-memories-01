
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions (FAQ)
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've compiled answers to our most common questions. If you can't find your answer here, don't hesitate to contact us.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <Accordion type="single" collapsible className="w-full">
              {/* About the Service & Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Service & Features</h2>
                
                <AccordionItem value="damage-types">
                  <AccordionTrigger>What types of photo damage can you fix?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">Our AI is designed to repair a wide range of damage, including:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Scratches, tears, and creases</li>
                      <li>Stains, spots, and age-related noise</li>
                      <li>Faded or yellowed colors</li>
                      <li>Blurry or unfocused faces</li>
                    </ul>
                    <p className="mt-3">In many cases, our AI can even reconstruct severely damaged parts of a photo.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="colorization">
                  <AccordionTrigger>Can you colorize black & white photos?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. One of our core features is AI Colorization, which can transform your black & white photos into full color with natural-looking results.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="accuracy">
                  <AccordionTrigger>How accurate is the restoration?</AccordionTrigger>
                  <AccordionContent>
                    Our technology uses a state-of-the-art AI model to deliver highly accurate results while preserving the photo's original details. However, please note that AI makes artistic interpretations, especially for colorization. We encourage you to use your free credits to see the quality for yourself on your own photos.
                  </AccordionContent>
                </AccordionItem>
              </div>

              {/* Pricing & Credits */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing & Credits</h2>
                
                <AccordionItem value="free-credits">
                  <AccordionTrigger>How do the "free credits" work?</AccordionTrigger>
                  <AccordionContent>
                    When you sign up, you automatically receive 3 free credits. You can use these to restore 3 photos and see the full results. These free restorations will have a watermark. The goal is to let you try our service risk-free before you decide to buy.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="what-is-credit">
                  <AccordionTrigger>What is a credit and how does it work?</AccordionTrigger>
                  <AccordionContent>
                    A credit is the currency on our platform. 1 Credit is used to restore 1 photo and download the final result in high resolution without a watermark. By purchasing a credit pack, you can restore photos whenever you like.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="credits-expire">
                  <AccordionTrigger>Do my purchased credits expire?</AccordionTrigger>
                  <AccordionContent>
                    No. Your credits will never expire. You can use them whenever you're ready.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment-methods">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards (Visa, MasterCard), as well as various other digital payment methods.
                  </AccordionContent>
                </AccordionItem>
              </div>

              {/* Privacy & Security */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Security</h2>
                
                <AccordionItem value="copyright">
                  <AccordionTrigger>Who owns the copyright to the photos I upload and restore?</AccordionTrigger>
                  <AccordionContent>
                    You do. You retain 100% of the rights to both your original and restored photos. We will never claim ownership or use your photos without your explicit permission.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="photo-safety">
                  <AccordionTrigger>Are my photos safe on your platform?</AccordionTrigger>
                  <AccordionContent>
                    Yes. Your security and privacy are our top priorities. All uploaded photos are encrypted and stored on secure servers. Only you can access your photos.
                  </AccordionContent>
                </AccordionItem>
              </div>

              {/* Technical Questions */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Questions</h2>
                
                <AccordionItem value="file-formats">
                  <AccordionTrigger>What file formats do you support?</AccordionTrigger>
                  <AccordionContent>
                    We currently support the most common image file formats, including JPG, JPEG, and PNG.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="resolution">
                  <AccordionTrigger>What is the maximum resolution I can download?</AccordionTrigger>
                  <AccordionContent>
                    You can download your restored photos in up to 4K resolution, which is ideal for large prints and high-definition digital displays.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="satisfaction">
                  <AccordionTrigger>What if I'm not satisfied with the result?</AccordionTrigger>
                  <AccordionContent>
                    Due to the instant nature of our digital service, we do not offer refunds on used credits. This is why we strongly encourage you to use your free credits to ensure you are happy with the quality before making a purchase.
                  </AccordionContent>
                </AccordionItem>
              </div>
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;

import { useState } from 'react';
import { BookOpen, DollarSign, Download, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { PaymentModal } from './PaymentModal';
import { ebookApi } from '../utils/api';
import { toast } from 'sonner@2.0.3';

export function BookPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  const handlePaymentConfirmed = () => {
    setHasPurchased(true);
    setShowPaymentModal(false);
  };

  const handleDownload = async () => {
    try {
      const data = await ebookApi.getDownloadUrl();
      if (data.url) {
        window.open(data.url, '_blank');
        toast.success('Download started!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to download eBook');
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-yellow-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="w-20 h-20 mx-auto mb-6 text-yellow-500" />
            <h1 className="text-5xl md:text-6xl mb-6 text-white">
              The African Powerhouse
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A comprehensive exploration of Africa's rise as a global economic and cultural force
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Book Cover & Purchase */}
          <div className="sticky top-24">
            <Card className="overflow-hidden border-2 border-yellow-500">
              <div className="bg-gradient-to-br from-yellow-900 to-black p-12 flex items-center justify-center min-h-[500px]">
                <div className="text-center">
                  <BookOpen className="w-32 h-32 mx-auto mb-6 text-yellow-500" />
                  <h2 className="text-4xl text-white mb-2">
                    The African
                  </h2>
                  <h2 className="text-5xl text-yellow-500 mb-6">
                    Powerhouse
                  </h2>
                  <p className="text-xl text-gray-300">
                    by Colin Stanley
                  </p>
                </div>
              </div>
              
              <CardContent className="p-6 bg-white">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl text-black">30 USDT</span>
                    <span className="text-gray-500">(TRC20)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Secure cryptocurrency payment via USDT TRC20
                  </p>
                </div>

                {!hasPurchased ? (
                  <Button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-yellow-500 text-black hover:bg-yellow-600 py-6 text-lg"
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Buy Now - 30 USDT
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-500 rounded-lg p-4 text-center">
                      <p className="text-green-700 mb-2">
                        ✓ Purchase Confirmed
                      </p>
                      <p className="text-sm text-green-600">
                        Thank you for your purchase!
                      </p>
                    </div>
                    
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-yellow-500 text-black hover:bg-yellow-600 py-6 text-lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download eBook (PDF)
                    </Button>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Rated 5.0 by readers worldwide
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Book Details */}
          <div className="space-y-8">
            {/* About the Book */}
            <div>
              <h2 className="text-3xl mb-4 text-black">
                About the Book
              </h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  "The African Powerhouse" is a groundbreaking exploration of Africa's transformation into a global economic and cultural force. This comprehensive work examines the continent's journey from colonial legacy to emerging superpower, offering unique insights into the factors driving this unprecedented change.
                </p>
                <p>
                  Through meticulous research and compelling narratives, this book reveals how African nations are leveraging innovation, demographic advantages, and cultural richness to reshape the global landscape. From technological hubs in Kenya to financial centers in Nigeria, from creative industries in South Africa to renewable energy initiatives across the Sahel, "The African Powerhouse" documents a continent on the rise.
                </p>
                <p>
                  Whether you're an investor, policymaker, student, or simply curious about Africa's future, this book provides essential context and forward-looking analysis that challenges conventional narratives and reveals new possibilities.
                </p>
              </div>
            </div>

            {/* What You'll Learn */}
            <div>
              <h2 className="text-3xl mb-4 text-black">
                What You'll Discover
              </h2>
              <ul className="space-y-3">
                {[
                  'The economic transformation reshaping African nations',
                  'How technology and innovation are driving growth',
                  'The demographic dividend and its global implications',
                  'Cultural influence and soft power in the modern era',
                  'Investment opportunities and market dynamics',
                  'Sustainable development and green economy initiatives',
                  'Political evolution and governance reforms',
                  'Africa\'s role in shaping the 21st century global order'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-black text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* About the Author */}
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <h2 className="text-3xl mb-4 text-black">
                About the Author
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>Colin Stanley</strong> is a researcher, writer, and thought leader specializing in African economics, culture, and development. With years of experience analyzing global trends and their impact on the African continent, Colin brings a unique perspective that bridges academic rigor with accessible storytelling.
              </p>
              <p className="text-gray-700">
                Through extensive fieldwork, interviews with key stakeholders, and deep analysis of economic data, Colin has established himself as a trusted voice on Africa's transformation and its implications for the global community.
              </p>
            </div>

            {/* Testimonials */}
            <div>
              <h2 className="text-3xl mb-6 text-black">
                What Readers Say
              </h2>
              <div className="space-y-4">
                {[
                  {
                    name: 'Dr. Amara Okonkwo',
                    role: 'Economics Professor',
                    text: 'A masterful analysis that challenges outdated perceptions and provides fresh insights into Africa\'s economic renaissance.'
                  },
                  {
                    name: 'James Chen',
                    role: 'Investment Analyst',
                    text: 'Essential reading for anyone interested in emerging markets. The data-driven approach combined with compelling narratives makes this a standout work.'
                  },
                  {
                    name: 'Fatima Al-Hassan',
                    role: 'Development Consultant',
                    text: 'Colin Stanley has captured the essence of Africa\'s transformation with clarity and depth. This book is both informative and inspiring.'
                  }
                ].map((testimonial, index) => (
                  <Card key={index} className="border-2 border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <p className="text-black">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentConfirmed={handlePaymentConfirmed}
      />
    </div>
  );
}

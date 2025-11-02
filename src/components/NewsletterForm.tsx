import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { newsletterApi } from '../utils/api';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await newsletterApi.subscribe(email);
      toast.success('Successfully subscribed to the newsletter!');
      setEmail('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center text-white">
      <Mail className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
      <h3 className="text-3xl mb-4 text-white">
        Stay Updated
      </h3>
      <p className="text-gray-300 mb-6">
        Subscribe to receive notifications about new essays and updates
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-lg border-2 border-yellow-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-black"
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 text-black hover:bg-yellow-400"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
}

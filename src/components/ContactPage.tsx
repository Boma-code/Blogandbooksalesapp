import { useState } from 'react';
import { Mail, MessageSquare, Send, Twitter, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { contactApi } from '../utils/api';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await contactApi.send(formData.name, formData.email, formData.subject, formData.message);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-yellow-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
          <h1 className="text-5xl md:text-6xl mb-6 text-white">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions about my work or want to collaborate? I'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-gray-200">
              <CardContent className="p-8">
                <h2 className="text-3xl mb-6 text-black">
                  Send a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                        Your Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm mb-2 text-gray-700">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm mb-2 text-gray-700">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Your message here..."
                      className="min-h-[200px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-yellow-500 text-black hover:bg-yellow-600 py-6 text-lg"
                  >
                    {sending ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Email */}
            <Card className="border-2 border-yellow-500">
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl mb-2 text-black">
                  Email
                </h3>
                <a
                  href="mailto:karimicolin254@gmail.com"
                  className="text-yellow-600 hover:text-yellow-700 transition-colors"
                >
                  karimicolin254@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-2 border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-xl mb-4 text-black text-center">
                  Connect on Social
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://twitter.com/karimicolin254"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all"
                  >
                    <Twitter className="w-6 h-6 text-blue-500" />
                    <span className="text-gray-700">@karimicolin254</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/colinstandley"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all"
                  >
                    <Linkedin className="w-6 h-6 text-blue-700" />
                    <span className="text-gray-700">LinkedIn</span>
                  </a>

                  <a
                    href="https://github.com/colinstandley"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all"
                  >
                    <Github className="w-6 h-6 text-gray-900" />
                    <span className="text-gray-700">GitHub</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="border-2 border-gray-200 bg-gray-50">
              <CardContent className="p-6">
                <h3 className="text-xl mb-3 text-black">
                  Response Time
                </h3>
                <p className="text-gray-700 text-sm">
                  I typically respond to messages within 24-48 hours. For urgent inquiries, 
                  please mention "URGENT" in the subject line.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

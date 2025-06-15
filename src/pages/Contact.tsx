
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const [sending, setSending] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    setSending(true);
    // Demo: Just pretend to submit (simulate network)
    setTimeout(() => {
      setSending(false);
      toast({
        title: "Submitted",
        description: "Thank you for reaching out! We'll get back to you as soon as possible."
      });
      setForm({ name: '', email: '', message: '' });
    }, 900);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg px-8 py-10 max-w-lg w-full"
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">Contact Us</h1>
          <div className="mb-4">
            <Label htmlFor="name" className="mb-1 block">Your Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              disabled={sending}
              placeholder="Jane Doe"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="mb-1 block">Your Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={sending}
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="message" className="mb-1 block">How can we help?</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              disabled={sending}
              placeholder="Let us know how we can help restore your memories..."
            />
          </div>
          <Button type="submit" disabled={sending} className="w-full bg-amber-700 hover:bg-amber-800">
            {sending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

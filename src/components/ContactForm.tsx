import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Get form data
      const { name, email, message } = formData;
      
      // Validate form data
      if (!name || !email || !message) {
        setStatus('error');
        return;
      }
      
      // Prepare mailto link parameters with more professional formatting
      const recipient = 'info.boold@gmail.com';
      
      // More professional subject line
      const subjectText = `Website Inquiry from ${name}`;
      const subject = encodeURIComponent(subjectText);
      
      // More professional email body with clear structure
      const bodyContent = `${message}

Sent by ${email}`;
      
      // Trim leading/trailing whitespace and encode
      const body = encodeURIComponent(bodyContent.trim());
      
      // Open email client with mailto link
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      
      // Set success state (Note: this will show briefly before email client opens)
      setStatus('success');
      
      // Reset form after a delay to allow user to see success message
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-space-grotesk font-medium tracking-tight leading-none mb-16">
            <span className="text-[40px] text-zinc-500 block">CONTACT</span>
            <span className="text-[40px] text-white block mt-1">AIMAN SALIM</span>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Name Input */}
            <div className="relative group">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="NAME"
                id="nameInput"
              />
              <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20 -translate-x-px -translate-y-px" />
              <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20 translate-x-px -translate-y-px" />
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20 -translate-x-px translate-y-px" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20 translate-x-px translate-y-px" />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="EMAIL"
                id="emailInput"
              />
              <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20 -translate-x-px -translate-y-px" />
              <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20 translate-x-px -translate-y-px" />
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20 -translate-x-px translate-y-px" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20 translate-x-px translate-y-px" />
            </div>

            {/* Message Input */}
            <div className="relative group">
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                placeholder="MESSAGE"
                id="messageInput"
              />
              <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20 -translate-x-px -translate-y-px" />
              <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/20 translate-x-px -translate-y-px" />
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-white/20 -translate-x-px translate-y-px" />
              <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20 translate-x-px translate-y-px" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
              id="sendButton"
            >
              <div className="absolute inset-0 border border-white/20 -translate-x-2 -translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="px-8 py-4 border border-white/20 relative bg-black hover:bg-white hover:text-black transition-colors">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-space-grotesk uppercase tracking-wider">
                    SEND MESSAGE
                  </span>
                  <Send className="w-4 h-4 stroke-[1.5px]" />
                </div>
              </div>
            </motion.button>
          </div>

          {/* Status Messages */}
          {status !== 'idle' && (
            <div className={`text-center text-xs tracking-wider mt-4 ${
              status === 'success' ? 'text-green-500' : 'text-red-500'
            }`}>
              {status === 'success' ? 'EMAIL CLIENT OPENED' : 'PLEASE FILL ALL FIELDS'}
            </div>
          )}
          
          {/* Instructions */}
          <div className="text-center text-xs text-white/40 mt-6">
            Clicking "Send Message" will open your default email application with a pre-filled message
          </div>
        </form>
      </div>
    </section>
  );
};
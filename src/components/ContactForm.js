'use client';

import { useState } from 'react';
import Eyebrow from '@/components/ui/Eyebrow';
import MagneticButton from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

const nicheOptions = [
  'Private Golf Club', 'Luxury Spa / Wellness', 'Boutique Hotel',
  'Fine Dining', 'Boutique Gym', 'Members Club', 'Other Premium Brand',
];

const serviceOptions = [
  'Essentials Website', 'Signature Website', 'Elite Website',
  'SEO Growth', 'AI Visibility', 'Not Sure Yet',
];

const budgetOptions = [
  '£5,000 – £10,000', '£10,000 – £20,000', '£20,000 – £40,000', '£40,000+',
];

const sourceOptions = [
  'Google Search', 'AI Assistant (ChatGPT, etc.)', 'Referral',
  'Social Media', 'Portfolio / Case Study', 'Other',
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', niche: '',
    services: [], budget: '', description: '', source: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.description.trim()) errs.description = 'Please describe your project';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '', email: '', company: '', niche: '',
          services: [], budget: '', description: '', source: '',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark px-[var(--gutter)]">
        <div className="text-center max-w-md">
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <h2 className="font-display italic text-[length:var(--type-h2)] text-text-light mb-4">
            Thank you
          </h2>
          <p className="font-body text-text-muted-light font-light">
            We&rsquo;ve received your enquiry and will respond within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left — Info */}
      <div className="bg-dark flex flex-col justify-center px-[var(--gutter)] py-16 md:py-0 relative">
        <div className="max-w-md">
          <h1 className="font-display italic text-[length:var(--type-h1)] leading-[var(--type-h1-lh)] text-text-light mb-6">
            Let&rsquo;s talk
          </h1>
          <p className="font-body text-[length:var(--type-body)] text-text-muted-light font-light mb-8">
            Tell us about your brand and what you&rsquo;re looking to build. We&rsquo;ll get back to you within 24 hours.
          </p>

          <div className="space-y-4 mb-8">
            <a
              href="mailto:hello@irvale.studio"
              className="font-body text-sm text-gold hover:text-gold-light transition-colors block"
            >
              hello@irvale.studio
            </a>
          </div>

          <p className="font-body text-xs text-text-muted-light">
            Currently accepting new projects for Q2 2026.
          </p>
        </div>

        {/* Gold vertical rule (desktop) */}
        <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gold/20" />
      </div>

      {/* Right — Form */}
      <div className="bg-cream flex flex-col justify-center px-[var(--gutter)] py-16 md:py-0">
        <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto space-y-6">
          {/* Name */}
          <FloatingField
            name="name" label="Name" value={formData.name}
            onChange={handleChange} error={errors.name}
          />

          {/* Email */}
          <FloatingField
            name="email" label="Email" type="email" value={formData.email}
            onChange={handleChange} error={errors.email}
          />

          {/* Company */}
          <FloatingField
            name="company" label="Brand / Company" value={formData.company}
            onChange={handleChange}
          />

          {/* Niche */}
          <div>
            <label className="font-body text-xs text-text-muted-dark uppercase tracking-[0.15em] block mb-2">
              Niche
            </label>
            <select
              name="niche"
              value={formData.niche}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-[var(--border-light)] focus:border-gold py-2 font-body text-sm text-text-dark outline-none transition-colors appearance-none"
            >
              <option value="">Select your niche</option>
              {nicheOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Services */}
          <div>
            <label className="font-body text-xs text-text-muted-dark uppercase tracking-[0.15em] block mb-3">
              Service Interest
            </label>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleServiceToggle(service)}
                  className={cn(
                    'font-body text-xs px-3 py-1.5 border transition-colors',
                    formData.services.includes(service)
                      ? 'border-gold bg-gold/10 text-gold-muted'
                      : 'border-[var(--border-light)] text-text-muted-dark hover:border-gold/40'
                  )}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="font-body text-xs text-text-muted-dark uppercase tracking-[0.15em] block mb-2">
              Budget
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-[var(--border-light)] focus:border-gold py-2 font-body text-sm text-text-dark outline-none transition-colors appearance-none"
            >
              <option value="">Select your budget</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="font-body text-xs text-text-muted-dark uppercase tracking-[0.15em] block mb-2">
              Project Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={cn(
                'w-full bg-transparent border-b py-2 font-body text-sm text-text-dark outline-none transition-colors resize-none',
                errors.description ? 'border-red-500' : 'border-[var(--border-light)] focus:border-gold'
              )}
              placeholder="Tell us about your project..."
            />
            {errors.description && (
              <p className="font-body text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Source */}
          <div>
            <label className="font-body text-xs text-text-muted-dark uppercase tracking-[0.15em] block mb-2">
              How Did You Find Us?
            </label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-[var(--border-light)] focus:border-gold py-2 font-body text-sm text-text-dark outline-none transition-colors appearance-none"
            >
              <option value="">Select an option</option>
              {sourceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <MagneticButton className="w-full md:w-auto">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full md:w-auto font-body text-sm font-medium bg-gold text-dark px-10 py-4 hover:bg-gold-light transition-colors disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Enquiry →'}
              </button>
            </MagneticButton>
          </div>

          {status === 'error' && (
            <p className="font-body text-xs text-red-500">
              Something went wrong. Please email us directly at hello@irvale.studio.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function FloatingField({ name, label, type = 'text', value, onChange, error }) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={cn(
          'peer w-full bg-transparent border-b py-2 pt-5 font-body text-sm text-text-dark outline-none transition-colors',
          error ? 'border-red-500' : 'border-[var(--border-light)] focus:border-gold'
        )}
      />
      <label className="absolute left-0 top-0 font-body text-xs text-text-muted-dark uppercase tracking-[0.15em] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.15em]">
        {label}
      </label>
      {error && (
        <p className="font-body text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

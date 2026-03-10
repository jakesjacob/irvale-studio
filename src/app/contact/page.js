import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact — Irvale Studio',
  description: 'Tell us about your brand. We respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
    </main>
  );
}

import SectionReveal from '@/components/ui/SectionReveal';
import Eyebrow from '@/components/ui/Eyebrow';

const addOns = [
  { name: 'SEO Growth Retainer', price: 'From £1,200/mo' },
  { name: 'AI Search Optimisation', price: 'From £800/mo' },
  { name: 'Analytics Dashboard', price: 'From £1,800' },
  { name: 'Custom Admin Panel', price: 'From £4,000' },
  { name: 'Performance Audit', price: '£950 fixed' },
  { name: 'Digital Ads Management', price: 'From £800/mo' },
  { name: 'Email Marketing Setup', price: 'From £1,200' },
  { name: 'CRO Package', price: 'From £1,500' },
  { name: 'Photography Direction', price: 'From £750' },
  { name: 'Maintenance Retainer', price: 'From £350/mo' },
];

export default function AddOnsGrid() {
  return (
    <section className="bg-cream py-[var(--section-gap)]">
      <div
        className="mx-auto px-[var(--gutter)]"
        style={{ maxWidth: 'var(--max-width)' }}
      >
        <Eyebrow className="mb-8 block">Add-Ons</Eyebrow>
        <SectionReveal className="grid grid-cols-1 md:grid-cols-3 gap-[var(--grid-gap)]">
          {addOns.map((addon) => (
            <div
              key={addon.name}
              className="bg-white border border-[var(--border-light)] p-6 flex items-center justify-between"
            >
              <h4 className="font-body text-sm font-medium text-text-dark">
                {addon.name}
              </h4>
              <span className="font-body text-sm text-text-muted-dark whitespace-nowrap ml-4">
                {addon.price}
              </span>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}

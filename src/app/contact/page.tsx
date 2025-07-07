// src/app/contact/page.tsx
import ContactModal from '@/components/ContactModal';

export const metadata = {
  title: 'Contact | Mahafuj Ahamed',
  description: 'Get in touch with Mahafuj Ahamed – blockchain and web3 developer.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <ContactModal />
    </div>
  );
}

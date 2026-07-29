import siteMetadata from '@/data/siteMetadata';

export const metadata = {
  title: 'Contact',
  description: 'Talk to the Fractalyze team about building, optimizing, or operating production cryptography.',
};

export default function ContactPage() {
  const formUrl = siteMetadata.contactFormUrl;

  return (
    <section className="bg-paper px-section py-section">
      <div className="mx-auto flex max-w-measure flex-col items-center gap-5 text-center">
        <h1 className="font-display text-display-4 text-ink">Contact Us</h1>
        <p className="text-body-lg text-ink">
          Tell us what you are building. Our engineers will get back to you.
        </p>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[800px]">
        {formUrl ? (
          <iframe
            src={formUrl}
            title="Contact Fractalyze"
            loading="lazy"
            className="h-[720px] w-full rounded-2xl border border-line"
          />
        ) : (
          <div className="rounded-2xl border border-line bg-surface p-8 text-center">
            <p className="text-body text-ink">
              Email us at{' '}
              <a href={`mailto:${siteMetadata.email}`} className="font-medium underline">
                {siteMetadata.email}
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

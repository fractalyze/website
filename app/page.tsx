import {ContactButton} from '@/components/ContactButton';
import {GitHubIcon, LinkedInIcon, XIcon} from '@/components/icons/SocialIcons';
import founders from '@/data/founders';
import siteMetadata from '@/data/siteMetadata';

const linkIcons = [
  {key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon},
  {key: 'x', label: 'X', Icon: XIcon},
  {key: 'github', label: 'GitHub', Icon: GitHubIcon},
] as const;

export default function Home() {
  return (
    <div className="bg-paper gutter py-16 md:py-20 xl:py-section">
      <div className="mx-auto flex max-w-measure flex-col gap-16 md:gap-20">
        <section className="flex flex-col gap-6 md:gap-8">
          {/* The headline is the share card's text too, so the two cannot drift. */}
          <h1 className="font-display text-title-1 text-ink md:text-display-4 xl:text-display-3">
            {siteMetadata.description}
          </h1>
          <div className="flex flex-col gap-4 text-body text-ink md:text-body-lg">
            <p>
              We build custom models for AI companion and roleplay apps, tuned to what their users
              like, and we serve them.
            </p>
            <p>
              People don&apos;t need AGI from these apps. They need AI that fits their taste. We
              tune each app&apos;s model on its own users&apos; choices, from blind tests and from
              the traffic we serve, starting with text and then voice, image and video.
            </p>
          </div>
        </section>

        <section aria-labelledby="founders" className="flex flex-col gap-6 md:gap-8">
          <h2 id="founders" className="font-display text-title-2 text-ink md:text-title-1">
            Founders
          </h2>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {founders.map((founder) => (
              <li
                key={founder.name}
                className="flex flex-col gap-3 rounded-2xl border border-line p-5"
              >
                <div>
                  <p className="text-body-lg font-medium text-ink">{founder.name}</p>
                  <p className="text-body-sm text-muted">{founder.title}</p>
                </div>
                <p className="flex-grow text-body-sm text-ink">{founder.blurb}</p>
                <ul className="flex items-center gap-4 text-subtle">
                  {linkIcons.map(({key, label, Icon}) => (
                    <li key={key}>
                      <a
                        href={founder.links[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${founder.name} on ${label}`}
                        className="block transition-colors hover:text-ink"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="contact" className="flex flex-col items-start gap-4">
          <h2 id="contact" className="font-display text-title-2 text-ink md:text-title-1">
            Contact
          </h2>
          <a
            href={`mailto:${siteMetadata.email}`}
            className="text-body text-ink underline underline-offset-4 transition-opacity hover:opacity-70 md:text-body-lg"
          >
            {siteMetadata.email}
          </a>
          <ContactButton variant="solid" />
        </section>
      </div>
    </div>
  );
}


import React from "react";

const TOC = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "user-accounts", label: "2. User Accounts" },
  { id: "the-service", label: "3. The Service" },
  { id: "user-uploaded-content", label: "4. User-Uploaded Content" },
  { id: "credits-payment", label: "5. Credits & Payment" },
  { id: "intellectual-property", label: "6. Intellectual Property" },
  { id: "liability", label: "7. Limitation of Liability" },
  { id: "termination", label: "8. Termination" },
  { id: "governing-law", label: "9. Governing Law" },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans py-16 px-4 md:px-0 flex justify-center">
      <article className="max-w-2xl w-full bg-white dark:bg-[#18181b] rounded-lg shadow p-8 space-y-8 border border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
        {/* Table of Contents */}
        <nav className="sticky top-0 bg-white dark:bg-[#18181b] z-10 p-0 pb-4 mb-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Table of Contents</h2>
          <ul className="flex flex-wrap gap-4 text-base">
            {TOC.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-accent hover:underline transition story-link font-medium"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Content */}
        <section id="acceptance">
          <h2 className="text-2xl font-bold mb-2">1. Acceptance of Terms</h2>
          <p className="text-base leading-relaxed">
            By creating an account or using [Your Company Name]'s AI photo restoration service ("the Service"), you agree to be bound by these Terms of Service ("Terms").
          </p>
        </section>
        <section id="user-accounts">
          <h2 className="text-2xl font-bold mb-2">2. User Accounts</h2>
          <p className="text-base leading-relaxed">
            You are responsible for maintaining the confidentiality of your account login details and for all activities that occur under your account.
          </p>
        </section>
        <section id="the-service">
          <h2 className="text-2xl font-bold mb-2">3. The Service</h2>
          <p className="text-base leading-relaxed">
            Our Service uses AI and expert human review to restore photos you upload. Users exchange credits, where one (1) credit enables one restored photo download without a watermark.
          </p>
        </section>
        <section id="user-uploaded-content">
          <h2 className="text-2xl font-bold mb-2">4. User-Uploaded Content</h2>
          <ol className="list-decimal pl-4 space-y-1 text-base">
            <li><b>Ownership:</b> You retain 100% ownership and all intellectual property rights to your photos.</li>
            <li><b>Limited License:</b> You grant us a limited, non-exclusive, worldwide, royalty-free license only to process, modify, and store your photo to provide our service. This license ends when you delete the photo from our system.</li>
            <li><b>Prohibited Content:</b> You may not upload illegal, infringing, obscene, or harmful content. We may remove offending content and terminate accounts in such cases.</li>
          </ol>
        </section>
        <section id="credits-payment">
          <h2 className="text-2xl font-bold mb-2">5. Credits & Payment</h2>
          <ul className="list-disc pl-5 text-base space-y-1">
            <li>Credits are required for watermark-free photo downloads. One (1) credit equals one restoration download.</li>
            <li>Purchased credits do not expire.</li>
            <li>All credit purchases are final and non-refundable, especially for credits that have been used. We offer a free trial so you may try the service before purchase.</li>
          </ul>
        </section>
        <section id="intellectual-property">
          <h2 className="text-2xl font-bold mb-2">6. Intellectual Property</h2>
          <p className="text-base leading-relaxed">
            All rights to our website, branding, and AI technology belong to [Your Company Name]. You own your uploaded content, not our service or code.
          </p>
        </section>
        <section id="liability">
          <h2 className="text-2xl font-bold mb-2">7. Limitation of Liability</h2>
          <p className="text-base leading-relaxed">
            Our company is not liable for any loss, damages, or claims arising from your use of the Service to the fullest extent permitted by law.
          </p>
        </section>
        <section id="termination">
          <h2 className="text-2xl font-bold mb-2">8. Termination</h2>
          <p className="text-base leading-relaxed">
            We reserve the right to suspend or terminate your account for any violations of these Terms.
          </p>
        </section>
        <section id="governing-law">
          <h2 className="text-2xl font-bold mb-2">9. Governing Law</h2>
          <p className="text-base leading-relaxed">
            These Terms are governed by the laws of [Your Country/State]. Any disputes will be subject to the jurisdiction of those courts.
          </p>
        </section>
      </article>
    </div>
  );
}

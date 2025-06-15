
import React, { useRef } from "react";

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "data-we-collect", label: "Data We Collect" },
  { id: "how-we-use-data", label: "How We Use Your Data" },
  { id: "user-content-clause", label: "User Content (Photos)" },
  { id: "data-retention", label: "Data Retention" },
  { id: "user-rights", label: "User Rights" },
  { id: "cookie-policy", label: "Cookie Policy" },
  { id: "contact", label: "Contact Information" },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans py-16 px-4 md:px-0 flex justify-center">
      <article className="max-w-2xl w-full bg-white dark:bg-[#18181b] rounded-lg shadow p-8 space-y-8 border border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        {/* Table of Contents */}
        <nav className="sticky top-0 bg-white dark:bg-[#18181b] z-10 p-0 pb-4 mb-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Table of Contents</h2>
          <ul className="flex flex-wrap gap-4 text-base">
            {SECTIONS.map(({ id, label }) => (
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

        {/* Sections */}
        <section id="introduction">
          <h2 className="text-2xl font-bold mb-2">Introduction</h2>
          <p className="text-base leading-relaxed">
            This Privacy Policy explains how [Your Company Name] ("we", "our", "us") collects, uses, and safeguards your information when you use our online AI photo restoration service. We are committed to protecting your privacy and ensuring transparency about how we handle your personal data.
          </p>
        </section>

        <section id="data-we-collect">
          <h2 className="text-2xl font-bold mb-2">Data We Collect</h2>
          <ol className="list-decimal pl-4 space-y-2 text-base">
            <li>
              <b>Personal Data:</b> We collect your name and email address when you create an account, either via Google Sign-in or direct email signup.
            </li>
            <li>
              <b>User-Uploaded Content:</b> Photos you upload are collected strictly to provide the requested restoration service.
            </li>
            <li>
              <b>Payment Data:</b> We <u>DO NOT</u> store your credit card details. Payments are securely processed by trusted third-party providers (such as Stripe, Midtrans).
            </li>
            <li>
              <b>Usage Data:</b> We collect standard technical details like your IP address, browser type, and analytics on your interactions with our site for improvement and security purposes.
            </li>
          </ol>
        </section>

        <section id="how-we-use-data">
          <h2 className="text-2xl font-bold mb-2">How We Use Your Data</h2>
          <ul className="list-disc pl-5 text-base space-y-1">
            <li>To process your photos and deliver the restoration service.</li>
            <li>To manage your account, including credit purchases and payment confirmations.</li>
            <li>To communicate with you via transactional emails (password resets, receipts), and, if opted-in, marketing newsletters.</li>
          </ul>
        </section>

        <section id="user-content-clause">
          <h2 className="text-2xl font-bold mb-2">User Content (Photos)</h2>
          <ul className="list-disc pl-5 text-base space-y-1">
            <li>Your uploaded photos are strictly used only to perform the restoration you requested.</li>
            <li><b>We do not use your photos for AI training, marketing, or any other purpose without your separate, explicit consent.</b></li>
            <li>Your photos are never shared with third parties, except for the secure cloud infrastructure required to deliver our service.</li>
          </ul>
        </section>

        <section id="data-retention">
          <h2 className="text-2xl font-bold mb-2">Data Retention</h2>
          <ul className="list-disc pl-5 text-base space-y-1">
            <li>
              <b>User Photos:</b> Photos are stored on our servers for 90 days following restoration so you can access and download them. After 90 days, they are permanently deleted unless you delete them sooner.
            </li>
            <li>
              <b>Account Data:</b> Your account information is retained as long as your account remains active.
            </li>
          </ul>
        </section>

        <section id="user-rights">
          <h2 className="text-2xl font-bold mb-2">User Rights</h2>
          <ul className="list-disc pl-5 text-base space-y-1">
            <li><b>Access:</b> You may request a copy of your data.</li>
            <li><b>Correction:</b> You can correct or update your information at any time via your account settings.</li>
            <li><b>Deletion:</b> You may delete your account and associated photos at any time. Deletion requests can be made via account settings or by contacting us.</li>
          </ul>
          <p className="mt-2 text-base">We comply with applicable laws including the GDPR and CCPA regarding user rights.</p>
        </section>

        <section id="cookie-policy">
          <h2 className="text-2xl font-bold mb-2">Cookie Policy</h2>
          <p className="text-base leading-relaxed">
            We use cookies to enhance your experience and analyze site usage. For more details, see our full Cookie Policy below.
          </p>
        </section>

        <section id="contact">
          <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
          <p className="text-base leading-relaxed">
            For any privacy-related concerns, please email us at <a href="mailto:hello@restore.pics" className="text-accent underline">hello@restore.pics</a>.
          </p>
        </section>
      </article>
    </div>
  );
}

import React from "react";

export default function Policy() {
  const content = `Privacy Policy
Introduction
This Privacy Policy is issued by Aayubakwath (“we”, “us”, “our”). It explains how we collect, use, store, and protect your personal information when you access or use our website, mobile application, or any related services. “You” or “your” refers to any user, visitor, or customer of Aayubakwath platforms. By using our services, you agree to the practices described in this Privacy Policy.

Information We Collect
We may collect personal information that you provide directly, such as your name, email address, phone number, delivery address, date of birth, gender, login credentials, and payment-related details. We may also collect information when you contact us, place an order, fill out forms, participate in surveys, or interact with customer support.
In addition, we may automatically collect certain technical and usage data such as IP address, device information, browser type, operating system, pages visited, time spent on pages, and interaction patterns on our platform.

How We Collect Information
We collect information when you register an account, place an order, subscribe to updates, or communicate with us. We also collect data automatically through cookies, analytics tools, and similar tracking technologies. In some cases, we may receive information from third-party service providers such as delivery partners or payment processors.

Use of Information
We use your information to provide, operate, and improve our services. This includes processing orders, delivering products, managing payments, responding to queries, and offering customer support. We may also use your information for communication purposes, such as sending updates about your orders, service notifications, or promotional messages.
We may use data to improve our platform, analyze user behavior, enhance security, prevent fraud, comply with legal obligations, and personalize your experience.

Sharing of Information
We do not sell your personal information. However, we may share it with trusted third parties who help us operate our business, including payment gateways, logistics partners, IT service providers, analytics providers, and customer support services.
We may also disclose information if required by law, regulation, court order, or government authority, or if necessary to protect our rights, users, or systems.

Data Storage and Security
We take appropriate technical, administrative, and physical security measures to protect your personal information from unauthorized access, loss, misuse, or alteration. This may include encryption, secure servers, firewalls, and restricted access systems.
While we take reasonable steps to protect your data, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.

Data Retention
We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements. After that, your data is securely deleted or anonymized.

Cookies and Tracking Technologies
We use cookies and similar technologies to improve your browsing experience, analyze website performance, understand user behavior, and provide personalized content. You can control or disable cookies through your browser settings, but some features of our platform may not function properly without them.

Your Rights
Depending on applicable laws, you may have rights to access, correct, update, or delete your personal information. You may also object to certain uses of your data or withdraw consent where applicable. You can opt out of receiving promotional communications at any time.

Third-Party Links
Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those external sites. We encourage you to review their privacy policies before providing any personal information.

Children’s Privacy
Our services are not intended for individuals below the legal age of consent. We do not knowingly collect personal information from minors. If we become aware that such data has been collected, we will take steps to delete it.

Changes to This Privacy Policy
We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of our services after changes means you accept the updated policy.

Contact Us
If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, you may contact us through the contact details provided on our official website or platform.
`;

  const sections = content.split("\n\n");

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 bg-white shadow-xl rounded-2xl p-10">
        {/* Title */}
        <h1 className="text-4xl font-semibold text-[#111827] mb-10 text-center">
          Privacy Policy
        </h1>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, index) => {
            const lines = section.split("\n");
            const title = lines[0];
            const paragraphs = lines.slice(1);

            return (
              <div key={index}>
                {/* Heading */}
                <h2 className="text-xl font-semibold text-[#111827] mb-4 border-l-4 border-[#111827] pl-3">
                  {title}
                </h2>

                {/* Paragraphs */}
                <div className="space-y-3">
                  {paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className="text-gray-500 leading-relaxed text-sm md:text-base"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Last updated: March 2026
        </p>
      </div>
    </div>
  );
}

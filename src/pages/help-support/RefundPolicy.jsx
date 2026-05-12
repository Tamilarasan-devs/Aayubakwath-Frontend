import React from "react";

export default function RefundPolicy() {
  const data = `Cancellation, Returns and Refund Policy
At Aayubakwath, we are committed to delivering high-quality nutraceutical products formulated with care and precision. Due to the nature of health supplements, we maintain strict policies to ensure product safety, hygiene, and quality standards.
Please read the following policy carefully before making a purchase.

Cancellation Policy
Orders placed on our website can be cancelled only if they have not yet been dispatched from our warehouse.
To request a cancellation, you may contact our customer support team with your order details.
Once your order has been successfully cancelled, the refund will be initiated to your original mode of payment within a reasonable period of time.
Please note that once the order has been dispatched, it cannot be cancelled.
We reserve the right to cancel any order at our sole discretion in case of suspected fraudulent activity or violation of our Terms of Use.

Returns Policy
Due to the nature of nutraceutical and health supplement products, returns are accepted only under specific conditions.
We accept return or replacement requests only if:
• The product received is damaged during transit 
• The product received is defective 
• An incorrect product has been delivered 
• The product packaging is tampered at the time of delivery 
Return requests must be raised within 48 hours of delivery.
To initiate a return, you must contact our customer support team with:
• Order ID and purchase details 
• Clear images of the product showing the issue 
• Unboxing video (recommended for faster validation) 
All return requests are subject to verification and approval by our quality team.

Conditions for Return
Returns will only be accepted if:
• The product is unused and in its original condition 
• The original packaging, labels, seals, and barcodes are intact 
• The product has not been tampered with or consumed 
Returns will not be accepted under the following conditions:
• Product has been used or opened 
• Request is made beyond the specified time frame 
• Product is returned without original packaging 
• Damage is limited only to outer shipping packaging 

Replacement Policy
If your return request is approved, we will offer a replacement of the product, subject to availability of stock.
In case a replacement is not available, a refund will be processed.

Refund Policy
Refunds will be processed under the following circumstances:
• Cancellation of order before shipment 
• Approved return due to damaged, defective, or incorrect product 
• Orders returned due to failed delivery attempts or incorrect address 
Once the returned product is received and verified at our warehouse, the refund will be initiated.
Refunds will be processed as follows:
• Online Payments: Refunded to the original payment method 
• Cash on Delivery (COD): Refunded via bank transfer based on details provided by the customer 
The refund process may take 7–14 business days, and additional time may be required for the amount to reflect in your account.

Partial Returns
If your order contains multiple products, you may request a return for individual items.
All applicable conditions must be met for each product being returned.

Non-Returnable Items
The following items are not eligible for return:
• Products that have been opened or consumed 
• Free or promotional items 
• Products returned without prior approval 

Failed Delivery and Refunds
In cases where:
• The customer is unavailable to receive the order 
• Incorrect or incomplete address is provided 
• Delivery attempts are unsuccessful 
The order may be returned to us by our logistics partner. Refunds will be processed after receipt of the product at our warehouse.

Policy Updates
Aayubakwath reserves the right to modify or update this Cancellation, Returns and Refund Policy at any time without prior notice.
Users are advised to review this page periodically to stay informed of any changes.

Contact Information
For any queries related to cancellations, returns, or refunds, please contact our customer support team.
`;

  const sections = data.trim().split("\n\n");

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 bg-white shadow-lg rounded-2xl p-10">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-semibold text-[#111827]">
            Refund & Return Policy
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Please review our cancellation, return and refund guidelines
            carefully
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, index) => {
            const lines = section.trim().split("\n");
            const title = lines[0];
            const contentLines = lines.slice(1);

            return (
              <Section key={index} title={title}>
                {contentLines.map((line, i) => {
                  const trimmed = line.trim();

                  if (trimmed.startsWith("•")) {
                    return (
                      <li
                        key={i}
                        className="ml-5 list-disc text-gray-500 text-sm md:text-base"
                      >
                        {trimmed.replace("•", "").trim()}
                      </li>
                    );
                  }

                  return (
                    <p
                      key={i}
                      className="text-gray-500 leading-relaxed text-sm md:text-base"
                    >
                      {trimmed}
                    </p>
                  );
                })}
              </Section>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 border-t pt-6 text-center">
          <p className="text-sm text-gray-400">Last updated: March 2026</p>
        </div>
      </div>
    </div>
  );
}

/* Reusable Section Component */
function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#111827] mb-4 border-l-4 border-[#111827] pl-3">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

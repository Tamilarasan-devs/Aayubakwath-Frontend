import React from "react";

export default function ShippingPolicy() {
  const content = `Shipping Policy
Aayubakwath is committed to ensuring that all products ordered through our website are delivered in a timely and efficient manner. We have partnered with reputed logistics service providers to facilitate safe and reliable delivery across serviceable locations.
All products are carefully inspected, securely packaged, and then handed over to our delivery partners to ensure they reach you in good condition.
By placing an order on our website, you agree to the terms outlined in this Shipping Policy.

Shipping Coverage
We currently ship products to most locations within India, subject to serviceability of our logistics partners. Delivery availability may vary depending on pin code and may change without prior notice.
You may verify delivery availability by entering your shipping details at checkout.

Order Processing and Dispatch
Once an order is placed, it is processed through our system and undergoes internal verification and quality checks before dispatch.
Orders are typically dispatched within [ ] business days of order confirmation, excluding Sundays and public holidays.
Please note that:
• Orders may be shipped from different warehouses 
• Items within a single order may be dispatched separately 
• Dispatch timelines may vary based on product availability and logistics conditions 

Delivery Timelines
Estimated delivery time is generally [ ] business days from the date of dispatch, depending on the delivery location and other external factors.
While we aim to deliver within the estimated timelines, delays may occur due to:
• Weather conditions 
• Logistics disruptions 
• Regional restrictions 
• Unforeseen operational challenges 
In such cases, Aayubakwath shall not be held liable for delays beyond reasonable control.

Shipping Charges
Shipping charges applicable to orders are as follows:
Order Value
Shipping Charges

Shipping charges (if applicable) will be clearly displayed at checkout before order confirmation.
We reserve the right to revise shipping charges at any time without prior notice.

Order Delivery Process
Once dispatched, our logistics partner will deliver the product(s) to the shipping address provided at the time of order placement.
If delivery cannot be completed due to reasons such as:
• Incorrect address 
• Unavailability of recipient 
• Inability to contact recipient 
the delivery partner may attempt to contact you to resolve the issue. Repeated failed delivery attempts may result in return of the shipment to our warehouse.

Tracking of Orders
Once your order has been dispatched, you will receive a tracking ID and tracking link via email or SMS.
Customers may also track their orders through their account dashboard, where applicable.

Delivery Attempts
Our delivery partners typically make multiple attempts to deliver the order.
If delivery is unsuccessful after repeated attempts, the package may be returned to us. In such cases, re-shipping may be subject to additional charges.

Shipping Restrictions
We do not currently support delivery outside India.
Certain pin codes may be temporarily or permanently non-serviceable due to logistical limitations.

Risk and Responsibility
All products are thoroughly inspected and packaged before dispatch. Responsibility for goods passes to the logistics partner once the order is handed over for delivery.
However, we strive to ensure that products are delivered in proper condition, and will review cases of damage reported during transit on a case-by-case basis.

Delays and Unforeseen Circumstances
We aim to dispatch and deliver orders within the estimated timelines. However, delays may occur due to factors beyond our control.
Aayubakwath shall not be held liable for any delay caused by external logistics constraints or unforeseen circumstances.

Policy Updates
We reserve the right to modify or update this Shipping Policy at any time without prior notice. Any changes will be effective immediately upon posting on the website.
Users are encouraged to review this policy periodically.

Contact Information
For any queries related to shipping or delivery, please contact us at:
[Insert Email / Support Contact]

Final Note
By placing an order on Aayubakwath, you acknowledge that you have read, understood, and agreed to this Shipping Policy.`;

  const sections = content.trim().split("\n\n");

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 bg-white shadow-lg rounded-2xl p-10">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-semibold text-[#111827]">
            Shipping Policy
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Information about order processing, delivery and shipping terms
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, index) => {
            const lines = section.trim().split("\n");
            const title = lines[0];
            const contentLines = lines.slice(1);

            return (
              <div key={index}>
                {/* Heading */}
                <h2 className="text-xl font-semibold text-[#111827] mb-4 border-l-4 border-[#111827] pl-3">
                  {title}
                </h2>

                {/* Content */}
                <div className="space-y-3">
                  {contentLines.map((line, i) => {
                    const trimmed = line.trim();

                    // Bullet points
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

                    // Normal paragraph
                    return (
                      <p
                        key={i}
                        className="text-gray-500 leading-relaxed text-sm md:text-base"
                      >
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 border-t pt-6 text-center">
          <p className="text-sm text-gray-400">Last updated: April 2026</p>
        </div>
      </div>
    </div>
  );
}

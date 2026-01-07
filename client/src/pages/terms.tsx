
import React from 'react';
import StandardPageLayout from "@/components/StandardPageLayout";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  useScrollTop();

  return (
    <StandardPageLayout
      title="Terms & Conditions"
      subtitle="Legal Framework"
      vibeKeywords={['Legal', 'Structure', 'Agreement']}
      seoTitle="Terms & Conditions – Andara Ionic"
      seoDescription="Read the general terms and conditions for using the Andara Ionic website, ordering products, shipping, returns, liability and data protection."
      seoKeywords={["andara ionic terms and conditions", "andara terms", "andara legal", "purchase conditions", "shipping terms", "liability disclaimer water product"]}
    >
      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8 text-slate-300 font-light">

        <section>
          <h2 className="text-2xl text-white mb-4">1. Scope</h2>
          <p>These Terms & Conditions apply to the use of the Andara Ionic website, all orders placed via the online shop, and all communication and support channels.</p>
        </section>

        <Separator className="bg-slate-800" />

        <section>
          <h2 className="text-2xl text-white mb-4">2. Provider Information</h2>
          <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-sm font-mono text-slate-400">
            <p>[Company Name]</p>
            <p>[Address Line 1]</p>
            <p>[Address Line 2]</p>
            <p>Email: support@andaraionic.com</p>
          </div>
        </section>

        <Separator className="bg-slate-800" />

        <section>
          <h2 className="text-2xl text-white mb-4">3. Use of the Website</h2>
          <p>Content on this website is provided for information and education purposes only. No content constitutes medical, legal, or financial advice. Users remain responsible for their own decisions and interpretations of the educational material.</p>
        </section>

        <Separator className="bg-slate-800" />

        <section>
          <h2 className="text-2xl text-white mb-4">4. Product Nature & Intended Use</h2>
          <p>Andara Ionic is positioned exclusively as a water clarification and conditioning product.</p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-400">
            <li>Intended use must follow the instructions on the label and website.</li>
            <li>The product is not intended or marketed as a medicine, therapy, or diagnostic tool.</li>
          </ul>
        </section>

        <Separator className="bg-slate-800" />

        <section>
          <h2 className="text-2xl text-white mb-4">5. Orders, Prices & Payment</h2>
          <p>Contracts are concluded upon order confirmation. We accept major credit cards and other payment methods as displayed at checkout. All prices include applicable taxes unless stated otherwise.</p>
        </section>

        <Separator className="bg-slate-800" />

        <section>
          <h2 className="text-2xl text-white mb-4">6. Shipping, Delivery & Risk</h2>
          <p>We ship to selected regions as displayed during checkout. Estimated delivery times are provided for reference. Risk transfers to the customer once goods are handed over to the carrier.</p>
        </section>

        <Separator className="bg-slate-800" />

        <section>
          <h2 className="text-2xl text-white mb-4">7. Warranty & Liability</h2>
          <p>Statutory warranty rights apply. Liability is excluded for damages resulting from improper use, use outside of instructions, or personal interpretations of educational content as medical advice.</p>
        </section>

        <Separator className="bg-slate-800" />

        <section>
          <h2 className="text-2xl text-white mb-4">8. Governing Law</h2>
          <p>These terms are governed by the applicable laws of [Jurisdiction].</p>
        </section>

      </div>
    </StandardPageLayout>
  );
}

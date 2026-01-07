import "dotenv/config";
import { db } from "../server/db";
import { pages } from "../shared/schema";
import { eq } from "drizzle-orm";

// Updated page content with correct Andara CSS classes
const updatedContent = `
<main class="andara-page">
  <!-- HERO SECTION -->
  <section class="andara-hero andara-hero--primary">
    <div class="andara-hero__inner">
      <div class="andara-hero__content">
        <p class="andara-hero__label">Shop · Bundles</p>
        <h1 class="andara-hero__headline andara-hero__headline--gold">1 L Bundles – For Families, Retreats & Professionals</h1>
        <p class="andara-hero__subline">The 1 L bottle is the core format of Andara Ionic. From a single bottle, create hundreds of liters of clarified, mineral-coherent water.</p>
      </div>
    </div>
  </section>

  <!-- SECTION 1: Why 1L Bundles Exist -->
  <section class="andara-section">
    <div class="andara-section__inner">
      <div class="andara-section__header">
        <h2 class="andara-section__headline">Why 1 L Bundles Are the Heart of the Andara System</h2>
        <p class="andara-section__subline">Designed for people and places that condition a lot of water</p>
      </div>
      
      <div class="andara-grid andara-grid--03">
        <div class="andara-card">
          <h3 class="andara-card__title">🏠 Families</h3>
          <p class="andara-card__text">One central water station in the kitchen for the whole household.</p>
        </div>
        <div class="andara-card">
          <h3 class="andara-card__title">🧘 Retreats & Studios</h3>
          <p class="andara-card__text">Serve structured drinking water all day to guests and participants.</p>
        </div>
        <div class="andara-card">
          <h3 class="andara-card__title">⚕️ Practitioners</h3>
          <p class="andara-card__text">Prepare clarified, mineral-coherent water for clients.</p>
        </div>
      </div>

      <div class="andara-highlight-box" style="margin-top: 2rem;">
        <p class="andara-highlight-box__text"><strong>Key insight:</strong> Instead of buying endless bottles of "special water", you create your own water quality on site – from your existing base water. 1 L = your "master bottle" / central concentrate.</p>
      </div>
    </div>
  </section>

  <!-- SECTION 2: What's Inside -->
  <section class="andara-section andara-section--alt">
    <div class="andara-section__inner">
      <div class="andara-section__header">
        <h2 class="andara-section__headline">What's Inside Each 1 L Bottle</h2>
      </div>
      
      <div class="andara-grid andara-grid--02">
        <div>
          <p class="andara-text-lead">Andara Ionic 1 L is a highly concentrated ionic sulfate mineral solution, refined from volcanic mineral sources and tuned for water clarification & conditioning.</p>
          <p>Each bottle is:</p>
          <ul class="andara-hero__bullets">
            <li>Carefully formulated to support a target sulfate range (typically 17–30 mg/L)</li>
            <li>Designed for flocculation, charge balancing and structural influence</li>
            <li>Produced in controlled batches with lab-tested mineral profiles</li>
          </ul>
        </div>
        <div>
          <p class="andara-text-lead">You're not buying "a drink". You're buying a tool that transforms water:</p>
          <ul class="andara-hero__bullets">
            <li>From flat → clearer, more defined, easier to drink</li>
            <li>From random → repeatable, measurable structure</li>
          </ul>
          <p class="andara-text-small" style="margin-top: 1rem; font-style: italic;">No medical promises. Just water stories, mineral logic and terrain thinking.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3: Bundle Overview -->
  <section class="andara-section">
    <div class="andara-section__inner">
      <div class="andara-section__header">
        <h2 class="andara-section__headline">Bundle Options – From Home Ritual to Professional Use</h2>
        <p class="andara-section__subline">Three bundle families to match your scale</p>
      </div>
      
      <div class="andara-grid andara-grid--03">
        <div class="andara-card">
          <h3 class="andara-card__title">1. Single 1 L – "Home Core"</h3>
          <ul style="color: var(--andara-text-secondary); padding-left: 1.25rem;">
            <li>Start building your Andara water station</li>
            <li>Perfect for 1–2 people or small family</li>
            <li>Get to know dilution ranges and taste</li>
          </ul>
        </div>
        <div class="andara-card andara-card--featured">
          <h3 class="andara-card__title">2. 4 L Bundle – "Family & Studio"</h3>
          <ul style="color: var(--andara-text-secondary); padding-left: 1.25rem;">
            <li>For conscious households, yoga studios</li>
            <li>Multiple carboys or dispensers</li>
            <li>Better liter pricing, peace of mind</li>
          </ul>
        </div>
        <div class="andara-card">
          <h3 class="andara-card__title">3. 9 L Bundle – "Retreat & Pro"</h3>
          <ul style="color: var(--andara-text-secondary); padding-left: 1.25rem;">
            <li>For retreats, spas, practitioners</li>
            <li>High throughput: one philosophy, many glasses</li>
            <li>Strongest savings & planning security</li>
          </ul>
        </div>
      </div>
      
      <p class="andara-text-center" style="margin-top: 2rem; color: var(--andara-text-secondary);">Each bundle uses the same concentrate. What changes is how far you scale Andara into your space.</p>
    </div>
  </section>

  <!-- SECTION 4: Liter Pricing -->
  <section class="andara-section andara-section--alt">
    <div class="andara-section__inner">
      <div class="andara-section__header">
        <h2 class="andara-section__headline">Transparent Liter Pricing</h2>
        <p class="andara-section__subline">We think in liters of conditioned water, not bottles on a shelf</p>
      </div>
      
      <div class="andara-highlight-box">
        <p class="andara-highlight-box__text">Each bundle shows: <strong>total liters you can condition</strong>, <strong>effective price per liter</strong>, and <strong>savings vs single bottles</strong>.</p>
      </div>

      <div class="andara-grid andara-grid--03" style="margin-top: 2rem;">
        <div class="andara-card">
          <h3 class="andara-card__title">Single 1 L</h3>
          <p class="andara-card__text">Entry into the system – flexible and simple.</p>
        </div>
        <div class="andara-card">
          <h3 class="andara-card__title">4 L Bundle</h3>
          <p class="andara-card__text">Reduced liter price, months of security for family or studio.</p>
        </div>
        <div class="andara-card">
          <h3 class="andara-card__title">9 L Bundle</h3>
          <p class="andara-card__text">"I'm all in" decision – most efficient €/L value.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 5: Daily Integration -->
  <section class="andara-section">
    <div class="andara-section__inner">
      <div class="andara-section__header">
        <h2 class="andara-section__headline">From Bottle to Water Station</h2>
        <p class="andara-section__subline">How Andara feels in everyday life</p>
      </div>
      
      <div class="andara-grid andara-grid--02">
        <div>
          <ol style="color: var(--andara-text-secondary); padding-left: 1.25rem; line-height: 2;">
            <li><strong>Choose your base water:</strong> filtered, spring, or quality tap</li>
            <li><strong>Use the Dilution Calculator</strong> to find your sulfate range</li>
            <li><strong>Prepare larger batches:</strong> 5–10 L (home) or 20–50 L (studio)</li>
            <li><strong>Let water stand,</strong> clarify and settle</li>
            <li><strong>Serve</strong> from glass dispensers or carboys</li>
          </ol>
        </div>
        <div class="andara-highlight-box">
          <p class="andara-highlight-box__text">Over time, Andara becomes simply <em>"the way water is done here"</em> – quietly in the background, like clean electricity or fresh air.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 6: Safety -->
  <section class="andara-section andara-section--alt">
    <div class="andara-section__inner">
      <div class="andara-section__header">
        <h2 class="andara-section__headline">Safety, Boundaries & Respect</h2>
      </div>
      
      <div class="andara-highlight-box andara-highlight-box--warning">
        <p class="andara-highlight-box__text">Andara Ionic is designed as a water clarification and conditioning solution. It is <strong>not</strong> a medicine, not a cure, and not a replacement for professional advice.</p>
      </div>
      
      <ul class="andara-hero__bullets" style="margin-top: 2rem; max-width: 600px;">
        <li>Respect the suggested sulfate ranges and dilution tables</li>
        <li>Stay within reasonable dose windows – more is not always better</li>
        <li>Combine with good filtration and common sense</li>
        <li>See it as part of a terrain approach: water, minerals, light, breath, rest</li>
      </ul>
    </div>
  </section>

  <!-- SECTION 7: FAQ -->
  <section class="andara-section">
    <div class="andara-section__inner">
      <div class="andara-section__header">
        <h2 class="andara-section__headline">FAQ – 1 L Bundles in Practice</h2>
      </div>
      
      <div class="andara-faq">
        <article class="andara-faq__item">
          <button class="andara-faq__question">How many liters can I condition with one 1 L bottle?</button>
          <div class="andara-faq__answer">It depends on your chosen dilution and target sulfate range. Many users condition hundreds of liters from a single bottle. The dilution calculator helps you plan precisely.</div>
        </article>
        
        <article class="andara-faq__item">
          <button class="andara-faq__question">Does the taste of my water change?</button>
          <div class="andara-faq__answer">That depends on your base water and dose. Many people report their water feels clearer, softer and easier to drink, but taste is always subjective.</div>
        </article>
        
        <article class="andara-faq__item">
          <button class="andara-faq__question">Can I combine Andara with my existing filter system?</button>
          <div class="andara-faq__answer">Yes. Many users filter first and then condition with Andara as a final step. Always respect your filter system's recommendations.</div>
        </article>
        
        <article class="andara-faq__item">
          <button class="andara-faq__question">What if my dispenser shows sediment?</button>
          <div class="andara-faq__answer">Sediment or flocculation can be a sign that particles are grouping and settling. Many users simply let it settle and/or filter mechanically before drinking.</div>
        </article>
      </div>
    </div>
  </section>

  <!-- SECTION 8: CTA -->
  <section class="andara-cta">
    <div class="andara-cta__inner">
      <h2 class="andara-cta__headline">Choose the Bundle That Matches Your Space</h2>
      <p class="andara-cta__text">Whether you're just beginning or already hosting a whole community, there is an Andara 1 L bundle that matches your rhythm.</p>
      <a href="/shop/andara-ionic-1l" class="andara-cta__button">View 1 L Bundles & Pricing →</a>
    </div>
  </section>
</main>
`;

async function updatePageContent() {
    console.log("Updating page content with correct CSS classes...");

    try {
        const result = await db.update(pages)
            .set({
                content: updatedContent,
                updatedAt: new Date()
            })
            .where(eq(pages.path, "/shop/andara-1l-bundles"))
            .returning({ title: pages.title, path: pages.path });

        if (result.length > 0) {
            console.log("✅ Page updated successfully!");
            console.log("Updated:", result[0].title, "at", result[0].path);
            console.log("New content length:", updatedContent.length, "chars");
        } else {
            console.log("❌ Page not found at /shop/andara-1l-bundles");
        }
    } catch (error) {
        console.error("Error updating page:", error);
    } finally {
        process.exit(0);
    }
}

updatePageContent();

import "dotenv/config";
import { db } from "../server/db";
import { pages } from "../shared/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// Page: 1 L Bundles – Family & Pro Use
const pageData = {
  id: uuidv4(),
  key: "shop_1l_bundles",
  title: "1 L Bundles – Family & Pro Use",
  path: "/shop/andara-1l-bundles",
  pageType: "page",
  template: "product_bundles",
  clusterKey: "product-shop",
  parentKey: "shop_overview",
  priority: 2,
  summary: "Discover Andara Ionic 1 L bundles for families, retreats and professionals. Compare liter pricing, savings and use scenarios.",
  seoTitle: "Andara Ionic 1 L Bundles – Family, Retreat & Professional Use",
  seoDescription: "Discover Andara Ionic 1 L bundles for families, retreats and professionals. Compare liter pricing, savings and use scenarios – and learn how to build your own Andara water station at home or in your practice.",
  seoFocus: "andara ionic 1 liter, andara bundles, sulfate mineral water concentrate, family water station, professional water conditioning",
  status: "published",
  content: `
<article class="andara-page">
  <!-- HERO SECTION -->
  <section class="hero-section">
    <h1 class="page-title">1 L Bundles – For Families, Retreats & Professionals</h1>
  </section>

  <!-- SECTION 1: Why 1L Bundles Exist -->
  <section class="content-section">
    <h2>Why 1 L Bundles Are the Heart of the Andara System</h2>
    <p>The 1 L bottle is the core format of Andara Ionic. It's designed for people and places that condition a lot of water:</p>
    <ul>
      <li><strong>Families</strong> who want one central water station in the kitchen</li>
      <li><strong>Retreats and studios</strong> that serve structured drinking water all day</li>
      <li><strong>Practitioners</strong> who prepare clarified, mineral-coherent water for their clients</li>
    </ul>
    <p>From a single 1 L bottle, you can create hundreds of liters of conditioned water, depending on your chosen dilution and sulfate range. Instead of buying endlessly new bottles of "special water", you create your own water quality on site – from your existing base water.</p>
    <div class="key-points">
      <p><strong>Key messages:</strong></p>
      <ul>
        <li>1 L = "master bottle" / central concentrate</li>
        <li>Optimised for volume, practicality and long-term value</li>
        <li>Ideal for anyone who fills carboys, dispensers or multiple glass jugs every day</li>
      </ul>
    </div>
  </section>

  <!-- SECTION 2: What's Inside -->
  <section class="content-section">
    <h2>What's Inside Each 1 L Bottle</h2>
    <p>Andara Ionic 1 L is a highly concentrated ionic sulfate mineral solution, refined from volcanic mineral sources and tuned for water clarification & conditioning.</p>
    <p>Each bottle is:</p>
    <ul>
      <li>Carefully formulated to support a target sulfate range in your final drinking water (typically 17–30 mg/L)</li>
      <li>Designed to interact with your water through flocculation, charge balancing and structural influence</li>
      <li>Produced in controlled batches with lab-tested mineral profiles</li>
    </ul>
    <p>You're not buying "a drink". You're buying a tool that transforms the way your water behaves:</p>
    <ul>
      <li>From flat → to clearer, more defined, easier to drink</li>
      <li>From random → to repeatable, measurable structure and mineral profile</li>
    </ul>
    <p class="disclaimer">No medical promises. Just water stories, mineral logic and terrain thinking.</p>
  </section>

  <!-- SECTION 3: Bundle Overview -->
  <section class="content-section">
    <h2>Bundle Options – From Home Ritual to Professional Use</h2>
    <p>To make it easy, we group the 1 L bottles into three main bundle families:</p>
    
    <div class="bundle-card">
      <h3>1. Single 1 L – "Home Core"</h3>
      <ul>
        <li>Ideal if you want to start building an Andara water station</li>
        <li>Perfect for 1–2 people or a small family testing daily use</li>
        <li>Lets you get to know the dilution ranges and your preferred taste</li>
      </ul>
    </div>
    
    <div class="bundle-card">
      <h3>2. 4 L Bundle – "Family & Studio Pack"</h3>
      <ul>
        <li>For conscious households, yoga or movement studios</li>
        <li>Supports multiple carboys or dispensers running in parallel</li>
        <li>Offers better liter pricing and peace of mind (you won't run out quickly)</li>
      </ul>
    </div>
    
    <div class="bundle-card">
      <h3>3. 9 L Bundle – "Retreat, Spa & Pro Pack"</h3>
      <ul>
        <li>Created for retreats, spas and practitioners who serve many people</li>
        <li>Designed for high throughput: one central philosophy, many glasses</li>
        <li>Delivers the strongest liter savings and the most planning security</li>
      </ul>
    </div>
    
    <p>Each bundle uses the same concentrate. What changes is how far you want to scale Andara into your space.</p>
  </section>

  <!-- SECTION 4: Liter Pricing -->
  <section class="content-section">
    <h2>Transparent Liter Pricing – So You Know What You're Creating</h2>
    <p>We always think in liters of conditioned water, not just in bottles on a shelf.</p>
    <p>That's why each bundle clearly shows you:</p>
    <ul>
      <li>How many total liters of water you can condition</li>
      <li>The effective price per liter of your final water</li>
      <li>Your savings compared to buying single 1 L bottles</li>
    </ul>
    <p>You can imagine it like this:</p>
    <ul>
      <li>A <strong>single 1 L bottle</strong> is your entry into the system – flexible and simple.</li>
      <li>The <strong>4 L bundle</strong> reduces your effective liter price and gives you a few months of security for a family or small studio.</li>
      <li>The <strong>9 L bundle</strong> is the "I'm all in" decision: one clear water philosophy for your entire space – with the most efficient €/L value.</li>
    </ul>
    <p>This way you can choose not only with your mind, but also with your long-term planning and budget.</p>
  </section>

  <!-- SECTION 5: Who Each Bundle Is For -->
  <section class="content-section">
    <h2>Which Bundle Fits Your Life & Space?</h2>
    
    <div class="persona-card">
      <h3>🏠 Home Core – 1 L Single</h3>
      <ul>
        <li>You live alone or with one partner.</li>
        <li>You want to test Andara daily without a big upfront investment.</li>
        <li>You'll condition a few liters per day in glass bottles or a small dispenser.</li>
      </ul>
    </div>
    
    <div class="persona-card">
      <h3>👨‍👩‍👧‍👦 Family & Studio – 4 L Bundle</h3>
      <ul>
        <li>You have a small family or a small community space.</li>
        <li>You want everyone to drink from the same "house water".</li>
        <li>You run 1–3 dispensers or carboys, refilling them multiple times per week.</li>
      </ul>
    </div>
    
    <div class="persona-card">
      <h3>🧘 Retreat, Spa & Pro – 9 L Bundle</h3>
      <ul>
        <li>You host retreats, workshops or have a busy practice / spa.</li>
        <li>Your space already has a central water bar or multiple points of distribution.</li>
        <li>You want stable pricing, predictable supply and one consistent water experience for all your guests.</li>
      </ul>
    </div>
  </section>

  <!-- SECTION 6: Daily Integration -->
  <section class="content-section">
    <h2>From Bottle to Water Station – How It Feels in Everyday Life</h2>
    <p>Using Andara Ionic in 1 L bundles is not complicated. You simply create small rituals and systems:</p>
    <ol>
      <li><strong>Choose your base water:</strong> filtered, spring, or high-quality tap (depending on country and trust level).</li>
      <li><strong>Use the Andara Dilution Calculator</strong> to find a sulfate range and drops-per-liter that feels right to you.</li>
      <li><strong>Prepare larger batches:</strong>
        <ul>
          <li>5–10 L for home use</li>
          <li>20–50 L for studios and retreats</li>
        </ul>
      </li>
      <li><strong>Let the water stand,</strong> clarify and settle, then optionally filter mechanically.</li>
      <li><strong>Serve</strong> from glass dispensers, labeled carboys or stainless-steel tanks.</li>
    </ol>
    <p>Over time, Andara becomes simply "the way water is done here" – quietly in the background, like clean electricity or fresh air.</p>
  </section>

  <!-- SECTION 7: Safety -->
  <section class="content-section safety-section">
    <h2>Safety, Boundaries & Respect for the Water</h2>
    <p>Andara Ionic is designed as a water clarification and conditioning solution. It is not a medicine, not a cure and not a replacement for professional advice.</p>
    <p>We invite you to:</p>
    <ul>
      <li>Respect the suggested sulfate ranges and dilution tables</li>
      <li>Stay within reasonable dose windows – more is not always better</li>
      <li>Combine Andara with good filtration and common sense</li>
      <li>See it as part of a terrain approach: water, minerals, light, breath, rest</li>
    </ul>
    <p>For any health questions, always consult trusted professionals. We focus on water behaviour, mineral logic and structural coherence.</p>
  </section>

  <!-- SECTION 8: FAQ -->
  <section class="content-section faq-section">
    <h2>FAQ – 1 L Bundles in Practice</h2>
    
    <div class="faq-item">
      <h3>How many liters can I condition with one 1 L bottle?</h3>
      <p>It depends on your chosen dilution and target sulfate range. As a rough orientation, many users condition hundreds of liters from a single bottle. The dilution calculator helps you plan precisely.</p>
    </div>
    
    <div class="faq-item">
      <h3>Does the taste of my water change a lot?</h3>
      <p>That depends on your base water and dose. Many people report that their water feels clearer, softer and easier to drink, but taste is always subjective.</p>
    </div>
    
    <div class="faq-item">
      <h3>Can I combine Andara with my existing filter system?</h3>
      <p>Yes. Many users filter first and then condition with Andara as a final step. Always respect the manufacturer's recommendations for your filter system.</p>
    </div>
    
    <div class="faq-item">
      <h3>Is this safe for children or sensitive people?</h3>
      <p>We don't give medical advice. In a terrain philosophy, sensitive people often start with lower dose ranges and observe how they feel. For specific health conditions, please speak with a trusted professional.</p>
    </div>
    
    <div class="faq-item">
      <h3>What if my carboy or dispenser shows sediment?</h3>
      <p>Sediment or flocculation can be a sign that particles are grouping and settling. Many users simply let it settle and/or filter mechanically before drinking.</p>
    </div>
  </section>

  <!-- SECTION 9: CTA -->
  <section class="content-section cta-section">
    <h2>Choose the Bundle That Matches Your Space</h2>
    <p>Whether you're just beginning or already hosting a whole community, there is an Andara 1 L bundle that matches your rhythm:</p>
    <ul>
      <li><strong>Home Core</strong> – when you're starting your water evolution</li>
      <li><strong>Family & Studio</strong> – when more hearts drink from the same source</li>
      <li><strong>Retreat, Spa & Pro</strong> – when water becomes part of your professional field</li>
    </ul>
    <div class="cta-button">
      <a href="/shop/andara-ionic-1l" class="btn btn-primary">View 1 L Bundles & Pricing</a>
    </div>
  </section>
</article>
  `,
  visualConfig: {
    heroImage: "/images/textures/shop_light_texture.webp",
    heroIconName: "Package",
    motionPreset: "staggered-grid",
    vibeKeywords: ["mineral", "professional", "family", "bulk", "value"],
    designerNotes: "Clean product-focused layout with bundle comparison cards. Professional aesthetic for B2B audience.",
    emotionalTone: ["practical", "trustworthy"]
  },
  metadata: {
    focusKeywords: [
      "andara ionic 1 liter",
      "andara bundles",
      "sulfate mineral water concentrate",
      "family water station",
      "professional water conditioning"
    ],
    bundleTypes: ["home-core", "family-studio", "retreat-pro"],
    targetAudience: ["families", "retreats", "practitioners", "studios"]
  }
};

async function insertPage() {
  console.log("Inserting page:", pageData.title);
  console.log("Path:", pageData.path);

  try {
    // Check if page already exists
    const existing = await db.select().from(pages).where(
      eq(pages.path, pageData.path)
    );

    if (existing.length > 0) {
      console.log("Page already exists, updating...");
      await db.update(pages)
        .set({
          ...pageData,
          updatedAt: new Date()
        })
        .where(eq(pages.path, pageData.path));
      console.log("✅ Page updated successfully!");
    } else {
      await db.insert(pages).values({
        ...pageData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log("✅ Page inserted successfully!");
    }

    // Verify
    const result = await db.select({ title: pages.title, path: pages.path, contentLength: pages.content })
      .from(pages)
      .where(eq(pages.path, pageData.path));

    console.log("Verification:", result[0]?.title, "- Content length:", result[0]?.contentLength?.length || 0, "chars");

  } catch (error) {
    console.error("Error inserting page:", error);
  } finally {
    process.exit(0);
  }
}

insertPage();

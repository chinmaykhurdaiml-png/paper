import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Feather, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Compass, 
  Leaf, 
  ArrowRight,
  BookOpen,
  Award,
  PenTool
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const paperGuides = [
    {
      gsm: '80 - 100 GSM',
      title: 'Everyday Notes & Ballpoint',
      description: 'Lightweight, smooth paper suited for quick scratchpads, daily errands, and standard gel ink pens.',
      badge: 'Daily Carry',
    },
    {
      gsm: '120 - 140 GSM',
      title: 'Fountain Pen & Journaling',
      description: 'Substantial opacity with minimal shadow. Absorbs fountain pen inks without bleeding or feathering.',
      badge: 'Writer Choice',
    },
    {
      gsm: '160 GSM',
      title: 'Bullet Journal & Mixed Media',
      description: 'Ultra-thick paper that accepts heavy ink, brush pens, markers, and light watercolor washes with zero ghosting.',
      badge: 'PaperNest Signature',
    },
    {
      gsm: '300 GSM',
      title: 'Cold-Pressed Watercolor',
      description: '100% pure cotton rag with subtle textured tooth designed for heavy saturated watercolor pigments.',
      badge: 'Fine Artist',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-10 sm:py-16">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EBF3EE] text-[#2D5A43] text-xs font-semibold uppercase tracking-wider">
            <Feather className="w-3.5 h-3.5" />
            <span>Our Origin & Purpose</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1F2421] leading-tight">
            Crafted for the timeless love of{' '}
            <span className="italic font-normal text-[#2D5A43]">ink and paper.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            PaperNest was founded on a simple truth: in an age of fleeting notifications and glass screens, putting a pen to archival paper grounds the mind and breathes life into original ideas.
          </p>
        </div>

        {/* Studio Imagery Collage */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative rounded-3xl overflow-hidden aspect-4/3 shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80"
              alt="Artisan writing with brass pen on textured paper"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-stone-900/30" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-serif text-sm font-semibold">Solid Machined Materials</p>
              <p className="text-[11px] text-stone-200">Untreated brass & anodized aluminum</p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-4/3 shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
              alt="Hand-bound linen journals on desk"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-stone-900/30" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-serif text-sm font-semibold">180° Smyth-Sewn Lay Flat</p>
              <p className="text-[11px] text-stone-200">Natural woven Belgian linen covers</p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-4/3 shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80"
              alt="Handmade watercolor pan palette"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-stone-900/30" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="font-serif text-sm font-semibold">Vibrant Mineral Pigments</p>
              <p className="text-[11px] text-stone-200">Lightfast artist-grade watercolor pans</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Brand Mission */}
      <section className="bg-white py-16 sm:py-20 border-y border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5B8266] mb-2">
                <span>The Story of PaperNest</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2421] mb-5 leading-snug">
                From a small tabletop workshop to a home for stationery lovers.
              </h2>
              <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
                <p>
                  PaperNest began in 2021 when our founder, frustrated by cheap see-through notebook paper and disposable plastic pens that leaked after three weeks, set out to locate traditional papermaking mills and heritage craftsmen.
                </p>
                <p>
                  We partnered with third-generation bookbinders in Jaipur who still stitch book spines by hand, and German nib masters who balance weight distribution to fractions of a gram. Every notebook, pen, and desk tray in our catalog exists because we personally tested it for months under fountain pen ink, heavy graphite, and gouache watercolor washes.
                </p>
                <p>
                  Today, PaperNest provides thousands of writers, poets, students, and architects across India with tools that don't just sit on a shelf—they become lifelong records of personal evolution.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-stone-100 flex items-center gap-6">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-[#2D5A43]">100%</h4>
                  <p className="text-xs text-stone-500">Acid-Free Archival Paper</p>
                </div>
                <div className="w-px h-10 bg-stone-200" />
                <div>
                  <h4 className="font-serif text-2xl font-bold text-[#2D5A43]">0g</h4>
                  <p className="text-xs text-stone-500">Single-Use Plastic Packaging</p>
                </div>
                <div className="w-px h-10 bg-stone-200" />
                <div>
                  <h4 className="font-serif text-2xl font-bold text-[#2D5A43]">4.9★</h4>
                  <p className="text-xs text-stone-500">Average Customer Rating</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-[#FAF9F5] p-2">
                <img
                  src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80"
                  alt="Vintage desk setting with open journal and fountain pen"
                  className="rounded-2xl w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#2D5A43] text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                <p className="font-serif text-sm italic mb-1">
                  "Writing is the physical embodiment of breathing onto paper."
                </p>
                <p className="text-[11px] text-stone-300 font-semibold">— PaperNest Atelier Manifesto</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Pillars: Quality, Creativity, Affordability */}
      <section id="pillars" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5B8266] mb-2">
            <span>Our Guiding Principles</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2421] mb-3">
            Built on Three Enduring Pillars
          </h2>
          <p className="text-sm text-stone-600">
            How we make design decisions, choose materials, and price our collections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Quality */}
          <div className="bg-white rounded-3xl p-8 border border-[#EAE6DF] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#EBF3EE] text-[#2D5A43] flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-bold text-[#5B8266] tracking-widest uppercase block mb-1">
                Pillar 01
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                Uncompromising Quality
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                We believe stationery should outlive the year it was made. That is why our journal leaves are 160 GSM bamboo paper that never bleeds, our pen bodies are precision-machined solid metals, and our inks are lightfast archival formulas.
              </p>
            </div>
            <ul className="text-xs text-stone-500 space-y-2 pt-4 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43]" /> Smyth-sewn binding opens 180° flat
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43]" /> Tested with wet fountain pen nibs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A43]" /> Acid-free pH neutral sheets
              </li>
            </ul>
          </div>

          {/* Pillar 2: Creativity */}
          <div className="bg-white rounded-3xl p-8 border border-[#EAE6DF] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FDF9F0] text-amber-700 flex items-center justify-center mb-6">
                <PenTool className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-bold text-amber-700 tracking-widest uppercase block mb-1">
                Pillar 02
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                Sparking Creativity
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Blank pages shouldn't feel intimidating. We design subtle dot-grids, gentle cream-toned paper that protects against harsh glare, and ergonomic pen grips that encourage hours of spontaneous sketching, prose, and daily habit mapping.
              </p>
            </div>
            <ul className="text-xs text-stone-500 space-y-2 pt-4 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Eye-protective warm ivory paper tint
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Fosters friction-free flow state
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Compatible with all creative media
              </li>
            </ul>
          </div>

          {/* Pillar 3: Affordability */}
          <div className="bg-white rounded-3xl p-8 border border-[#EAE6DF] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#F3EBDD] text-[#78593A] flex items-center justify-center mb-6">
                <Award className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-bold text-[#78593A] tracking-widest uppercase block mb-1">
                Pillar 03
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
                Honest Affordability
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Luxury stationery shouldn't be an elitist collector's item. By eliminating foreign middlemen and working with local Indian paper workshops, we offer heirloom-caliber items at realistic, democratic prices in Indian Rupees.
              </p>
            </div>
            <ul className="text-xs text-stone-500 space-y-2 pt-4 border-t border-stone-100">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#78593A]" /> Direct artisan craft partnerships
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#78593A]" /> Fair living wages for binders & turners
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#78593A]" /> Zero marketing hype tax
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Paper Weight & Materials Guide */}
      <section id="materials" className="py-16 bg-[#F5F3EC]/70 border-y border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5B8266] mb-2">
              <span>The PaperNest Academy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2421] mb-3">
              Understanding Paper Weights (GSM)
            </h2>
            <p className="text-sm text-stone-600">
              Not all paper is created equal. Here is our straightforward guide to selecting the right paper weight for your medium.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paperGuides.map((guide, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-[#EAE6DF] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block bg-[#EBF3EE] text-[#2D5A43] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-4">
                    {guide.badge}
                  </span>
                  <h4 className="font-mono text-xl font-bold text-[#1F2421] mb-1">
                    {guide.gsm}
                  </h4>
                  <h5 className="font-serif text-base font-bold text-stone-800 mb-2">
                    {guide.title}
                  </h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {guide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 text-center max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-[#1F2421] mb-4">
          Ready to discover your next writing companion?
        </h2>
        <p className="text-sm text-stone-600 mb-8 max-w-lg mx-auto leading-relaxed">
          Explore our handpicked collection of fountain pens, journals, and desk essentials crafted to inspire you every day.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#2D5A43] hover:bg-[#234735] text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md active:scale-98"
        >
          <span>Explore The Shop</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
};

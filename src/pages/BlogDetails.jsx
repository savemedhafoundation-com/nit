import { Link, useParams } from 'react-router-dom';

const blogPosts = {
  '1': {
    title: 'Guardians of the Pride: The Urgency of Lion Conservation Efforts',
    category: 'Wildlife',
    date: 'Thursday, 03 Feb 2025',
    readTime: '6 min read',
    author: 'Rosa Alvarez',
    heroImage:
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=2000&auto=format&fit=crop',
    intro:
      'Across the savannah, lion numbers continue to decline as habitats shrink and conflict rises. Conservation teams are shifting toward community-first programs that protect both predators and livelihoods.',
    sections: [
      {
        heading: 'Why lions are disappearing',
        body:
          'Fragmented habitats, illegal hunting, and reduced prey populations have put lion prides under severe pressure. Protecting remaining corridors is now as important as creating new reserves.',
      },
      {
        heading: 'Community-led solutions',
        body:
          'Local ranger units, livestock insurance, and youth education programs are changing the story. When communities are invested in wildlife protection, long-term outcomes improve.',
      },
      {
        heading: 'How to support the work',
        body:
          'Fund field patrols, sponsor monitoring collars, and back local leadership. Every contribution helps sustain healthy pride territories.',
      },
    ],
    keyPoints: [
      'Human-wildlife conflict remains the fastest growing threat.',
      'Corridor protection helps maintain genetic diversity.',
      'Local stewardship programs deliver the strongest results.',
    ],
  },
  '2': {
    title: 'Unveiling the Enigmatic World of Giant Pandas',
    category: 'Wildlife',
    date: 'Tuesday, 28 Jan 2025',
    readTime: '5 min read',
    author: 'Gani Murata',
    heroImage:
      'https://images.unsplash.com/photo-1508264165352-258a6c3b43de?q=80&w=2000&auto=format&fit=crop',
    intro:
      'Giant pandas rely on delicate mountain ecosystems and a steady bamboo supply. Conservation teams are now focusing on climate resiliency plans for bamboo forests.',
    sections: [
      {
        heading: 'A habitat shaped by bamboo',
        body:
          'Bamboo blooms occur in cycles, and a single failed cycle can push a region into crisis. Restoring bamboo diversity gives pandas a stable food supply.',
      },
      {
        heading: 'Tracking and care',
        body:
          'Wildlife teams use remote cameras and health checks to understand panda migration patterns. These tools help identify new corridors and breeding habitats.',
      },
    ],
    keyPoints: [
      'Forest restoration reduces food supply disruptions.',
      'Climate planning protects future bamboo growth.',
      'Monitoring programs improve habitat selection.',
    ],
  },
  '3': {
    title: 'Exploring the Fascinating Realm of Birds',
    category: 'Birds',
    date: 'Monday, 20 Jan 2025',
    readTime: '4 min read',
    author: 'Mansi Patel',
    heroImage:
      'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=2000&auto=format&fit=crop',
    intro:
      'From coastal wetlands to alpine valleys, birds reveal the health of every ecosystem they cross. Conservationists now rely on soundscapes to measure recovery.',
    sections: [
      {
        heading: 'Soundscapes as data',
        body:
          'Audio monitoring stations capture daily bird calls. Changes in frequency and diversity tell researchers how habitats are rebounding.',
      },
      {
        heading: 'Protecting migration routes',
        body:
          'Birds depend on safe nesting and resting grounds along migration paths. Small protected zones can have an outsized impact.',
      },
    ],
    keyPoints: [
      'Audio data improves ecosystem monitoring.',
      'Rest stop habitats are critical during migration.',
      'Community science projects expand coverage.',
    ],
  },
};

const BlogDetails = () => {
  const { id } = useParams();
  const post = blogPosts[id] || blogPosts['1'];

  return (
    <section className="bg-[#f3f1ec] text-slate-900" style={{ fontFamily: '"Source Sans 3", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@400;500;600&display=swap');
      `}</style>
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link className="hover:text-[#4d6b2f]" to="/">
                Home
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li>
              <Link className="hover:text-[#4d6b2f]" to="/blog">
                Blog
              </Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-700">{post.category}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[2.1fr_1fr]">
          <article className="overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_-40px_rgba(0,0,0,0.6)]">
            <div className="relative h-64 sm:h-72 lg:h-96">
              <img className="h-full w-full object-cover" src={post.heroImage} alt={post.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              <span className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
                {post.category}
              </span>
            </div>
            <div className="p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{post.date}</p>
              <h1
                className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>By {post.author}</span>
                <span className="text-slate-300">|</span>
                <span>{post.readTime}</span>
              </div>
              <p className="mt-6 text-base leading-relaxed text-slate-700">{post.intro}</p>

              <div className="mt-8 space-y-6">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2
                      className="text-xl font-semibold text-slate-900"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      {section.heading}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-slate-700">{section.body}</p>
                  </section>
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-[#e7e3dc] p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Key Points</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {post.keyPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#4d6b2f]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3
                className="text-lg font-semibold text-slate-900"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Continue the journey
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Discover more field stories and meet the people protecting biodiversity on the ground.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  className="rounded-full bg-[#4d6b2f] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                  to="/blog"
                >
                  Back to blog
                </Link>
                <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                  Share
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;

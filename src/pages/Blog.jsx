import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroBanner from '../assets/photo/bg.png';
import getInvolvedImage from '../assets/photo/ethicalGuidance.png';
import api from '../utils/api';

const Blog = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadLatestBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/blogs?limit=12');
        const items = Array.isArray(data?.data) ? data.data : [];
        if (isMounted) {
          setLatestBlogs(items);
        }
      } catch (error) {
        if (isMounted) {
          setLatestBlogs([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLatestBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = value => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const featuredContent = latestBlogs[0]
    ? {
        id: latestBlogs[0]._id,
        title: latestBlogs[0].title,
        author: latestBlogs[0].writtenBy || 'NIT',
        image: latestBlogs[0].imageUrl,
      }
    : null;

  const popularContent = latestBlogs
    .filter(blog => blog.spotlight)
    .slice(0, 2)
    .map(blog => ({
      id: blog._id,
      title: blog.title,
      author: blog.writtenBy || 'NIT',
      image: blog.imageUrl,
    }))
    .concat(
      latestBlogs
        .filter(blog => !blog.spotlight)
        .slice(1, 3)
        .map(blog => ({
          id: blog._id,
          title: blog.title,
          author: blog.writtenBy || 'NIT',
          image: blog.imageUrl,
        }))
    )
    .slice(0, 2);

  const latestFeed = latestBlogs.slice(0, 6).map(blog => ({
    id: blog._id,
    title: blog.title,
    image: blog.imageUrl,
    date: formatDate(blog.createdAt),
  }));

  const loadingBar = (
    <div className="mt-6 flex items-center justify-center">
      <div className="h-2 w-full max-w-[320px] overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-2/3 animate-pulse rounded-full bg-slate-400/60" />
      </div>
    </div>
  );

  return (
    <section className="bg-[#f3f1ec] text-slate-900" style={{ fontFamily: '"Source Sans 3", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@400;500;600&display=swap');
      `}</style>
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#4d6b2f] shadow-[0_30px_80px_-60px_rgba(0,0,0,0.6)]">
          <img
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            src={heroBanner}
            alt="Lush green habitat"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2f3c1a]/85 via-[#2f3c1a]/60 to-transparent" />
          <div className="relative z-10 px-6 py-16 sm:px-10 lg:px-16">
            <p className="text-xs uppercase tracking-[0.3em] text-lime-100/80">Home / What We Do</p>
            <h1
              className="mt-6 max-w-2xl text-3xl font-semibold text-white sm:text-4xl lg:text-[42px]"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Nature Is Essential For The Survival Of All Life On Earth. But It&apos;s Diminishing, Fast.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-lime-50/90 sm:text-base">
              Explore conservation stories, field notes, and the people rebuilding ecosystems across the globe.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">What We Do</p>
              <h2
                className="mt-2 text-2xl font-semibold text-slate-900"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Popular Articles
              </h2>
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-sm">
              &gt;
            </button>
          </div>

          {loading && loadingBar}
          {!loading && featuredContent && (
            <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
              <Link
                to={`/blog/${featuredContent.id}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_-30px_rgba(0,0,0,0.6)]"
              >
                <div className="relative h-56 sm:h-64 lg:h-[360px]">
                  <img
                    className="h-full w-full object-cover"
                    src={featuredContent.image}
                    alt={featuredContent.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
                    By {featuredContent.author}
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-lg font-semibold text-slate-900 group-hover:text-[#4d6b2f]"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    {featuredContent.title}
                  </h3>
                </div>
              </Link>
              <div className="space-y-4">
                {popularContent.map(article => (
                  <Link
                    key={article.id}
                    to={`/blog/${article.id}`}
                    className="block overflow-hidden rounded-2xl bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-4 p-3">
                      <img className="h-16 w-16 rounded-xl object-cover" src={article.image} alt={article.title} />
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Spotlight</p>
                        <h3
                          className="text-sm font-semibold text-slate-800"
                          style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                          {article.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
                 <div className="rounded-2xl bg-[#e7e3dc] p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Highlights</h3>
                <p className="mt-3 text-sm text-slate-600">
                  Field researchers share the newest insights on wildlife care, habitat restoration, and community-led
                  conservation.
                </p>
                <button className="mt-5 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
                  Read the digest
                </button>
              </div>
              </div>
            </div>
          )}
          {!loading && !featuredContent && (
            <p className="mt-6 text-sm text-slate-500">No blogs available yet.</p>
          )}
        </div>

        <div className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">What We Do</p>
              <h2
                className="mt-2 text-2xl font-semibold text-slate-900"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Latest What We Do
              </h2>
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-sm">
              &gt;&gt;
            </button>
          </div>
          {loading && loadingBar}
          {!loading && latestFeed.length > 0 && (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestFeed.map(article => (
                <Link
                  key={article.id}
                  to={`/blog/${article.id}`}
                  className="block overflow-hidden rounded-2xl bg-white shadow-[0_16px_36px_-28px_rgba(0,0,0,0.6)]"
                >
                  <div className="relative h-44">
                    <img className="h-full w-full object-contain" src={article.image} alt={article.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{article.date}</p>
                    <h3
                      className="mt-2 text-sm font-semibold text-slate-900"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {!loading && latestFeed.length === 0 && (
            <p className="mt-6 text-sm text-slate-500">No blogs available yet.</p>
          )}
        </div>

        <div className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Our Project</p>
              <h2
                className="mt-2 text-2xl font-semibold text-slate-900"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Discover Our Global Conservation Projects
              </h2>
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-sm">
              &gt;
            </button>
          </div>
          {loading && loadingBar}
          {!loading && latestBlogs.length > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestBlogs.slice(0, 3).map(project => (
                <article
                  key={project._id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_-32px_rgba(0,0,0,0.6)]"
                >
                  <div className="relative h-44">
                    <img className="h-full w-full object-cover" src={project.imageUrl} alt={project.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-sm font-semibold text-slate-900 group-hover:text-[#4d6b2f]"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          )}
          {!loading && latestBlogs.length === 0 && (
            <p className="mt-6 text-sm text-slate-500">No blogs available yet.</p>
          )}
        </div>

        <div className="mt-16 overflow-hidden rounded-[28px] bg-[#f6f2ea] shadow-[0_30px_60px_-45px_rgba(0,0,0,0.6)]">
          <div className="relative grid gap-6 px-8 py-10 lg:grid-cols-[1.1fr_1fr] lg:px-12 lg:py-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Get Involved</p>
              <h2
                className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Let&apos;s Save Nature Together For People &amp; Planet
              </h2>
              <p className="mt-4 text-sm text-slate-600 sm:text-base">
                Join field missions, fund local guardians, and co-create biodiversity corridors that will thrive for
                generations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-[#4d6b2f] px-5 py-2 text-sm font-semibold text-white shadow-md">
                  Become a Guardian
                </button>
                <button className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700">
                  Explore Stories
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,#ffffff,transparent_60%)]" />
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  className="h-full w-full object-cover"
                  src={getInvolvedImage}
                  alt="Wildlife closeup"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <p
                  className="absolute bottom-3 left-4 text-[72px] font-semibold uppercase tracking-[0.2em] text-white/80"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Flouna
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;

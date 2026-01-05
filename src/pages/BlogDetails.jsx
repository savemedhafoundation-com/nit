import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import heroImageOne from '../assets/photo/recovery.png';
import api from '../utils/api';

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: '' });
  const [commentForm, setCommentForm] = useState({ name: '', phoneNumber: '', comment: '' });
  const [commentStatus, setCommentStatus] = useState({ loading: false, error: '', success: '' });
  const [liked, setLiked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPost = async () => {
      setStatus({ loading: true, error: '' });
      try {
        const { data } = await api.get(`/blogs/${id}`);
        if (isMounted) {
          setPost(data);
          setStatus({ loading: false, error: '' });
        }
      } catch (error) {
        if (isMounted) {
          setPost(null);
          setStatus({ loading: false, error: 'Unable to load this blog right now.' });
        }
      }
    };

    if (id) {
      loadPost();
    } else {
      setStatus({ loading: false, error: 'Missing blog id.' });
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

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

  const stripHtml = value => (value ? value.replace(/<(.|\n)*?>/g, ' ').trim() : '');

  const readTime = value => {
    const text = stripHtml(value);
    if (!text) return '';
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const keyPoints = Array.isArray(post?.keyPoints)
    ? post.keyPoints
    : Array.isArray(post?.metadata)
    ? post.metadata
    : [];

  const buildYouTubeEmbed = link => {
    if (!link) return '';
    const match = link.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  };

  const renderDescription = () => {
    const html = post?.description || '';
    if (!html) return null;

    const tokens = ['AdminStatement', 'youtubevideo', 'image1'];
    const parts = html.split(new RegExp(`(${tokens.join('|')})`, 'g'));
    const youtubeEmbed = buildYouTubeEmbed(post?.videoLinks?.[0]);
    const blogImageUrl = post?.blogImage?.[0]?.imageUrl;

    return parts.map((part, index) => {
      if (part === 'AdminStatement') {
        if (
          post?.adminStatement &&
          (post.adminStatement.photoUrl ||
            post.adminStatement.quotation ||
            post.adminStatement.name ||
            post.adminStatement.designation)
        ) {
          return (
            <div
              key={`admin-${index}`}
              className="relative my-8 rounded-2xl border border-slate-200 bg-white px-6 pb-6 pt-12 shadow-sm"
            >
              {post.adminStatement.photoUrl && (
                <img
                  className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white object-cover shadow-lg"
                  src={post.adminStatement.photoUrl}
                  alt={post.adminStatement.name || 'Admin'}
                />
              )}
              <div className="space-y-3 text-sm text-slate-700">
                {post.adminStatement.quotation && (
                  <p className="italic">"{post.adminStatement.quotation}"</p>
                )}
                {(post.adminStatement.name || post.adminStatement.designation) && (
                  <div className="text-sm font-semibold text-slate-900">
                    {post.adminStatement.name || 'Admin'}
                    {post.adminStatement.designation
                      ? `, ${post.adminStatement.designation}`
                      : ''}
                  </div>
                )}
              </div>
            </div>
          );
        }
        return null;
      }

      if (part === 'youtubevideo') {
        if (!youtubeEmbed) return null;
        return (
          <div key={`video-${index}`} className="my-6 overflow-hidden rounded-2xl">
            <iframe
              title="YouTube video"
              src={youtubeEmbed}
              className="h-64 w-full sm:h-80"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }

      if (part === 'image1') {
        if (!blogImageUrl) return null;
        return (
          <div key={`image-${index}`} className="my-6 overflow-hidden rounded-2xl">
            <img className="h-full w-full object-cover" src={blogImageUrl} alt="Blog" />
          </div>
        );
      }

      if (!part.trim()) return null;
      return (
        <div
          key={`html-${index}`}
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: part }}
        />
      );
    });
  };

  const handleLike = async () => {
    if (!post?._id) return;
    if (liked) return;
    try {
      const { data } = await api.post(`/blogs/${post._id}/like`);
      setPost(prev => (prev ? { ...prev, likesCount: data.likesCount } : prev));
      setLiked(true);
      localStorage.setItem(`liked-blog-${post._id}`, 'true');
    } catch (error) {
      setStatus(prev => ({ ...prev, error: 'Unable to update likes right now.' }));
    }
  };

  const handleShare = async () => {
    if (!post?._id) return;
    setShareOpen(true);
  };

  const handleCommentChange = event => {
    const { name, value } = event.target;
    setCommentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = async event => {
    event.preventDefault();
    if (!post?._id) return;

    const payload = {
      name: commentForm.name.trim(),
      phoneNumber: commentForm.phoneNumber.trim(),
      comment: commentForm.comment.trim(),
    };

    if (!payload.name || !payload.phoneNumber || !payload.comment) {
      setCommentStatus({ loading: false, error: 'All comment fields are required.', success: '' });
      return;
    }

    try {
      setCommentStatus({ loading: true, error: '', success: '' });
      const { data } = await api.post(`/blogs/${post._id}/comments`, payload);
      setPost(prev =>
        prev ? { ...prev, comments: [...(prev.comments || []), data] } : prev
      );
      setCommentForm({ name: '', phoneNumber: '', comment: '' });
      setCommentStatus({ loading: false, error: '', success: 'Comment added.' });
    } catch (error) {
      setCommentStatus({
        loading: false,
        error: error.response?.data?.message || 'Unable to add comment.',
        success: '',
      });
    }
  };

  const handleShareClick = async platform => {
    if (!post?._id) return;
    const shareUrl = window.location.href;
    const title = post.title || 'Blog';
    const text = `Check out this blog: ${title}`;
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl}`)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n${shareUrl}`)}`,
    };

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch (error) {
        // Ignore clipboard errors.
      }
    } else if (links[platform]) {
      window.open(links[platform], '_blank', 'noopener,noreferrer');
    }

    try {
      const { data } = await api.post(`/blogs/${post._id}/share`);
      setPost(prev => (prev ? { ...prev, sharesCount: data.sharesCount } : prev));
    } catch (error) {
      setStatus(prev => ({ ...prev, error: 'Unable to update shares right now.' }));
    }
  };

  useEffect(() => {
    if (!post?._id) return;
    const stored = localStorage.getItem(`liked-blog-${post._id}`) === 'true';
    setLiked(stored);
  }, [post?._id]);

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
            <li className="text-slate-700">{post?.category || 'Blog'}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[2.1fr_1fr]">
          <article className="overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_-40px_rgba(0,0,0,0.6)]">
            <div className="relative h-64 sm:h-72 lg:h-96">
              <img
                className="h-full w-full object-cover"
                src={post?.imageUrl || heroImageOne}
                alt={post?.title || 'Blog'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              <span className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
                {post?.category || 'Blog'}
              </span>
            </div>
            <div className="p-8">
              {status.loading && (
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Loading...</p>
              )}
              {!status.loading && status.error && (
                <p className="text-xs uppercase tracking-[0.25em] text-red-500">{status.error}</p>
              )}
              {!status.loading && !status.error && (
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  {formatDate(post?.createdAt)}
                </p>
              )}
              <h1
                className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                {post?.title || 'Blog'}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>By {post?.writtenBy || 'NIT'}</span>
                <span className="text-slate-300">|</span>
                <span>{readTime(post?.description)}</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>Likes: {post?.likesCount ?? 0}</span>
                <span className="text-slate-300">|</span>
                <span>Shares: {post?.sharesCount ?? 0}</span>
                <span className="text-slate-300">|</span>
                <span>Comments: {post?.comments?.length ?? 0}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleLike}
                  disabled={liked}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700"
                >
                  {liked ? 'Liked' : 'Like'}
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700"
                >
                  Share
                </button>
              </div>

              {post?.description && <div className="mt-6">{renderDescription()}</div>}

              {Array.isArray(post?.faqs) && post.faqs.length > 0 && (
                <div className="mt-8 rounded-2xl bg-[#f6f2ea] p-6">
                  <h3
                    className="text-lg font-semibold text-slate-900"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    FAQs
                  </h3>
                  <div className="mt-4 space-y-4 text-sm text-slate-700">
                    {post.faqs.map(faq => (
                      <div key={faq._id || faq.question}>
                        <p className="font-semibold text-slate-900">{faq.question}</p>
                        <p className="mt-1">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          <aside className="space-y-6">
            {keyPoints.length > 0 && (
              <div className="rounded-2xl bg-[#e7e3dc] p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Key Points</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {keyPoints.map(point => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#4d6b2f]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3
                className="text-lg font-semibold text-slate-900"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Comments
              </h3>
              <form className="mt-4 space-y-3" onSubmit={handleCommentSubmit}>
                <input
                  className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
                  name="name"
                  placeholder="Your name"
                  value={commentForm.name}
                  onChange={handleCommentChange}
                />
                <input
                  className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={commentForm.phoneNumber}
                  onChange={handleCommentChange}
                />
                <textarea
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
                  name="comment"
                  placeholder="Write a comment..."
                  rows="3"
                  value={commentForm.comment}
                  onChange={handleCommentChange}
                />
                {commentStatus.error && (
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
                    {commentStatus.error}
                  </p>
                )}
                {commentStatus.success && (
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    {commentStatus.success}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={commentStatus.loading}
                  className="rounded-full bg-[#4d6b2f] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                >
                  {commentStatus.loading ? 'Posting...' : 'Post comment'}
                </button>
              </form>
              {Array.isArray(post?.comments) && post.comments.length > 0 && (
                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                  {post.comments.map(item => (
                    <li key={item._id || `${item.name}-${item.createdAt}`}>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.phoneNumber}</p>
                      <p className="mt-1">{item.comment}</p>
                    </li>
                  ))}
                </ul>
              )}
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
      {shareOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3
                className="text-lg font-semibold text-slate-900"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Share this blog
              </h3>
              <button
                type="button"
                onClick={() => setShareOpen(false)}
                className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700"
              >
                Close
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <button
                type="button"
                onClick={() => handleShareClick('facebook')}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
              >
                Facebook
              </button>
              <button
                type="button"
                onClick={() => handleShareClick('twitter')}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
              >
                Twitter
              </button>
              <button
                type="button"
                onClick={() => handleShareClick('linkedin')}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
              >
                LinkedIn
              </button>
              <button
                type="button"
                onClick={() => handleShareClick('whatsapp')}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
              >
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => handleShareClick('email')}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => handleShareClick('copy')}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700"
              >
                Copy link
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogDetails;

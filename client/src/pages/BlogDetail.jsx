import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../hooks/useBlogs';
import { Frown, MapPin } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams();
  const { data, isLoading, error } = useBlog(slug);
  const blog = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/4" />
          <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Frown className="w-12 h-12 text-slate-300 dark:text-slate-600" />
        <h2 className="text-2xl font-bold mt-4 mb-2">Article not found</h2>
        <p className="text-slate-500 mb-6">This blog post doesn't exist or has been removed.</p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  const { title, content, coverImage, author, createdAt, tags, destination } = blog;
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const imageUrl = coverImage?.url || 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200';

  return (
    <article>
      <div className="relative h-48 md:h-72 pt-20 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link to="/blog" className="hover:text-primary-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-700 dark:text-slate-300 truncate">{title}</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold mb-4">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
            <span>By <strong className="text-slate-700 dark:text-slate-300">{author}</strong></span>
            <span>{date}</span>
            {destination && (
              <Link to={`/destinations/${destination.slug}`} className="text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {destination.name}
              </Link>
            )}
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:font-bold prose-a:text-primary-600 leading-relaxed">
            {content.split('\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="text-xl md:text-2xl font-bold mt-8 mb-3">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={i} className="text-lg md:text-xl font-bold mt-6 mb-2">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.trim()) {
                return <p key={i} className="mb-4 text-slate-600 dark:text-slate-400">{paragraph}</p>;
              }
              return null;
            })}
          </div>

          {tags && tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

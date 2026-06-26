import BlogCard from '../components/BlogCard';
import { useBlogs } from '../hooks/useBlogs';
import { FileText } from 'lucide-react';

export default function Blog() {
  const { data, isLoading } = useBlogs({ limit: 20 });
  const blogs = data?.data || [];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 text-white pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Atiq Travel Blog</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Travel tips, destination guides, and stories from our adventures around the world
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse h-72" />
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((b) => (
                  <BlogCard key={b._id} blog={b} />
                ))}
              </div>
              <div className="mt-10 text-center text-sm text-slate-500">
                Showing {blogs.length} article{blogs.length !== 1 ? 's' : ''}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600" />
              <h3 className="text-xl font-bold mt-4 mb-2">No articles yet</h3>
              <p className="text-slate-500">Check back soon for new travel stories and guides</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

interface RecommendedArticlesProps {
  currentPost: BlogPost;
  allPosts: Record<string, BlogPost>;
}

export function RecommendedArticles({ currentPost, allPosts }: RecommendedArticlesProps) {
  const categoryLabels: Record<string, string> = {
    'technicke': 'Technické články',
    'zateplovanie': 'Zatepľovanie',
    'sanacia': 'Sanácia',
    'prakticke': 'Praktické rady'
  };

  // Get related articles by category (excluding current post)
  const relatedPosts = Object.values(allPosts)
    .filter(post => post.category === currentPost.category && post.id !== currentPost.id)
    .slice(0, 3);

  // Get recent articles (excluding current post and related posts)
  const relatedIds = new Set(relatedPosts.map(p => p.id));
  const recentPosts = Object.values(allPosts)
    .filter(post => post.id !== currentPost.id && !relatedIds.has(post.id))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);

  const ArticleCard = ({ post, size = 'default' }: { post: BlogPost; size?: 'default' | 'compact' }) => (
    <article className={`group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 ${
      size === 'compact' ? '' : 'shadow-sm'
    }`}>
      <Link href={`/aktuality/${post.id}`} className="block">
        <div className={`relative overflow-hidden ${size === 'compact' ? 'aspect-[4/3]' : 'aspect-[16/9]'}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes={size === 'compact' ? '200px' : '300px'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className={`p-4 ${size === 'compact' ? 'p-3' : ''}`}>
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              <Tag className="h-3 w-3" />
              {categoryLabels[post.category]}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 ${
            size === 'compact' ? 'text-sm mb-2' : 'text-base mb-3'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt - only for default size */}
          {size === 'default' && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {post.excerpt}
            </p>
          )}

          {/* Date */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('sk-SK', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );

  return (
    <aside className="space-y-8">
      {/* Related Articles by Category */}
      {relatedPosts.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Súvisiace články
            </h2>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {categoryLabels[currentPost.category]}
            </span>
          </div>

          <div className="space-y-4">
            {relatedPosts.map((post) => (
              <ArticleCard key={post.id} post={post} size="compact" />
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles */}
      {recentPosts.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Najnovšie články
          </h2>

          <div className="space-y-4">
            {recentPosts.map((post) => (
              <ArticleCard key={post.id} post={post} size="compact" />
            ))}
          </div>
        </section>
      )}

    </aside>
  );
}
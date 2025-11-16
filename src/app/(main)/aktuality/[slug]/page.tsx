import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArticleTracingBeam } from '@/components/sections/article-tracing-beam';
import { RecommendedArticles } from '@/components/blog/recommended-articles';
import { BlogPost, blogPosts } from '@/data/blog-posts';

// Route segment config for optimal performance according to Next.js best practices
export const dynamic = 'force-static' // Force static generation for better performance
export const revalidate = 21600 // 6 hours - more frequent for blog content
export const preferredRegion = ['fra1', 'ams1'] // European regions for Slovak market
export const maxDuration = 10
export const fetchCache = 'default-cache' // Use default fetch caching behavior

// Static generation for blog articles
export async function generateStaticParams() {
  // Pre-generate static params for all blog articles
  const blogSlugs = Object.keys(blogPosts)

  return blogSlugs.map((slug) => ({
    slug: slug,
  }))
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug];

  if (!post) {
    return {
      title: 'Článok nenájdený | STYRCON Blog',
      description: 'Požadovaný článok nebol nájdený.',
    };
  }

  return {
    title: `${post.title} | STYRCON Blog | E-MA SK`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug];

  if (!post) {
    notFound();
  }
  
  const categoryLabels: Record<string, string> = {
    'technicke': 'Technické články',
    'zateplovanie': 'Zatepľovanie',
    'sanacia': 'Sanácia',
    'prakticke': 'Praktické rady'
  };

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-600 hover:text-primary">
              Domov
            </Link>
            <span className="text-slate-400">/</span>
            <Link href="/aktuality" className="text-slate-600 hover:text-primary">
              Aktuality
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-8 lg:py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="ghost" className="pl-0">
              <Link href="/aktuality">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Späť na články
              </Link>
            </Button>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">

            {/* Main Article Content */}
            <main className="lg:col-span-3 relative overflow-hidden">

              {/* Article Header */}
              <header className="mb-8">
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('sk-SK', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {categoryLabels[post.category]}
                    </span>
                  </div>
                </div>

                {/* Article Title */}
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Article Excerpt */}
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              </header>

              {/* Article Content with TracingBeam */}
              <ArticleTracingBeam post={post} />

              {/* Article Tags */}
              <footer className="mt-12 pt-8 border-t border-slate-200 relative overflow-hidden">
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Značky:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <Button asChild variant="outline">
                    <Link href="/aktuality">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Všetky články
                    </Link>
                  </Button>

                  <Button asChild>
                    <Link href="/kontakt">
                      Kontaktovať nás
                    </Link>
                  </Button>
                </div>
              </footer>
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <RecommendedArticles
                  currentPost={post}
                  allPosts={blogPosts}
                />
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  );
}
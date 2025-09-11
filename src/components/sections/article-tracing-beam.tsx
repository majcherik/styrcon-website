"use client";
import React from "react";
import { calsans } from "@/fonts/calsans";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../ui/tracing-beam";
import Image from "next/image";

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

interface ArticleSection {
  badge: string;
  title: string;
  description: React.ReactNode;
  image?: string;
}

interface ArticleTracingBeamProps {
  post: BlogPost;
}

function parseArticleContent(content: string, category: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  
  let currentSection: ArticleSection | null = null;
  let currentContent: string[] = [];

  // Category badge mapping
  const categoryLabels: Record<string, string> = {
    'technicke': 'Technické',
    'zateplovanie': 'Zatepľovanie',
    'sanacia': 'Sanácia',
    'prakticke': 'Praktické'
  };

  const renderContent = (contentArray: string[]) => (
    <>
      {contentArray.map((content, i) => {
        if (content.startsWith('**') && content.endsWith('**')) {
          return (
            <h4 key={i} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              {content.slice(2, -2)}
            </h4>
          );
        }
        if (content.startsWith('- ') || content.includes('\n- ')) {
          const items = content.split('\n').filter(item => item.startsWith('- '));
          return (
            <ul key={i} className="list-disc list-inside space-y-2 my-4 text-gray-700">
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{item.replace('- ', '')}</li>
              ))}
            </ul>
          );
        }
        if (content.startsWith('*') && content.endsWith('*')) {
          return (
            <div key={i} className="text-slate-600 italic bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 my-6">
              {content.replace(/^\*/, '').replace(/\*$/, '')}
            </div>
          );
        }
        return (
          <p key={i} className="mb-4 text-gray-700 leading-relaxed">
            {content}
          </p>
        );
      })}
    </>
  );

  paragraphs.forEach((paragraph, index) => {
    if (paragraph.startsWith('## ')) {
      // Save previous section if exists
      if (currentSection) {
        currentSection.description = renderContent(currentContent);
        sections.push(currentSection);
      }

      // Start new section
      const title = paragraph.replace('## ', '');
      currentSection = {
        badge: categoryLabels[category] || 'STYRCON',
        title: title,
        description: <></>,
      };
      currentContent = [];
    } else if (paragraph.startsWith('### ')) {
      // Subsection - treat as content with bold
      const subsectionTitle = paragraph.replace('### ', '');
      currentContent.push(`**${subsectionTitle}**`);
    } else {
      // Regular content
      currentContent.push(paragraph);
    }
  });

  // Add the last section
  if (currentSection) {
    currentSection.description = renderContent(currentContent);
    sections.push(currentSection);
  }

  // If no sections were created (no ## headers), create one section with all content
  if (sections.length === 0) {
    sections.push({
      badge: categoryLabels[category] || 'STYRCON',
      title: 'Úvod',
      description: renderContent(paragraphs),
    });
  }

  return sections;
}

export function ArticleTracingBeam({ post }: ArticleTracingBeamProps) {
  const sections = parseArticleContent(post.content, post.category);

  return (
    <TracingBeam className="px-6">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {sections.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-blue-600 text-white rounded-full text-sm w-fit px-4 py-1 mb-4 font-medium">
              {item.badge}
            </h2>

            <p className={twMerge(calsans.className, "text-xl mb-4 font-semibold text-gray-900")}>
              {item.title}
            </p>

            <div className="text-sm prose prose-sm dark:prose-invert">
              {index === 0 && post.image && (
                <div className="relative aspect-[16/9] mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}
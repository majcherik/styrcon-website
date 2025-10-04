'use client';

import { useState } from 'react';
import { Share2, Facebook, Linkedin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialShareProps {
  title: string;
  url: string;
  excerpt?: string;
}

export function SocialShare({ title, url, excerpt }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  // Use production site URL when available, fallback to current location or provided URL
  const shareUrl = typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}${url}`
        : window.location.href)
    : url;
  const shareText = excerpt || title;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(shareText)}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <span className="text-sm font-medium text-gray-700">Zdieľať článok:</span>

      <div className="flex items-center gap-3">
        {/* LinkedIn Share */}
        <Button
          onClick={() => handleShare('linkedin')}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
        >
          <Linkedin className="h-4 w-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </Button>

        {/* Facebook Share */}
        <Button
          onClick={() => handleShare('facebook')}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-blue-800 hover:text-white hover:border-blue-800 transition-colors"
        >
          <Facebook className="h-4 w-4" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>

        {/* Copy Link */}
        <Button
          onClick={handleCopyLink}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-gray-600 hover:text-white hover:border-gray-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span className="hidden sm:inline">Skopírované</span>
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Kopírovať</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
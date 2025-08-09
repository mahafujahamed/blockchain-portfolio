// components/ShareButtons.tsx
"use client";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export default function ShareButtons({ url }: { url: string }) {
  return (
    <div className="flex items-center space-x-3 mt-6">
      <span className="text-gray-600 dark:text-gray-300 font-semibold">Share:</span>
      <TwitterShareButton url={url} title="Check out this blog!">
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
}

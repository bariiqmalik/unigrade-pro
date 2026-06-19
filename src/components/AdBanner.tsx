"use client";

/**
 * AdBanner.tsx — Google AdSense display unit for UniGrade Pro.
 *
 * Performance contract:
 *  • This component is a CLIENT component — it calls `adsbygoogle.push()` only
 *    after hydration, never blocking SSR or FCP.
 *  • The actual adsbygoogle.js library is loaded via `next/script strategy="lazyOnload"`
 *    in layout.tsx, which defers the network fetch until after all page resources
 *    are loaded (equivalent to window.onload + idle time).
 *  • This component simply renders the <ins> slot and triggers the push once the
 *    script is already resident — no redundant script load here.
 */

import { useEffect } from "react";

// Extend the Window interface to satisfy TypeScript for the adsbygoogle global.
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  /** AdSense data-ad-slot value — unique per ad unit created in your AdSense dashboard */
  adSlot?: string;
  /** Ad format: "auto", "rectangle", "vertical", "horizontal" */
  adFormat?: string;
  /** Whether to enable full-width responsive mode */
  fullWidthResponsive?: boolean;
  className?: string;
}

export default function AdBanner({
  adSlot = "auto",
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}: AdBannerProps) {
  useEffect(() => {
    try {
      // Push only once the adsbygoogle script (loaded via next/script lazyOnload)
      // has initialised the global array. The try/catch silences the benign
      // "adsbygoogle already defined" warning during React Strict Mode double-invokes.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Silently ignore — happens in dev Strict Mode double-effect fire.
    }
  }, []);

  return (
    <div className={`ad-banner-wrapper overflow-hidden text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6775774159533443"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}

import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface SidebarAdProps {
  position: "left" | "right";
}

const SidebarAd: React.FC<SidebarAdProps> = ({ position }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Ad loading error:", err);
    }
  }, []);

  return (
    <div
      className={`fixed top-0 ${
        position === "left" ? "left-0" : "right-0"
      } h-full hidden lg:flex items-center justify-center p-4`}
      style={{ width: "160px" }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2686975437928535"
        data-ad-slot="6712949943"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default SidebarAd;

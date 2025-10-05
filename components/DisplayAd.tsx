import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const DisplayAd: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Ad loading error:", err);
    }
  }, []);

  return (
    <div className="w-full my-4 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2686975437928535"
        data-ad-slot="6106251761"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default DisplayAd;

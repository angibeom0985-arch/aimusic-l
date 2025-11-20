import React from "react";
import Card from "./Card";

interface Service {
  icon: string;
  title: string;
  description: string;
  url: string;
  gradient: string;
}

const services: Service[] = [
  {
    icon: "📹",
    title: "숏폼/롱폼 영상 소스 무제한 생성",
    description: "다양한 영상 소스를 빠르게 생성하세요",
    url: "https://youtube-image.money-hotissue.com/",
    gradient: "from-green-600 via-emerald-500 to-teal-600",
  },
  {
    icon: "🔥",
    title: "떡상한 영상의 대본 구조를 카피하기",
    description: "인기 대본을 분석하고 나만의 콘텐츠를 만드세요",
    url: "https://youtube-analyze.money-hotissue.com/",
    gradient: "from-orange-600 via-amber-500 to-yellow-600",
  },
];

const RelatedServices: React.FC = () => {
  const handleServiceClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="mt-16 mb-8">
      {/* 제목 섹션 */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-400 to-pink-500 bg-clip-text text-transparent mb-3"
          style={{
            filter:
              "drop-shadow(0 0 20px rgba(255, 165, 0, 0.5)) drop-shadow(0 0 40px rgba(255, 192, 203, 0.3))",
          }}
        >
          🎬 더 많은 영상 제작 도구가 필요하신가요?
        </h2>
      </div>

      {/* 서비스 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => handleServiceClick(service.url)}
            className="group cursor-pointer"
          >
            <Card>
              <div className="flex flex-col items-center text-center p-4 transition-all duration-300 group-hover:scale-105">
                {/* 아이콘 */}
                <div
                  className={`text-6xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}
                >
                  {service.icon}
                </div>

                {/* 제목 */}
                <h3
                  className={`text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                >
                  {service.title}
                </h3>

                {/* 설명 */}
                <p className="text-zinc-400 text-sm md:text-base mb-4">
                  {service.description}
                </p>

                {/* 버튼 */}
                <button
                  className={`w-full bg-gradient-to-r ${
                    service.gradient
                  } hover:shadow-lg hover:shadow-${
                    service.gradient.split(" ")[0].split("-")[1]
                  }/50 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md border-2 border-white/20`}
                >
                  바로 가기 →
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedServices;

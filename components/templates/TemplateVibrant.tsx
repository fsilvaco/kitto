import { MediaKitData } from "@/types";

interface TemplateVibrantProps {
  data: MediaKitData;
}

function formatNumber(value: string): string {
  const num = parseFloat(value.replace(/\D/g, ""));
  if (isNaN(num)) return value;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function TemplateVibrant({ data }: TemplateVibrantProps) {
  const brandList = data.brands
    .split(",")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div
      className="w-[600px] font-sans"
      style={{
        background: "linear-gradient(135deg, #7C3AED 0%, #C026D3 50%, #EC4899 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="px-12 py-10 space-y-6">
        {/* Profile */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-[3px] rounded-full bg-white/30">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 flex items-center justify-center backdrop-blur-sm">
              {data.profilePhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.profilePhoto}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-10 h-10 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">
              {data.name}
            </h1>
            <p className="text-white/80 font-medium mt-0.5 text-sm">{data.handle}</p>
          </div>

          <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/30">
            {data.niche}
          </span>
        </div>

        {/* Bio — glass card */}
        <div className="rounded-2xl p-5 bg-white/15 backdrop-blur-md border border-white/20 text-center space-y-1.5">
          <p className="text-white/90 leading-relaxed text-sm">{data.bio}</p>
          <p className="text-white/60 text-xs flex items-center justify-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {data.location}
          </p>
        </div>

        {/* Stats — glass cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Seguidores", value: formatNumber(data.followers) },
            { label: "Engajamento", value: `${data.engagementRate}%` },
            { label: "Alcance", value: formatNumber(data.reach) },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-4 text-center bg-white/15 backdrop-blur-md border border-white/20"
            >
              <p className="text-2xl font-bold text-white drop-shadow-sm">{stat.value}</p>
              <p className="text-xs text-white/70 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Content Types — glass card */}
        <div className="rounded-2xl p-5 bg-white/15 backdrop-blur-md border border-white/20 space-y-3">
          <p className="text-xs font-bold text-white/70 uppercase tracking-widest">
            Tipos de conteúdo
          </p>
          <div className="flex flex-wrap gap-2">
            {data.contentTypes.map((type) => (
              <span
                key={type}
                className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30 backdrop-blur-sm"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Brands — glass card */}
        <div className="rounded-2xl p-5 bg-white/15 backdrop-blur-md border border-white/20 space-y-3">
          <p className="text-xs font-bold text-white/70 uppercase tracking-widest">
            Marcas parceiras
          </p>
          <div className="flex flex-wrap gap-2">
            {brandList.map((brand) => (
              <span
                key={brand}
                className="px-3 py-1 rounded-full text-sm font-semibold bg-white/25 text-white border border-white/40"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Contact — glass card */}
        <div className="rounded-2xl p-4 bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-semibold text-white">{data.email}</span>
        </div>

        {/* Watermark */}
        <p className="text-center text-xs text-white/40 font-medium tracking-wide">
          Made with Kitto
        </p>
      </div>
    </div>
  );
}

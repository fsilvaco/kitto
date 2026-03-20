import { MediaKitData } from "@/types";

interface TemplateBoldProps {
  data: MediaKitData;
}

function formatNumber(value: string): string {
  const num = parseFloat(value.replace(/\D/g, ""));
  if (isNaN(num)) return value;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function TemplateBold({ data }: TemplateBoldProps) {
  const brandList = data.brands
    .split(",")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div
      className="w-[600px] font-sans"
      style={{ backgroundColor: "#0f0f0f", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="px-12 py-10 space-y-8">
        {/* Profile */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Glow ring */}
          <div
            className="relative w-28 h-28"
            style={{
              filter: "drop-shadow(0 0 16px #7C3AED) drop-shadow(0 0 32px #EC4899)",
            }}
          >
            <div className="p-[3px] rounded-full bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#7C3AED] w-full h-full">
              <div
                className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                {data.profilePhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={data.profilePhoto}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div>
            <h1
              className="text-3xl font-black text-white uppercase tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {data.name}
            </h1>
            <p
              className="font-bold mt-1 text-sm bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent"
            >
              {data.handle}
            </p>
          </div>

          <span
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-[#EC4899]/50 text-[#EC4899]"
            style={{ backgroundColor: "#EC49991a" }}
          >
            {data.niche}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />

        {/* Bio */}
        <div className="text-center space-y-1.5">
          <p className="text-gray-300 leading-relaxed text-sm font-light">{data.bio}</p>
          <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {data.location}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "SEGUIDORES", value: formatNumber(data.followers) },
            { label: "ENGAJAMENTO", value: `${data.engagementRate}%` },
            { label: "ALCANCE", value: formatNumber(data.reach) },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-4 text-center border border-white/5"
              style={{ backgroundColor: "#1a1a1a" }}
            >
              <p
                className="text-2xl font-black bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent"
              >
                {stat.value}
              </p>
              <p className="text-[10px] text-gray-500 mt-1 font-bold tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />

        {/* Content Types */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Tipos de conteúdo
          </p>
          <div className="flex flex-wrap gap-2">
            {data.contentTypes.map((type) => (
              <span
                key={type}
                className="px-3 py-1 rounded-md text-xs font-bold text-white border border-white/10 uppercase tracking-wide"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Marcas parceiras
          </p>
          <div className="flex flex-wrap gap-2">
            {brandList.map((brand) => (
              <span
                key={brand}
                className="px-3 py-1 rounded-md text-xs font-semibold text-[#EC4899] border border-[#EC4899]/30"
                style={{ backgroundColor: "#EC49991a" }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />

        {/* Contact */}
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-[#EC4899]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-semibold text-gray-300">{data.email}</span>
        </div>

        {/* Watermark */}
        <p className="text-center text-xs text-gray-700 font-medium tracking-wide">
          Made with Kitto
        </p>
      </div>
    </div>
  );
}

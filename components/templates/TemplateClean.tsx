import { MediaKitData } from "@/types";

interface TemplateCleanProps {
  data: MediaKitData;
}

function formatNumber(value: string): string {
  const num = parseFloat(value.replace(/\D/g, ""));
  if (isNaN(num)) return value;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function TemplateClean({ data }: TemplateCleanProps) {
  const brandList = data.brands
    .split(",")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div
      className="w-[600px] bg-white font-sans"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header gradient bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />

      <div className="px-12 py-10 space-y-8">
        {/* Profile */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-[3px] rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899]">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {data.profilePhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.profilePhoto}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] tracking-tight">{data.name}</h1>
            <p className="text-[#6B7280] font-medium mt-0.5">{data.handle}</p>
          </div>
          <span className="px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white">
            {data.niche}
          </span>
        </div>

        {/* Bio */}
        <div className="text-center space-y-1">
          <p className="text-[#374151] leading-relaxed text-sm">{data.bio}</p>
          <p className="text-[#6B7280] text-xs flex items-center justify-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {data.location}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Seguidores", value: formatNumber(data.followers) },
            { label: "Engajamento", value: `${data.engagementRate}%` },
            { label: "Alcance", value: formatNumber(data.reach) },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#f9fafb] rounded-2xl p-4 text-center border border-gray-100"
            >
              <p
                className="text-2xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent"
              >
                {stat.value}
              </p>
              <p className="text-xs text-[#6B7280] mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Content Types */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
            Tipos de conteúdo
          </p>
          <div className="flex flex-wrap gap-2">
            {data.contentTypes.map((type) => (
              <span
                key={type}
                className="px-3 py-1 rounded-full text-sm border border-[#7C3AED]/30 text-[#7C3AED] bg-[#7C3AED]/5 font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
            Marcas parceiras
          </p>
          <div className="flex flex-wrap gap-2">
            {brandList.map((brand) => (
              <span
                key={brand}
                className="px-3 py-1 rounded-full text-sm bg-[#f9fafb] text-[#374151] border border-gray-200 font-medium"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Contact */}
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a
            href={`mailto:${data.email}`}
            className="text-sm font-medium text-[#7C3AED] hover:underline"
          >
            {data.email}
          </a>
        </div>

        {/* Watermark */}
        <p className="text-center text-xs text-[#D1D5DB] font-medium tracking-wide">
          Made with Kitto
        </p>
      </div>

      {/* Footer gradient bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
    </div>
  );
}

"use client";

import { useKittoStore } from "@/store/useKittoStore";
import { TemplateId } from "@/types";
import { TemplateClean } from "@/components/templates/TemplateClean";
import { TemplateBold } from "@/components/templates/TemplateBold";
import { TemplateVibrant } from "@/components/templates/TemplateVibrant";
import { Button } from "@/components/ui/button";

const TEMPLATES: { id: TemplateId; label: string; description: string }[] = [
  {
    id: "clean",
    label: "Clean",
    description: "Minimalista e elegante",
  },
  {
    id: "bold",
    label: "Bold",
    description: "Dark e impactante",
  },
  {
    id: "vibrant",
    label: "Vibrant",
    description: "Colorido e energético",
  },
];

export function Step2Templates() {
  const { mediaKitData, selectedTemplate, setSelectedTemplate, setStep } =
    useKittoStore();

  function renderTemplate(id: TemplateId) {
    switch (id) {
      case "clean":
        return <TemplateClean data={mediaKitData} />;
      case "bold":
        return <TemplateBold data={mediaKitData} />;
      case "vibrant":
        return <TemplateVibrant data={mediaKitData} />;
    }
  }

  console.log(mediaKitData)

  return (
    <div className="space-y-8">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-[#111827]">Escolha seu template</h2>
        <p className="text-sm text-[#6B7280]">
          Selecione o estilo visual do seu media kit
        </p>
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {TEMPLATES.map(({ id, label, description }) => {
          const isSelected = selectedTemplate === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedTemplate(id)}
              className="group flex flex-col items-center gap-3 focus:outline-none"
            >
              {/* Preview container */}
              <div
                className={`relative rounded-2xl overflow-hidden transition-all duration-200 ${
                  isSelected
                    ? "ring-2 ring-offset-2 shadow-xl"
                    : "ring-1 ring-gray-200 hover:ring-[#7C3AED]/40 hover:shadow-lg"
                }`}
                style={
                  isSelected
                    ? {
                        boxShadow:
                          "0 0 0 2px #7C3AED, 0 0 0 4px #EC4899, 0 8px 32px rgba(124,58,237,0.25)",
                      }
                    : undefined
                }
              >
                {/* Gradient border when selected */}
                {isSelected && (
                  <div
                    className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, #7C3AED, #EC4899) border-box",
                      border: "2.5px solid transparent",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "destination-out",
                      maskComposite: "exclude",
                    }}
                  />
                )}

                {/* Scaled template preview */}
                <div
                  className="overflow-hidden"
                  style={{ width: "210px", height: "297px" }}
                >
                  <div
                    style={{
                      transform: "scale(0.35)",
                      transformOrigin: "top left",
                      width: `${600}px`,
                      pointerEvents: "none",
                    }}
                  >
                    {/* {renderTemplate(id)} */}
                  </div>
                </div>

                {/* Selected checkmark badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center shadow-lg">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="text-center">
                <p
                  className={`font-semibold text-sm transition-colors ${
                    isSelected ? "text-[#7C3AED]" : "text-[#111827]"
                  }`}
                >
                  {label}
                </p>
                <p className="text-xs text-[#6B7280]">{description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(1)}
          className="flex-1 h-11 border-gray-200 text-[#6B7280] hover:text-[#111827]"
        >
          ← Voltar
        </Button>
        <Button
          type="button"
          onClick={() => setStep(3)}
          className="flex-[2] h-11 text-base font-semibold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white border-0 hover:opacity-90 transition-opacity"
        >
          Ver preview →
        </Button>
      </div>
    </div>
  );
}

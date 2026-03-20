"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useKittoStore } from "@/store/useKittoStore";
import { MediaKitData, TemplateId } from "@/types";
import { TemplateClean } from "@/components/templates/TemplateClean";
import { TemplateBold } from "@/components/templates/TemplateBold";
import { TemplateVibrant } from "@/components/templates/TemplateVibrant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function renderTemplate(id: TemplateId, data: MediaKitData) {
  switch (id) {
    case "clean":
      return <TemplateClean data={data} />;
    case "bold":
      return <TemplateBold data={data} />;
    case "vibrant":
      return <TemplateVibrant data={data} />;
  }
}

export function Step3Preview() {
  const { mediaKitData, selectedTemplate, setStep } = useKittoStore();
  const [proModalOpen, setProModalOpen] = useState(false);

  function handleCopyLink() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copiado!", {
        description: "Cole e compartilhe seu media kit.",
        duration: 3000,
      });
    });
  }

  return (
    <div className="space-y-6">
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(2)}
          className="sm:flex-none h-11 border-gray-200 text-[#6B7280] hover:text-[#111827]"
        >
          ← Voltar
        </Button>

        <Button
          type="button"
          onClick={handleCopyLink}
          className="flex-1 h-11 font-semibold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white border-0 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Gerar Link
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => setProModalOpen(true)}
          className="flex-1 h-11 font-semibold border-[#7C3AED]/30 text-[#7C3AED] hover:bg-[#7C3AED]/5 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Baixar PDF
          <Badge className="ml-1 text-[10px] px-1.5 py-0 h-4 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white border-0">
            PRO
          </Badge>
        </Button>
      </div>

      {/* Full-size preview */}
      <div className="flex justify-center">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            boxShadow: "0 24px 64px rgba(124, 58, 237, 0.15), 0 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          {renderTemplate(selectedTemplate, mediaKitData)}
        </div>
      </div>

      {/* Pro Upgrade Modal */}
      <Dialog open={proModalOpen} onOpenChange={setProModalOpen}>
        <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden border-0">
          {/* Gradient header */}
          <div className="h-2 w-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
          <div className="p-6 space-y-5">
            <DialogHeader className="space-y-2">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-xl font-bold text-[#111827]">
                  Kitto Pro
                </DialogTitle>
                <Badge className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white border-0">
                  PRO
                </Badge>
              </div>
              <DialogDescription className="text-[#6B7280] text-sm leading-relaxed">
                Exporte seu media kit como PDF de alta resolução e impressione marcas e agências.
              </DialogDescription>
            </DialogHeader>

            {/* Features list */}
            <ul className="space-y-2.5">
              {[
                "Export em PDF de alta resolução",
                "Remover watermark Kitto",
                "Domínio personalizado no link",
                "Analytics de visualizações",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-[#374151]">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              className="w-full h-11 font-semibold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white border-0 hover:opacity-90 transition-opacity"
              onClick={() => setProModalOpen(false)}
            >
              Em breve — fique ligado! 🚀
            </Button>

            <p className="text-center text-xs text-[#9CA3AF]">
              Cancele quando quiser. Sem cobranças surpresa.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

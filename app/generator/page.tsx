"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useKittoStore } from "@/store/useKittoStore";
import { StepIndicator } from "@/components/steps/StepIndicator";
import { Step1Form } from "@/components/steps/Step1Form";
import { Step2Templates } from "@/components/steps/Step2Templates";
import { Step3Preview } from "@/components/steps/Step3Preview";
import { Toaster } from "@/components/ui/sonner";

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

const STEP_TITLES: Record<1 | 2 | 3, { title: string; subtitle: string }> = {
  1: {
    title: "Crie seu media kit",
    subtitle: "Preencha suas informações para começar",
  },
  2: {
    title: "Escolha um template",
    subtitle: "Selecione o estilo que mais combina com você",
  },
  3: {
    title: "Seu media kit está pronto!",
    subtitle: "Compartilhe ou exporte como PDF",
  },
};

export default function GeneratorPage() {
  const currentStep = useKittoStore((s) => s.currentStep);

  const direction = currentStep === 1 ? -1 : 1;
  const { title, subtitle } = STEP_TITLES[currentStep];

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Top gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <span className="text-2xl font-black bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent tracking-tight">
            kitto
          </span>
        </div>

        {/* Step indicator */}
        <StepIndicator />

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Card header */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-50">
            <AnimatePresence mode="wait">
              <motion.div
                key={`header-${currentStep}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold text-[#111827]">{title}</h1>
                <p className="text-sm text-[#6B7280] mt-0.5">{subtitle}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Card body — animated step content */}
          <div className="px-8 py-8 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {currentStep === 1 && <Step1Form />}
                {currentStep === 2 && <Step2Templates />}
                {currentStep === 3 && <Step3Preview />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#9CA3AF]">
          Made with{" "}
          <span className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent font-semibold">
            kitto
          </span>{" "}
          · O gerador de media kit para criadores
        </p>
      </div>

      <Toaster position="bottom-center" richColors />
    </div>
  );
}

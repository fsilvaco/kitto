"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useKittoStore } from "@/store/useKittoStore";
import { MediaKitData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CONTENT_TYPE_OPTIONS = [
  "Reels",
  "Stories",
  "Feed Posts",
  "Carrosséis",
  "Lives",
  "UGC",
];

const schema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  handle: z.string().min(1, "Handle obrigatório").startsWith("@", "Deve começar com @"),
  niche: z.string().min(1, "Nicho obrigatório"),
  bio: z.string().min(10, "Bio deve ter ao menos 10 caracteres"),
  location: z.string().min(1, "Localização obrigatória"),
  followers: z.string().min(1, "Seguidores obrigatório"),
  engagementRate: z.string().min(1, "Taxa de engajamento obrigatória"),
  reach: z.string().min(1, "Alcance obrigatório"),
  contentTypes: z.array(z.string()).min(1, "Selecione ao menos um tipo de conteúdo"),
  brands: z.string().min(1, "Informe ao menos uma marca"),
  email: z.string().email("E-mail inválido"),
});

type FormValues = z.infer<typeof schema>;

export function Step1Form() {
  const { mediaKitData, setMediaKitData, setStep } = useKittoStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const selectedContentTypes = watch("contentTypes") ?? [];

  function toggleContentType(type: string) {
    const current = selectedContentTypes;
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    setValue("contentTypes", updated, { shouldValidate: true });
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setMediaKitData({
        ...mediaKitData,
        profilePhoto: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  }

  function onSubmit(values: FormValues) {
    setMediaKitData({
      ...values,
      profilePhoto: mediaKitData.profilePhoto,
    } as MediaKitData);
    setStep(2);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Profile Photo */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-transparent bg-gradient-to-br from-[#7C3AED] to-[#EC4899] p-[2px] group cursor-pointer"
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {mediaKitData.profilePhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaKitData.profilePhoto}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
        <p className="text-sm text-[#6B7280]">Clique para adicionar foto de perfil</p>
      </div>

      {/* Identity */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-[#111827] uppercase tracking-wider">
          Identidade
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" placeholder="Ana Lima" {...register("name")} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="handle">@handle</Label>
            <Input id="handle" placeholder="@analima" {...register("handle")} />
            {errors.handle && <p className="text-xs text-red-500">{errors.handle.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="niche">Nicho</Label>
            <Input id="niche" placeholder="Lifestyle, Moda, Fitness..." {...register("niche")} />
            {errors.niche && <p className="text-xs text-red-500">{errors.niche.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="location">Localização</Label>
            <Input id="location" placeholder="São Paulo, Brasil" {...register("location")} />
            {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Conte um pouco sobre você..."
            rows={3}
            {...register("bio")}
          />
          {errors.bio && <p className="text-xs text-red-500">{errors.bio.message}</p>}
        </div>
      </section>

      {/* Stats */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-[#111827] uppercase tracking-wider">
          Métricas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="followers">Seguidores</Label>
            <Input id="followers" placeholder="48200" {...register("followers")} />
            {errors.followers && <p className="text-xs text-red-500">{errors.followers.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="engagementRate">Engajamento (%)</Label>
            <Input id="engagementRate" placeholder="4.7" {...register("engagementRate")} />
            {errors.engagementRate && (
              <p className="text-xs text-red-500">{errors.engagementRate.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reach">Alcance médio</Label>
            <Input id="reach" placeholder="12100" {...register("reach")} />
            {errors.reach && <p className="text-xs text-red-500">{errors.reach.message}</p>}
          </div>
        </div>
      </section>

      {/* Content Types */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-[#111827] uppercase tracking-wider">
          Tipos de conteúdo
        </h3>
        <div className="flex flex-wrap gap-2">
          {CONTENT_TYPE_OPTIONS.map((type) => {
            const isSelected = selectedContentTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleContentType(type)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white border-transparent"
                    : "bg-white text-[#6B7280] border-gray-200 hover:border-[#7C3AED]"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
        {errors.contentTypes && (
          <p className="text-xs text-red-500">{errors.contentTypes.message}</p>
        )}
      </section>

      {/* Collaboration */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-[#111827] uppercase tracking-wider">
          Colaborações & Contato
        </h3>
        <div className="space-y-1.5">
          <Label htmlFor="brands">Marcas com quem trabalhou</Label>
          <Input
            id="brands"
            placeholder="Natura, Reserva, Havaianas"
            {...register("brands")}
          />
          {errors.brands && <p className="text-xs text-red-500">{errors.brands.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail de contato</Label>
          <Input
            id="email"
            type="email"
            placeholder="voce@email.com"
            {...register("email")}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </section>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white border-0 hover:opacity-90 transition-opacity"
      >
        Continuar →
      </Button>
    </form>
  );
}

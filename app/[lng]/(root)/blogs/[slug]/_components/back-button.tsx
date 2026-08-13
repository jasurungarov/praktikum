"use client";

import { Button } from '@/components/ui/button'
import useTranslate from "@/hooks/use-translate";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton() {
  const t = useTranslate();
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="group fixed z-50 ml-4 mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-foreground max-md:left-4 max-md:top-24">
      <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      {t("goBack")}
    </Button>
  );
}

export default BackButton;
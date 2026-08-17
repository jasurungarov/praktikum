"use client";

import useTranslate from "@/hooks/use-translate";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface Props {
  title: string;
  description: string;
}

function ComingSoon({ title, description }: Props) {
  const t = useTranslate();
  const router = useRouter();

  return (
    <div className="container relative mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center gap-6 pt-2 text-center">
      <Button
        onClick={() => router.back()}
        className="group absolute left-0 top-28 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-foreground max-md:static max-md:mb-4 max-md:self-start">
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        {t("goBack")}
      </Button>

      <span className="inline-flex items-center gap-2 rounded-full border border-yellow-600/30 bg-yellow-600/5 px-4 py-1.5 text-xs font-medium tracking-wide text-yellow-600">
        <Sparkles className="size-3.5" />
        {t("comingSoonBadge")}
      </span>

      <h1 className="font-space-grotesk text-4xl font-bold md:text-5xl">
        {t(title)}
      </h1>

      <p className="max-w-md text-muted-foreground">{t(description)}</p>
    </div>
  );
}

export default ComingSoon;

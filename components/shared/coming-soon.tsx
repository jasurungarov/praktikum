"use client";

import useTranslate from "@/hooks/use-translate";
import { Sparkles } from "lucide-react";


interface Props {
  title: string;
  description: string;
}

function ComingSoon({ title, description }: Props) {
  const t = useTranslate();

  return (
    <div className="container relative mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center gap-6 pt-2 text-center">
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

"use client"

import useTranslate from "@/hooks/use-translate";
import { Construction, Info } from "lucide-react";

export default function UnderDevelopmentBanner() {
  const t = useTranslate();

  return (
    <div className="relative my-4 overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 p-4 shadow-sm backdrop-blur-md sm:p-6">
      {/* Background Accent Glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-amber-500/10 blur-2xl" />

      <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="mt-0.5 shrink-0 rounded-xl bg-amber-500/15 p-2.5 text-amber-500 dark:text-amber-400 sm:mt-0">
            <Construction className="size-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-semibold text-foreground sm:text-lg">
                {t("underTitle")}
              </h4>
              <span className="inline-flex items-center rounded-md border border-amber-500/20 bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                Beta
              </span>
            </div>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t("underDescription")}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 self-end rounded-lg border border-amber-500/15 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400/90 sm:self-center">
          <Info className="size-3.5" />
          <span>{t("temporaryData")}</span>
        </div>
      </div>
    </div>
  );
}

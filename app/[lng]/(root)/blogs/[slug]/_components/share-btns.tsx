"use client";

import useTranslate from "@/hooks/use-translate";
import { Facebook, Link2, Linkedin, Send, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const items = [
  { icon: Twitter, label: "Twitter" },
  { icon: Facebook, label: "Facebook" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Send, label: "Telegram" },
  { icon: Link2, label: "Copy link" },
];

function ShareBtns() {
  const t = useTranslate();
  const pathname = usePathname();

  const onShare = () => {
    const link = process.env.NEXT_PUBLIC_BASE_URL + pathname;
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success(t("linkCopied")));
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-2 md:items-start">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {t("share")} 
      </p>
      <div className="flex flex-wrap justify-center gap-2 md:flex-col md:justify-start">
        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={onShare}
            aria-label={label}
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:border-yellow-500/30 hover:bg-yellow-500/10 hover:text-yellow-500">
            <Icon className="size-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShareBtns;

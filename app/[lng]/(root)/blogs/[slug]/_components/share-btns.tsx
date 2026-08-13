// 'use client'

// import { Button } from '@/components/ui/button'
// import { Facebook, Link2, Linkedin, Send, Twitter } from 'lucide-react'
// import { usePathname } from 'next/navigation'
// import { toast } from 'sonner'

// function ShareBtns() {
// 	const pathname = usePathname()

// 	const onCopy = () => {
// 		const link = process.env.NEXT_PUBLIC_BASE_URL + pathname
// 		navigator.clipboard
// 			.writeText(link)
// 			.then(() => toast.success('Copied to clipboard'))
// 	}

// 	return (
// 		<div className='mt-4 flex flex-col max-md:flex-row max-md:space-x-3 md:space-y-3'>
// 			<Button size={'icon'} variant={'outline'} onClick={onCopy}>
// 				<Twitter />
// 			</Button>
// 			<Button size={'icon'} variant={'outline'} onClick={onCopy}>
// 				<Facebook />
// 			</Button>
// 			<Button size={'icon'} variant={'outline'} onClick={onCopy}>
// 				<Linkedin />
// 			</Button>
// 			<Button size={'icon'} variant={'outline'} onClick={onCopy}>
// 				<Send />
// 			</Button>
// 			<Button size={'icon'} variant={'outline'} onClick={onCopy}>
// 				<Link2 />
// 			</Button>
// 		</div>
// 	)
// }

// export default ShareBtns

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
    <div className="flex flex-col gap-2 md:flex-col">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {t("share")}
      </p>
      <div className="flex gap-2 md:flex-col">
        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={onShare}
            aria-label={label}
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:border-[#d4af37]/30 hover:bg-[#d4af37]/10 hover:text-[#d4af37]">
            <Icon className="size-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShareBtns;
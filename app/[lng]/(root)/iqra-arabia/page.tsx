import ComingSoon from "@/components/shared/coming-soon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ungarov Academy | Iqro Arabia",
  description:
    "Iqro Arabia — Makkada ta'lim xizmatlari sahifasi tayyorlanmoqda. Tez orada arab tili va diniy ta'lim kurslarimiz shu yerda joylashadi.",
};

function Page() {
  return (
    <ComingSoon
      title="iqroArabiaComingSoonTitle"
      description="iqroArabiaComingSoonDescription"
    />
  );
}

export default Page;
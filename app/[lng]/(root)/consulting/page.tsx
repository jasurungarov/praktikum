import ComingSoon from "@/components/shared/coming-soon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ungarov Academy | Konsalting xizmati",
  description:
    "Konsalting xizmati sahifasi tayyorlanmoqda. Tez orada karyera va ta'lim bo'yicha professional konsalting xizmatlarimiz shu yerda joylashadi.",
};

function Page() {
  return (
    <ComingSoon
      title="consultingComingSoonTitle"
      description="consultingComingSoonDescription"
    />
  );
}

export default Page;
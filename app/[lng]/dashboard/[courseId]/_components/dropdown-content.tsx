import { addArchiveCourse, addFavouriteCourse } from "@/actions/course.action";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useReview } from "@/hooks/use-review";
import useTranslate from "@/hooks/use-translate";
import { useAuth } from "@clerk/nextjs";
import { FolderArchive, Heart, Share2, Star } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { toast } from "sonner";

function DropdownContent() {
  const pathname = usePathname();
  const t = useTranslate();
  const { onOpen } = useReview();
  const { courseId } = useParams();
  const { userId } = useAuth();

  const onCopy = () => {
    const link = process.env.NEXT_PUBLIC_BASE_URL + pathname;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copied to clipboard");
    });
  };

  const onAdd = (type: "favourite" | "archive") => {
    let promise;
    if (type === "favourite") {
      promise = addFavouriteCourse(`${courseId}`, userId!);
    } else {
      promise = addArchiveCourse(`${courseId}`, userId!);
    }

    toast.promise(promise, {
      loading: "Loading...",
      success: "Saccesfully " + type + " added!",
      error: "Error adding course to " + type + "!",
    })};

  return (
    <DropdownMenuContent className="w-[300px]">
      <DropdownMenuItem
        onClick={() => onAdd("favourite")}
        className="cursor-pointer gap-2">
        <Heart size={20} />
        <span>{t("favoriteCourse")}</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => onAdd("archive")}
        className="cursor-pointer gap-2">
        <FolderArchive size={20} />
        <span>{t("archiveCourse")}</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem className="cursor-pointer gap-2" onClick={onOpen}>
        <Star size={20} />
        <span>{t("evaluation")}</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer gap-2" onClick={onCopy}>
        <Share2 size={20} />
        <span>{t("share")}</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem className="cursor-pointer gap-2 opacity-50">
        {t("shareCourse")}
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export default DropdownContent;

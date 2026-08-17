import { IUser } from '@/app.types'
import Image from "next/image";

interface Props {
  author: IUser;
}

function AuthorCard({ author }: Props) {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="mt-16 flex items-center gap-6 rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md max-md:flex-col max-md:text-center">
        <Image
          src={author.picture}
          alt={author.fullName}
          width={110}
          height={110}
          className="size-[110px] rounded-2xl object-cover ring-2 ring-[rgba(255,215,0,0.25)]"
        />
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-400">
            Muallif haqida
          </p>
          <h3 className="mt-1 font-space-grotesk text-2xl font-bold">
            {author.fullName}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {author.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthorCard;

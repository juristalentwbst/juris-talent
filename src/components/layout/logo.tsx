import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/site";

export function Logo({ locale, priority = false }: { locale: Locale; priority?: boolean }) {
  return (
    <Link href={`/${locale}`} aria-label="Juris Talent">
      <Image
        src="/logo/juris-talent-logo.png"
        alt="Juris Talent"
        width={220}
        height={120}
        priority={priority}
        className="h-auto w-[150px] object-contain sm:w-[190px]"
      />
    </Link>
  );
}

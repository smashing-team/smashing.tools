import { IconArrowRight, IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";

export function BuyLink({ link }: { link: string }) {
  return (
    <Link
      target="_blank"
      href={link.toString()}
      className="relative inline-flex shrink-0 items-center justify-center px-5 h-12 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 pointer-events-none"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <span className="relative text-white flex shrink-0 items-center">
        <IconShoppingCart className="relative -left-0.5 mr-1.5 size-5" /> Buy
        now
        <IconArrowRight className="ml-1.5 size-5" />
      </span>
    </Link>
  );
}

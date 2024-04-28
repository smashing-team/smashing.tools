import { SITE_DESCRIPTION, SITE_TITLE } from "@/utils/consts";
import Image from "next/image";

export default async function Widget() {
  return (
    <div>
      <div className="max-w-xs rounded-lg border border-indigo-900 bg-indigo-950 shadow">
        <Image
          className="rounded-t-lg"
          width={318}
          height={159}
          src="/og.png"
          alt="smashing.tools"
        />
        <div className="p-2 px-3">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-white">
            {SITE_TITLE}
          </h5>
          <p className="mb-3 text-xs font-normal text-zinc-300">
            {SITE_DESCRIPTION}
          </p>
        </div>
      </div>
    </div>
  );
}

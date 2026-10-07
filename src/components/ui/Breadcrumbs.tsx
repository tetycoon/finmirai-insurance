import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";
import { Icon } from "./Icon";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-1 text-sm ${light ? "text-navy-200" : "text-navy-500"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className={light ? "text-white" : "text-navy-800"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className={`hover:underline ${light ? "hover:text-white" : "hover:text-navy-900"}`}>
                      {c.name}
                    </Link>
                    <Icon name="chevronRight" className="h-3.5 w-3.5 opacity-60" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}

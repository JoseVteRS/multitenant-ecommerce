import configPromise from "@payload-config";
import { getPayload } from "payload";

import { Category } from "@/payload-types";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "categories",
    depth: 1, //1 Populate subcategories
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc?.subcategories?.docs ?? []).map((doc) => ({
      // Because of 'depth: 1' we are confident doc will be a type of Category
      ...(doc as Category),
      subcategories: undefined
    })),
  }));

  console.log({ data, formattedData });

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f4]">{children}</div>
      <Footer />
    </section>
  );
}

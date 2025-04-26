"use client"

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


export default function Home() {
  const trpc = useTRPC();

  const { data: session } = useQuery(trpc.auth.session.queryOptions());

  return <div>{JSON.stringify(session?.user, null, 2)}</div>;
}

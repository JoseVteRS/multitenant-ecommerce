import { useMemo } from "react";

export function useHref(link: string): string;
export function useHref(link: undefined): undefined;
export function useHref(link: string | undefined): string | undefined {
  const buildHref = useHrefBuilder();

  if (link === undefined) {
    return undefined;
  }

  return buildHref(link);
}

export function useHrefBuilder() {
  return useMemo(
    () => (link: string) => {
      if (link.startsWith("/")) {
        link = link.substring(1);
      }

      return `/${link}`;
    },
    []
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import Link from "next/link";
import { useRef, useState } from "react";
import { CustomCategory } from "../types";
import { SubcategoryMenu } from "./subactegory-menu";
import { useDropdownPosition } from "./use-dropdown-position";

interface Props {
  category: CustomCategory;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => setIsOpen(false);

  const dropdownPosition = getDropdownPosition();

  // TODO:Potentially improve mobile
  // const toggleDropdown = ()=> {
  //   if(category.subcategories?.length) {
  //     setIsOpen(!isOpen)
  //   }
  // }

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // onClick={toggleDropdown}
    >
      <div className="relative">
        <Button
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered && "bg-white border-primary",
            isOpen &&
              "bg-white border-primary shadow-[4px_4px_0_0_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px] transition-all border cursor-pointer"
          )}
          variant="elevated"
        >
          <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div>
            <div
              className={cn(
                "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-l-transparent border-r-transparent border-b-[10px] border-b-black left-1/2 -translate-x-1/2 ",
                isOpen && "opacity-100"
              )}
            />
            <SubcategoryMenu
              category={category}
              isOpen={isOpen}
              position={dropdownPosition}
            />
          </div>
        )}
      </div>
    </div>
  );
};

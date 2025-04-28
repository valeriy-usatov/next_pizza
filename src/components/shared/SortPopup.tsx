"use client";

import { ArrowDownUp } from "lucide-react";

import { sortIems } from "@/data/constant";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SortPopup = () => {
  return (
    <div className="flex items-center cursor-pointer gap-3 px-5 h-[52px] rounded-2xl bg-[#FAFAFA] ">
      <ArrowDownUp size={16} />
      <h3>
        Сортировка:
        <span className="text-primary">
          <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>
              {sortIems.map((item) => (
                <li key={item.name}>{item.name}</li>
              ))}
            </PopoverContent>
          </Popover>
        </span>
      </h3>
    </div>
  );
};

export default SortPopup;

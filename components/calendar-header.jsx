"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = {
  all: { label: "All Categories", color: "#64748b" },
  work: { label: "Work", color: "#4f46e5" },
  personal: { label: "Personal", color: "#16a34a" },
  family: { label: "Family", color: "#db2777" },
  other: { label: "Other", color: "#71717a" },
};

export function CalendarHeader({ searchTerm, onSearchChange, categoryFilter, onCategoryChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={categoryFilter} onValueChange={(value) => onCategoryChange(value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(CATEGORIES).map(([value, { label, color }]) => (
            <SelectItem key={value} value={value}>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }} />
                {label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

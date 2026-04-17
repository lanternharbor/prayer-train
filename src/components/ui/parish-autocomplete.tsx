"use client";

import { useState, useEffect, useRef } from "react";
import { Church, X } from "lucide-react";

type Parish = {
  id: string;
  name: string;
  city: string;
  state: string;
  diocese: string | null;
};

export function ParishAutocomplete({
  value,
  onChange,
  onLocationFill,
}: {
  value: string;
  onChange: (value: string, parishId: string | null) => void;
  onLocationFill: (location: string) => void;
}) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Parish[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Search as user types
  useEffect(() => {
    if (selectedId) return; // Don't search if parish was already selected

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query || query.length < 2) {
      // Use a zero-delay timeout so setState is called in a callback,
      // not synchronously in the effect body (satisfies react-hooks/set-state-in-effect).
      debounceRef.current = setTimeout(() => {
        setResults([]);
        setShowDropdown(false);
      }, 0);
      return () => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
      };
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/parishes?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setShowDropdown(data.length > 0);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, selectedId]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (parish: Parish) => {
    const displayName = `${parish.name}`;
    setQuery(displayName);
    setSelectedId(parish.id);
    setShowDropdown(false);
    onChange(displayName, parish.id);
    onLocationFill(`${parish.city}, ${parish.state}`);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedId(null);
    onChange("", null);
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    setSelectedId(null);
    onChange(val, null);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Church className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (results.length > 0 && !selectedId) setShowDropdown(true);
          }}
          placeholder="Start typing a parish name..."
          aria-label="Search for a parish"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="parish-dropdown"
          aria-autocomplete="list"
          className="w-full pl-9 pr-8 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition text-sm"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear parish selection"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          id="parish-dropdown"
          role="listbox"
          className="absolute z-50 top-full mt-1 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden"
        >
          {results.map((parish) => (
            <button
              key={parish.id}
              type="button"
              role="option"
              aria-selected="false"
              onClick={() => handleSelect(parish)}
              className="w-full text-left px-3 py-2.5 hover:bg-cream-100 transition-colors border-b border-border last:border-b-0"
            >
              <p className="text-sm font-medium text-navy-800">
                {parish.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {parish.city}, {parish.state}
                {parish.diocese && ` — ${parish.diocese}`}
              </p>
            </button>
          ))}
          <div className="px-3 py-2 bg-cream-50 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Don&apos;t see your parish? Just type the name — it&apos;ll work as free text.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

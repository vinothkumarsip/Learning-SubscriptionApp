import { useState } from "react";

export const useFilterService = (foodOptions) => {
  const [filters, setFilters] = useState({
    sugarFree: "All",
    type: "All",
  });

  const [tempFilters, setTempFilters] = useState({ ...filters });

  const handleFilterChange = (field, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyFilters = () => {
    setFilters({ ...tempFilters });
  };

  const clearFilters = () => {
    setTempFilters({ sugarFree: "All", type: "All" });
    setFilters({ sugarFree: "All", type: "All" });
  };

  const filteredFood = foodOptions.filter((food) => {
    const sugarMatch =
      filters.sugarFree === "All" ||
      food.sugar_free.toLowerCase() === filters.sugarFree.toLowerCase();
    const typeMatch =
      filters.type === "All" ||
      food.veg_nonveg.toLowerCase() === filters.type.toLowerCase();
    return sugarMatch && typeMatch;
  });

  return {
    tempFilters,
    filters,
    handleFilterChange,
    applyFilters,
    clearFilters,
    filteredFood,
  };
};
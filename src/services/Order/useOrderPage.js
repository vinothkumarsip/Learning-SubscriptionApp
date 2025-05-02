import { useState } from "react";
import { useFoodOptionsService } from "../../services/Order/getFoodOptions";
import { useCartService } from "../../services/Order/CartService";
import { useFilterService } from "../../services/Order/FilterService";
import { usePlan } from "../../components/Order/PlanContext";

export function useOrderPage() {
  const { foodOptions } = useFoodOptionsService();
  const { cart, handleCheckboxChange, getSelectedFood } = useCartService();
  const { tempFilters, handleFilterChange, applyFilters, clearFilters, filteredFood } =
    useFilterService(foodOptions);
  const { selectedPlan } = usePlan();

  const [showModal, setShowModal] = useState(false);
  const [paymentType, setPaymentType] = useState("cod");
  const [deliveryType, setDeliveryType] = useState("home");

  return {
    foodOptions,
    cart,
    handleCheckboxChange,
    getSelectedFood,
    tempFilters,
    handleFilterChange,
    applyFilters,
    clearFilters,
    filteredFood,
    selectedPlan,
    showModal,
    setShowModal,
    paymentType,
    setPaymentType,
    deliveryType,
    setDeliveryType,
  };
}

import React from "react";
import { useParams } from "react-router-dom";
import ModalProductDetails from "../components/ModalProductDetails";

export default function ProductDetails() {
  const { id } = useParams();
  // Render the modal as a full page (for direct navigation)
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
      <ModalProductDetails productId={id} onClose={() => window.history.back()} />
    </div>
  );
}

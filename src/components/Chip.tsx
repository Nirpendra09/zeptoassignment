import React from "react";
import "../styles/Chip.css";

// Define the props for the Chip component
interface ChipProps {
  label: string;
  image: string;
  isHighlited?: boolean;
  onRemove?: () => void;
}

const Chip = ({ label, image, isHighlited, onRemove }: ChipProps) => {
  const deleteIconUrl = "https://img.icons8.com/sf-regular/48/delete-sign.png";
  return (
    // Apply the 'highlight' class if isHighlited is true
    <div className={`chip-container ${isHighlited ? "highlight" : ""}`}>
      <div className="chip-image">
        <img src={image} alt="User avatar" />
      </div>
      <div className="chip-label">{label}</div>
      <div className="chip-close" onClick={onRemove}>
        <img src={deleteIconUrl} alt="Delete icon" />
      </div>
    </div>
  );
};

export default Chip;

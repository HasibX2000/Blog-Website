// File: Sponsors.js
// This component displays sponsor information. Currently, it displays a placeholder image for the sponsors.

import React from "react";
import Image from "../ui/Image"; // Component to render images
import Thumbnail from "../../assets/adplaceholder.jpg"; // Path to the placeholder image for sponsors

export default function Sponsors() {
  return (
    <div>
      {/* Display the placeholder image for sponsors */}
      <Image src={Thumbnail} />
    </div>
  );
}

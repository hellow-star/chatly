import React from "react";
import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderIcon className="animate-spin text-white size-10 " />
    </div>
  );
}

export default PageLoader;

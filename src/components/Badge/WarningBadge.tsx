import React from "react";

interface Props {
  label: string,
}

const WarningBadge: React.FC<Props> = ({label}) => {
  return (
    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800
    ring-1 ring-inset ring-yellow-600/20">
      {label}
    </span>
  );
}

export default WarningBadge;

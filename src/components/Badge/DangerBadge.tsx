import React from "react";

interface Props {
  label: string,
}

const DangerBadge: React.FC<Props> = ({label}) => {
  return (
    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1
    ring-inset ring-red-600/10">
      {label}
    </span>
  );
}

export default DangerBadge;

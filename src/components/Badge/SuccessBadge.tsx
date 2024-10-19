import React from "react";

interface Props {
  label: string,
}

const SuccessBadge: React.FC<Props> = ({label}) => {
  return (
    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700
    ring-1 ring-inset ring-green-600/20">
      {label}
    </span>
  );
}

export default SuccessBadge;

import React from "react";

interface AllergiesListProps {
    list: string[];
    name: string;
}

const AllergiesList: React.FC<AllergiesListProps> = ({ name,list }) => {
  return (
    <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-gray-500">{name}</dt>
      <dd className="mt-1 text-sm text-gray-900">
        <ul className="list-disc pl-5">
          {list.map((allergy) => (
            <li key={allergy}>{allergy}</li>
          ))}
        </ul>
      </dd>
    </div>
  );
};

export default AllergiesList;

import React from 'react';

interface Filter {
  criteria: string;
  values: string[];
}

interface FilterSectionProps {
  filters: Filter[];
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters }) => {
  return (
    <aside className="w-1/4">
      <div className="rounded-lg bg-white p-4 shadow-md">
        <h2 className="mb-4 text-xl font-bold">Filters</h2>
        {filters.map((filter) => (
          <div key={filter.criteria} className="mb-4">
            <h3 className="mb-2 font-semibold">
              {filter.criteria.charAt(0).toUpperCase() +
                filter.criteria.slice(1)}
            </h3>
            <div className="space-y-2">
              {filter.values.map((value, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    name={filter.criteria}
                    value={value}
                    className="form-checkbox text-pink-600"
                  />
                  <span className="ml-2">{value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSection;

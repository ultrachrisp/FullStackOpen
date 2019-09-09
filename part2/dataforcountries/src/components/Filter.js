import React from 'react';

const Filter = ({filter, onFilterChange}) =>
      <div>
          find countries
          <input
              value={filter}
              onChange={onFilterChange} />
      </div>;

export default Filter;

import React from 'react';

const PersonForm = ({addName, newName, onNameChange, newNumber, onNumberChange}) =>
      <form onSubmit={addName}>
          <div>
              name:
              <input value={newName}
                     onChange={onNameChange} />
          </div>
          <div>
              number:
              <input value={newNumber}
                     onChange={onNumberChange} />
          </div>
          <div>
              <button type="submit">add</button>
          </div>
      </form>;

export default PersonForm;

import React from 'react';
import $ from 'teaspoon';

import { Column } from '../../app/components/Column';

xdescribe('Column Component', () => {
  it('shows the title as an h3', () => {
    const $column = $(
      <Column stateKey="inputs" name="Inputs" addCard={() => {}} cards={[]} />
    ).render();
    const h3 = $column.find('h3');
    expect(h3.text()).toEqual('Inputs');
  });

  it('renders one Card component per card', () => {
    const $column = $(
      <Column
        stateKey="inputs"
        name="Inputs"
        addCard={() => {}}
        cards={[{ text: 'abc' }, { text: 'def' }]}
      />
    ).render();
    expect($column.find('Card').length).toBe(2);
  });
});

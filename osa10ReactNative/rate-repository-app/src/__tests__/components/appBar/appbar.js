import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';



describe('SignOut', () => {
  it('renders a sign out text depending on the title given', () => {
    const { debug, getByTestId } = render(<AppBarTab/>);

    debug();

    expect(getByTestId('signOut')).toHaveTextContent('Sign Out');
  });
});
import { describe, expect, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { customRender, testProps } from '../__mocks__/PokemonDataMocks';
import mockRwouter from 'next-router-mock';

describe('Testing pokemon cards / pokemon details behaviour', () => {
  it('Check if correct detais are displayed', async () => {
    customRender(testProps, 'Details');
    await waitFor(async () => {
      const card = screen.getByText('Bulbasaur');
      fireEvent(card, new MouseEvent('click', { bubbles: true }));
      expect(
        (await screen.findAllByText('12 Hg').then((data) => data)).length
      ).toBe(1);
      expect(
        (await screen.findAllByText('12 dm').then((data) => data)).length
      ).toBe(1);
    });
  });
  it('Check if clicking on the cross closes the details', async () => {
    customRender(testProps, 'Details');
    const close = screen.getByTestId('close');
    fireEvent.click(close);
    await waitFor(() => {
      expect(mockRwouter.pathname).toBe('/');
    });
  });
});

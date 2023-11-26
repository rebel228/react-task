import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { customRender, testProps } from '../__mocks__/PokemonDataMocks';
import { pokemonAPI } from '../../services/PokemonService';
import mockRouter from 'next-router-mock';

describe('Testing pokemon cards', () => {
  it('Ensure that the card renders the relevant pokemon name', async () => {
    customRender(testProps, 'Index');
    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeTruthy();
      expect(screen.getByText('Ivysaur')).toBeTruthy();
      expect(screen.getByText('Venusaur')).toBeTruthy();
    });
  });
  it('Expected an API call to be made', async () => {
    const mockApiCAll = vi.spyOn(pokemonAPI, 'useGetPokemonByNameQuery');
    customRender(testProps, 'Index');
    await waitFor(() => {
      expect(mockApiCAll).toHaveBeenCalledTimes(3);
    });
  });
  it('Check if clicking on the card opened details', async () => {
    customRender(testProps, 'Index');
    const card = screen.getByText('Bulbasaur');
    fireEvent.click(card);
    await waitFor(async () => {
      expect(mockRouter.pathname).toEqual('/details/1');
    });
  });
});

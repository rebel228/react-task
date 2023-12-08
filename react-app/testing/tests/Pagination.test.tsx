import { describe, expect, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { customRender, testProps } from '../__mocks__/PokemonDataMocks';
import mockRouter from 'next-router-mock';

describe('Testing URL changes', () => {
  it('check if changing the page updates the URL', async () => {
    customRender(testProps, 'Index');
    await waitFor(() => {
      const next = screen.getByRole('button', { name: '>' });
      fireEvent.click(next);
      expect(mockRouter.query.page).toEqual('2');
    });
  });
  it('updating amount to 10 should update URL', async () => {
    customRender(testProps, 'Index');
    await waitFor(async () => {
      const set10 = screen.getByRole('link', { name: '20' });
      fireEvent.click(set10);
      expect(mockRouter.query.limit).toEqual('20');
    });
  });
  it('updating amount to 50 should update URL', async () => {
    customRender(testProps, 'Index');
    await waitFor(async () => {
      const set50 = screen.getByRole('link', { name: '50' });
      fireEvent.click(set50);
      expect(mockRouter.query.limit).toEqual('50');
    });
  });
  it('updating amount to 20 should update1 URL', async () => {
    customRender(testProps, 'Index');
    await waitFor(async () => {
      const set20 = screen.getByRole('link', { name: '10' });
      fireEvent.click(set20);
      expect(mockRouter.query.limit).toEqual('10');
    });
  });
});

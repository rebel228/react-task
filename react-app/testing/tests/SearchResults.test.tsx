import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  customRender,
  testProps,
  testPropsWrongSearch,
} from '../__mocks__/PokemonDataMocks';

describe('Testing card list results', () => {
  it('Verify that the component renders three cards', async () => {
    customRender(testProps, 'Index');
    await waitFor(() => {
      expect(screen.queryByText('Bulbasaur')).toBeTruthy;
      expect(screen.queryByText('Ivysaur')).toBeTruthy;
      expect(screen.queryByText('Venusaur')).toBeTruthy;
    });
  });

  it("Verify that the 'Nothing found' message is present", async () => {
    customRender(testPropsWrongSearch, 'Index');
    await waitFor(() => {
      expect(screen.queryByText('Nothing found')).toBeTruthy();
    });
  });
});

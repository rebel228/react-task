import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getServerSideProps as serverSide } from '../../pages/index';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { FullProps } from '../../types/types';
import Index from '../../pages/index';
import Details from '../../pages/details/[id]';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

const store = setupStore();

type page = 'Details' | 'Index';

export const customRender = (props: FullProps, page: page) => {
  return render(
    <Provider store={store}>
      {page === 'Index' && (
        <Index
          url={props.url}
          page={props.page}
          search={props.search}
          limit={props.limit}
        />
      )}
      {page === 'Details' && (
        <Details
          url={props.url}
          page={props.page}
          search={props.search}
          limit={props.limit}
          id={props.id}
        />
      )}
    </Provider>,
    {
      wrapper: MemoryRouterProvider,
    }
  );
};

export const testProps = {
  url: '/',
  search: null,
  page: '1',
  limit: '10',
  id: '1',
};

export const testPropsWrongSearch = {
  url: '/',
  search: 'wrongvalue',
  page: '1',
  limit: '10',
  id: '1',
};

export const testProps404 = {
  url: '/badroute',
  search: null,
  page: '1',
  limit: '10',
  id: '1',
};

export const getServerSideProps = serverSide;

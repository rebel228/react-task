import { describe, expect, it } from "vitest";
import { setupStore } from "../../store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { renderHook } from "@testing-library/react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { searchSlice } from "../../store/reducers/searchSlice";
import { querySlice } from "../../store/reducers/queryParamsSlice";

const store = setupStore();
function wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

describe("Testing store", () => {
  it("expect default values be from initial state", () => {
    const { search, limit, page } = renderHook(
      () => {
        return useAppSelector((state) => state.queryParamsReducer);
      },
      { wrapper: wrapper },
    ).result.current;
    expect(search).toBe(undefined);
    expect(limit).toBe("20");
    expect(page).toBe("1");
  });
  it("testing changing search string", () => {
    renderHook(
      () => {
        const { setSearchString } = searchSlice.actions;
        const { searchString } = useAppSelector((state) => state.searchReducer);
        const dispatch = useAppDispatch();
        dispatch(setSearchString({ searchString: "test value" }));
        expect(searchString).toBe("test value");
      },
      { wrapper: wrapper },
    );
  });
  it("testing changing page, limit, search query params", () => {
    renderHook(
      () => {
        const { setQueryParams } = querySlice.actions;
        const { search, limit, page } = useAppSelector(
          (state) => state.queryParamsReducer,
        );
        const dispatch = useAppDispatch();
        dispatch(
          setQueryParams({ search: "test search", limit: "13", page: "26" }),
        );
        expect(search).toBe("test search");
        expect(limit).toBe("13");
        expect(page).toBe("26");
      },
      { wrapper: wrapper },
    );
  });
});

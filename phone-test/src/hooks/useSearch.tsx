import { useSearchParams } from 'react-router-dom';
import { CALLS_PER_PAGE } from 'src/utils/constants';
import { FilterValue } from 'src/declarations/filters';

export const useSearch = () => {
  const [search] = useSearchParams();

  const pageQueryParams = search.get('offset');
  const perPageQueryParams = search.get('limit');
  const filterQueryParams = search.get('filter');

  const activePage = !!pageQueryParams ? parseInt(pageQueryParams) : 1;
  const perPage = !!perPageQueryParams ? parseInt(perPageQueryParams) : CALLS_PER_PAGE;
  const filterValue: FilterValue = (filterQueryParams as FilterValue) || FilterValue.All;

  return { activePage, perPage, filterValue };
};

import { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { PAGINATED_CALLS } from '../gql/queries';
import { Typography, Spacer, Pagination, Select } from '@aircall/tractor';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Call } from '../components/Call';
import { CALLS_PER_PAGE, filterOptions } from '../utils/constants';
import { useFilterGroupByDateCalls } from '../hooks/useFilterGroupByDateCalls';

const PaginationWrapper = styled.div`
  > div {
    width: inherit;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

const CallsListPage = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const pageQueryParams = search.get('offset');
  const perPageQueryParams = search.get('limit');
  const filterQueryParams = search.get('filter');

  const activePage = !!pageQueryParams ? parseInt(pageQueryParams) : 1;
  const perPage = !!perPageQueryParams ? parseInt(perPageQueryParams) : CALLS_PER_PAGE;
  const filterValue = filterQueryParams || '';

  const { loading, error, data } = useQuery(PAGINATED_CALLS, {
    variables: {
      offset: (activePage - 1) * perPage,
      limit: perPage
    }
  });

  const { totalCount, nodes: calls } = data?.paginatedCalls || {};
  const groupedCallsByDate = useFilterGroupByDateCalls(filterValue, calls);

  const mergeUrlParams = (search: string, newParams: object) => {
    const params = new URLSearchParams(search);

    for (const [key, value] of Object.entries(newParams)) {
      params.set(key, value);
    }
    return params.toString();
  };

  const handlePageChange = (page: number) => {
    navigate(`/calls?${mergeUrlParams(location.search, { offset: page })}`);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    navigate(`/calls?${mergeUrlParams(location.search, { limit: newPageSize })}`);
  };

  const handleChangeFilter = useCallback(
    (filter: string) => {
      if (filter === '') return navigate(`/calls/`);
      navigate(`/calls?${mergeUrlParams(location.search, { filter })}`);
    },
    [navigate, location.search]
  );

  if (loading) return <p>Loading calls...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <>
      <Typography variant="displayM" textAlign="center" py={3}>
        Calls History
      </Typography>

      <Select
        selectionMode="single"
        size="small"
        selectedKeys={[filterValue]}
        options={filterOptions}
        onSelectionChange={selectedKeys => {
          if (selectedKeys.length === 0) return;
          handleChangeFilter(selectedKeys[0]);
        }}
      />

      <Spacer space={3} direction="vertical">
        {Object.entries(groupedCallsByDate).map(([date, calls]) => (
          <div key={date}>
            <Typography variant="displayS">{date}</Typography>
            {calls.map((call: Call) => (
              <Call key={call.id} call={call} />
            ))}
          </div>
        ))}
      </Spacer>

      {totalCount && (
        <PaginationWrapper>
          <Pagination
            activePage={activePage}
            pageSize={perPage}
            onPageChange={handlePageChange}
            defaultPageSize={CALLS_PER_PAGE}
            recordsTotalCount={totalCount}
            onPageSizeChange={handlePageSizeChange}
          />
        </PaginationWrapper>
      )}
    </>
  );
};

export default CallsListPage;
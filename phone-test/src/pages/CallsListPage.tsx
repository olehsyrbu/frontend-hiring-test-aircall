import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Typography, Spacer, Pagination } from '@aircall/tractor';

import { CALLS_PER_PAGE } from '../utils/constants';
import { PAGINATED_CALLS } from '../gql/queries';
import { useFilterGroupByDateCalls } from '../hooks/useFilterGroupByDateCalls';
import { useSearch } from '../hooks/useSearch';
import { useNavigateWithParams } from '../hooks/useNavigateWithParams';
import { Call } from '../components/Call';
import { Filter } from '../components/Filter';

const PaginationWrapper = styled.div`
  > div {
    width: inherit;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

const CallsListPage = () => {
  const navigateWithParams = useNavigateWithParams();
  const navigate = useNavigate();
  const { activePage, perPage, filterValue } = useSearch();

  const { loading, error, data } = useQuery(PAGINATED_CALLS, {
    variables: {
      offset: (activePage - 1) * perPage,
      limit: perPage
    }
  });

  const { totalCount, nodes: calls } = data?.paginatedCalls || {};
  const groupedCallsByDate = useFilterGroupByDateCalls(filterValue, calls);

  const handlePageChange = (page: number) => {
    navigateWithParams('/calls', { offset: page });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    navigateWithParams('/calls', { limit: newPageSize, offset: 1 });
  };

  const handleChangeFilter = useCallback(
    (filter: string) => {
      if (filter === '') return navigate('/calls');
      navigateWithParams('/calls', { filter });
    },
    [navigateWithParams, navigate]
  );

  if (loading) return <p>Loading calls...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <>
      <Typography variant="displayM" textAlign="center" py={3}>
        Calls History
      </Typography>

      <Filter onChange={handleChangeFilter} value={filterValue} />

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

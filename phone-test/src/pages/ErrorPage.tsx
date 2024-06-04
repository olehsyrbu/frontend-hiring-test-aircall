import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Typography, Box } from '@aircall/tractor';
import { NotFoundPage } from 'src/pages';

export const ErrorPage = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />;
  }

  return (
    <Box overflowY="auto" bg="black-a30" p={4} borderRadius={16}>
      <Typography>Opps, it is an error page!</Typography>
    </Box>
  );
};

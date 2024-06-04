import { Typography, Box } from '@aircall/tractor';

export const NotFoundPage = () => {
  return (
    <Box overflowY="auto" bg="black-a30" p={4} borderRadius={16}>
      <Typography>404 - Not Found!</Typography>
    </Box>
  );
};

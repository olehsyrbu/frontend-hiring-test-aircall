import { useMemo } from 'react';
import { FilterValue } from 'src/declarations/filters';

interface GroupedCallsByDateProps {
  [date: string]: Call[];
}

export const useFilterGroupByDateCalls = (filterValue: string, calls: Call[]) => {
  const filteredCalls = useMemo<Call[]>(() => {
    if (calls === undefined) return [];
    if (filterValue === '') return calls || [];

    return calls.filter((call: Call) => {
      if (filterValue === FilterValue.Inbound || filterValue === FilterValue.Outbound) {
        return call.direction === filterValue;
      }
      return call.call_type === filterValue;
    });
  }, [filterValue, calls]);

  const groupedCallsByDate: GroupedCallsByDateProps = useMemo(
    () =>
      filteredCalls.reduce((acc: GroupedCallsByDateProps, call: Call) => {
        const date = new Date(call.created_at).toDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(call);
        return acc;
      }, {}),
    [filteredCalls]
  );

  return groupedCallsByDate;
};

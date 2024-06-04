import { useMemo } from 'react';
import { FilterValue } from 'src/declarations/filters';

interface GroupedCallsByDateProps {
  [date: string]: Call[];
}

export const useFilterGroupByDateCalls = (
  filterValue: FilterValue,
  calls: Call[]
): GroupedCallsByDateProps => {
  const filteredCalls = useMemo(() => {
    if (!calls || filterValue === FilterValue.All) {
      return calls || [];
    }

    return calls.filter((call: Call) =>
      filterValue === FilterValue.Inbound || filterValue === FilterValue.Outbound
        ? call.direction === filterValue
        : call.call_type === filterValue
    );
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

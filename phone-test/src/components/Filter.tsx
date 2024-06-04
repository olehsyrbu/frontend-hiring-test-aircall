import { FilterOption, FilterLabel, FilterValue } from '../declarations/filters';
import { Select } from '@aircall/tractor';

const filterOptions: FilterOption[] = [
  { label: FilterLabel.All, value: FilterValue.All },
  { label: FilterLabel.Inbound, value: FilterValue.Inbound },
  { label: FilterLabel.Outbound, value: FilterValue.Outbound },
  { label: FilterLabel.Missed, value: FilterValue.Missed },
  { label: FilterLabel.Answered, value: FilterValue.Answered },
  { label: FilterLabel.Voicemail, value: FilterValue.Voicemail }
];

export const Filter = ({ onChange, value }: { onChange: (key: string) => void; value: string }) => {
  return (
    <Select
      data-cy="filter-select"
      selectionMode="single"
      size="small"
      selectedKeys={[value]}
      options={filterOptions}
      onSelectionChange={selectedKeys => {
        if (selectedKeys.length === 0) return;
        onChange(selectedKeys[0]);
      }}
    />
  );
};

export enum FilterLabel {
  All = 'All',
  Inbound = 'Inbound',
  Outbound = 'Outbound',
  Missed = 'Missed',
  Answered = 'Answered',
  Voicemail = 'Voicemail'
}

export enum FilterValue {
  All = '',
  Inbound = 'inbound',
  Outbound = 'outbound',
  Missed = 'missed',
  Answered = 'answered',
  Voicemail = 'voicemail'
}

export interface FilterOption {
  label: FilterLabel;
  value: FilterValue;
}

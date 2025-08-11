export type WisdomEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  isCustom?: boolean;
};

export type LogEntry = {
  id: string;
  wisdomId: string;
  date: string; // ISO 8601 format: "YYYY-MM-DD"
  status: 'applied' | 'missed';
};

export type User = {
  id: string;
  name: string;
  email: string;
  customWisdomEntries: WisdomEntry[];
  logs: LogEntry[];
};

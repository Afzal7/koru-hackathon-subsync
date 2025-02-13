interface StudentNote {
  note: string;
}

interface StudentNoteSummary {
  name?: string;
  summary: string;
  labels: string[];
  severity: SeverityLevel;
}

enum SeverityLevel {
  Critical,
  High,
  Medium,
  Low,
}

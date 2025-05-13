export interface Resident {
  url: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Resident[];
  url: string;
  created: string;
}

export interface LocationResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Location[];
}

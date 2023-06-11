export interface PieData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}
export interface LineData {
    labels: number[];
    datasets: {
      backgroundColor: string;
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    }[];
  }
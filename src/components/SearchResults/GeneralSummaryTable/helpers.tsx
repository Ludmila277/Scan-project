/* eslint-disable @typescript-eslint/no-explicit-any */

import {type CombinedDataItem} from "./GeneralSummaryTable"
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const combineDataByDate = (data: any[]): CombinedDataItem[] => {
  interface HistogramItem {
    date: string;
    value: number;
  }

  interface Histogram {
    histogramType: string;
    data: HistogramItem[];
  }

  const combinedData: Record<string, CombinedDataItem> = {};

  data.forEach((histogram: Histogram) => {
    histogram.data.forEach((item: HistogramItem) => {
      const dateKey = item.date.split("T")[0];
      if (!combinedData[dateKey]) {
        combinedData[dateKey] = {
          period: formatDate(dateKey),
          total: 0,
          risks: 0,
        };
      }
      if (histogram.histogramType === "totalDocuments") {
        combinedData[dateKey].total += item.value;
      } else if (histogram.histogramType === "riskFactors") {
        combinedData[dateKey].risks += item.value;
      }
    });
  });

  return Object.values(combinedData).sort(
    (a: CombinedDataItem, b: CombinedDataItem) =>
      new Date(a.period).getTime() - new Date(b.period).getTime()
  );
};

import { COLOR_BLUE, COLOR_RED, COLOR_YELLOW } from 'consts';

export const getProgressColor = (percent: number): string => {
  if (percent > 70) return COLOR_RED;
  if (percent > 40) return COLOR_YELLOW;
  return COLOR_BLUE;
};

export const downloadTrigger = (file: Blob, filename: string) => {
  const url = window.URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

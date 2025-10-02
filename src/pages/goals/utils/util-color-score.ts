const COLORLIST = [
  '#000000',
  '#810707',
  '#c62828',
  '#d84315',
  '#ef6c00',
  '#0097a7',
  '#43a047',
  '#43a047'
];
export const rangScoreColor = [0, 1, 2, 3.5, 5, 6.5, 8, 9.5, 10];
export const rangScore = [0, 2, 3.5, 5, 6.5, 8, 10];

export const getColorScore = (score: number) => {
  for (let i = 0; i < rangScoreColor.length; i++) {
    if (score < rangScoreColor[i]) {
      return COLORLIST[i - 1];
    }
  }
  return '#43a047';
};

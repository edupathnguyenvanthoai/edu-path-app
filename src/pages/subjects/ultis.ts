import { teal, amber, blueGrey, lightBlue, deepPurple } from '@mui/material/colors';

const mapColor: Record<string, string> = {
  a: lightBlue[500],
  b: teal[500],
  c: deepPurple[600],
  d: amber[500],
};

export function getColorForAdmissionGroup(admissionGroup: string) {
  const firstLetter = admissionGroup.charAt(0).toLowerCase();
  return mapColor[firstLetter] || blueGrey[600];
}

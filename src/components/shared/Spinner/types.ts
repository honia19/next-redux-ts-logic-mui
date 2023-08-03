import { CircularProgressProps } from '@mui/material/CircularProgress';

export default interface ISpinner extends CircularProgressProps {
  containerClassName?: string;
  className?: string;
}

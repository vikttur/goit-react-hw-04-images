import { RotatingLines } from 'react-loader-spinner';

export default function Loader() {
  return (
    <RotatingLines
      visible="true"
      strokeColor="#5364c3"
      strokeWidth="5"
      animationDuration="0.5"
      width="96"
    />
  );
}

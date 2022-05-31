import { Oval } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className="loader">
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        color="white"
        secondaryColor="blue"
      />
    </div>
  );
}

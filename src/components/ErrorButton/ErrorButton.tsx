import { useState } from 'react';

export function ErrorButton() {
  const [isError, setIsError] = useState<boolean>(false);

  const handleClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('Button Error');
  }

  return (
    <>
      <button onClick={handleClick} className="btn">
        Error
      </button>
    </>
  );
}

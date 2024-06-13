import React, { useEffect, useState } from 'react';

type Props = {
  username: string;
};
export default function useCheckValidGithub({ username }: Props) {
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  const validateUser = async () => {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    );
    if (res.ok) {
      setIsValid(true);
    }
    setIsValid(false);
  };

  useEffect(() => {
    validateUser();
  }, [username]);

  return { isValid };
}

import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styles from '../styles/ShadedWrapper.module.css';

interface LayoutProps {
  children?: ReactNode;
}

export default function ShadedWrapper({ children }: LayoutProps) {
  const router = useRouter();

  const removeShadedWrapper = () => {
    const { pathname, query } = router;
    // eslint-disable-next-line react-compiler/react-compiler
    delete router.query.details;
    router.replace({ pathname, query }, undefined);
  };

  return (
    <>
      <div
        className={styles.shaded_wrapper}
        data-testid="shaded-wrapper"
        onClick={removeShadedWrapper}
      >
        {children}
      </div>
    </>
  );
}

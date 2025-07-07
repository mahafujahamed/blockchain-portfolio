declare module 'react-google-recaptcha' {
  import * as React from 'react';

  export interface ReCAPTCHAProps {
    sitekey: string;
    size?: 'invisible' | 'compact' | 'normal';
    theme?: 'light' | 'dark';
    onChange?: (token: string | null) => void;
  }

  export interface ReCAPTCHARef {
    executeAsync: () => Promise<string>;
    reset: () => void;
  }

  const ReCAPTCHA: React.ForwardRefExoticComponent<
    ReCAPTCHAProps & React.RefAttributes<ReCAPTCHARef>
  >;

  export default ReCAPTCHA;
}

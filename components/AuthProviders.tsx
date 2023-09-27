'use client';

import { getProviders, signIn } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import Button from './Button';

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders: FC = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers)
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <Button
            key={i}
            type="button"
            handleClick={() => signIn(provider.id)}
            title="Sign In"
          />
        ))}
      </div>
    );
};

export default AuthProviders;

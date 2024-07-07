'use client';

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '@/app/lib/authContext';

const CookirManager: React.FC = () => {
  const { login } = useAuth();

  useEffect(() => {
    const displayname: string | undefined = Cookies.get('displayname');

    login(displayname!);
  }, [login]);

  return null;
};

export default CookirManager;

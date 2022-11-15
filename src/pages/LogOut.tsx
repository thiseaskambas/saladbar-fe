import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logUserOut } from '../store/auth.slice';
import { useAppDispatch } from '../store/store';

const LogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logUserOut())
      .unwrap()
      .then(() => navigate('/', { replace: true }));
  }, []);

  return <main>LogingOut...!</main>;
};

export default LogOut;

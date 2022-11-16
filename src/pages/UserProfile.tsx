import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();
  return <main>UserProfile {id}</main>;
};

export default UserProfile;

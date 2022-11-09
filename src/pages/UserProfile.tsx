import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();
  return <div>UserProfile {id}</div>;
};

export default UserProfile;

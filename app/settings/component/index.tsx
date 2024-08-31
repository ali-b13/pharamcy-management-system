"use client"
import React, { useState, useEffect } from 'react';
import { getAllUsers, getUserInfo } from '@/app/actions/user/action';
import Header from '@/components/Header';
import SkeltonSettings from './Skelton';
import UserInfo from './UserInfo';
import UpdateUserForm from './UpdateUserForm';
import AdminPanel from './AdminPanel';

const SettingsComponent = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const fetchUser = async () => {
    const { user } = await getUserInfo();
    if (user) {
      setUser(user);
      setIsAdmin(user.role === 'Admin');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

 

  return (
    <div className="container p-4 bg-white shadow-lg rounded-lg">
      <Header title='إعدادات المستخدم' />
      <hr className='border-b-2 border-gray-300 m-2' />
      {user ? (
        <>
          <UserInfo user={user} />
          <UpdateUserForm user={user} fetchUser={fetchUser} />
          {isAdmin && <AdminPanel user={user}  />}
        </>
      ) : (
        <SkeltonSettings />
      )}
    </div>
  );
};

export default SettingsComponent;

import React from 'react';
import { USERType } from '../../../types.dt';

const UserInfo = ({ user }:{user:USERType}) => (
  <div className="mb-10">
    <h2 className="text-lg md:text-xl text-teal-600 font-semibold mb-4">معلومات المستخدم</h2>
    <div className="text-sm md:text-md">
      <p className="mb-2 text-gray-600"><strong>اسم المستخدم:</strong> {user.username}</p>
      <p className="mb-2 text-gray-600"><strong>الدور:</strong> {user.role}</p>
    </div>
  </div>
);

export default UserInfo;

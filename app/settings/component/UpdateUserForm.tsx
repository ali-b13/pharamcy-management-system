import React, { useState } from 'react';
import AlertBox from '@/components/Alert';
import { updateUser, verifyPassword } from '@/app/actions/user/action';

interface UpdateUserFormProps {
  user: {
    username: string;
    mobile_number: string;
  };
  fetchUser: () => void;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ user, fetchUser }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState(user.mobile_number);
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error' | 'warning'; title: string; message: string } | null>(null);

  const validateNewPassword = () => newPassword.length >= 5;

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateNewPassword()) {
      setAlert({
        show: true,
        type: 'error',
        title: 'خطأ في كلمة المرور',
        message: 'كلمة المرور الجديدة يجب أن تحتوي على 5 أحرف على الأقل',
      });
      return;
    }

    try {
      const res = await verifyPassword(password)

      if (!res.ok) {
        setAlert({
          show: true,
          type: 'error',
          title: 'خطأ في كلمة المرور',
          message: 'كلمة المرور الحالية غير صحيحة',
        });
        return;
      }

      const updateRes = await updateUser(username,newPassword,mobileNumber)

      if (updateRes.ok) {
        setAlert({
          show: true,
          type: 'success',
          title: 'نجاح التحديث',
          message: 'تم تحديث المستخدم بنجاح',
        });
        fetchUser();
      } else {
        setAlert({
          show: true,
          type: 'error',
          title: 'خطأ في التحديث',
          message: 'فشل في تحديث المستخدم',
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        title: 'خطأ في التحديث',
        message: 'حدث خطأ أثناء التحديث',
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <form onSubmit={handleUpdateUser} className="mt-6">
      {alert && <AlertBox show={alert.show} type={alert.type} title={alert.title} message={alert.message} onCancel={handleCloseAlert} />}
      <h3 className="text-lg md:text-xl text-teal-600 font-semibold mb-4">تحديث المعلومات</h3>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">اسم المستخدم </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full md:w-2/4 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">كلمة المرور الحالية</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full md:w-2/4 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">كلمة المرور الجديدة</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full md:w-2/4 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mobile_number" className="block text-gray-700 font-semibold mb-2"> رقم الهاتف</label>
        <input
          type="text"
          id="mobile_number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="w-full md:w-2/4 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
        />
      </div>
      <button
        type="submit"
        className="w-full md:w-2/4 bg-teal-600 text-white p-2 rounded-lg font-semibold text-md md:text-lg hover:bg-teal-700 transition duration-200"
      >
        تحديث المعلومات
      </button>
    </form>
  );
};

export default UpdateUserForm;

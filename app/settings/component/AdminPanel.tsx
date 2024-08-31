import React, { useEffect, useState } from 'react';
import AlertBox from '@/components/Alert';
import { addUser, DeleteUser, getAllUsers } from '@/app/actions/user/action';
import { USERType } from '@/types.dt';
import ModalBox from '@/components/ModalBox';

interface AdminPanelProps {
  user:USERType
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user }) => {
  const [newUsername, setNewUsername] = useState('');
  const[usersData,setUsers]=useState([])
  const [newPassword, setNewPassword] = useState('');
  const [newMobileNumber, setNewMobileNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectUser, setSelectUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error' | 'warning'; title: string; message: string } | null>(null);
  const fetchUsers = async () => {
    if (user.role=="Admin") {
      try {
        const res = await getAllUsers()
        
        setUsers(res.users);
      } catch (error) {
        console.error('فشل في جلب المستخدمين:', error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  },[]);
  

  const confirmDelete = async () => {
    setLoading(true)
    if (selectUser) {
      try {
      const response=  await DeleteUser(selectUser)
        if(response.ok){
          setAlert({
            show: true,
            type: 'success',
            title: ' حذف المستخدم',
            message: 'تم حذف المستخدم بنجاح',
          });
         }
        setShowModal(false);
        setUsers(prev=>prev.filter((u:USERType)=>u.id!=selectUser))
        setSelectUser(null)
        setLoading(false)

      } catch (error) {
        setShowModal(false);
        setLoading(false)

      }
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectUser(null);
  };
  const validateNewPassword = () => newPassword.length >= 5;

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateNewPassword()) {
      setAlert({
        show: true,
        type: 'error',
        title: 'خطأ في كلمة المرور',
        message: 'كلمة المرور يجب أن تحتوي على 5 أحرف على الأقل',
      });
      return;
    }

    try {
      const res = await addUser(newUsername,newPassword,newMobileNumber)

      if (res.ok) {
        setAlert({
          show: true,
          type: 'success',
          title: 'نجاح الإضافة',
          message: 'تم إضافة المستخدم بنجاح',
        });
        fetchUsers();
      } else {
        setAlert({
          show: true,
          type: 'error',
          title: 'فشل في الإضافة',
          message: 'فشل في إضافة المستخدم',
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        title: 'خطأ في الإضافة',
        message: 'حدث خطأ أثناء إضافة المستخدم',
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  const handleDeleteUser=async(userId:string)=>{

      setSelectUser(userId);
      setShowModal(true);
  }
  return (
    <div>
      {alert && <AlertBox show={alert.show} type={alert.type} title={alert.title} message={alert.message} onCancel={handleCloseAlert} />}
      <h3 className="text-lg md:text-xl text-teal-600 font-semibold mt-10 mb-6">إدارة المستخدمين</h3>
      <form onSubmit={handleAddUser} className="mb-8">
        <h4 className="text-md md:text-lg text-teal-600 font-semibold mb-4">إضافة مستخدم جديد</h4>
        <div className="mb-4">
          <label htmlFor="newUsername" className="block text-gray-700 font-semibold mb-2">اسم المستخدم</label>
          <input
            type="text"
            id="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full md:w-2/4 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">كلمة المرور</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full md:w-2/4 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700 font-semibold mb-2">رقم الهاتف </label>
          <input
            type="text"
            id="mobile"
            value={newMobileNumber}
            onChange={(e) => setNewMobileNumber(e.target.value)}
            className="w-full md:w-2/4 p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-2/4 bg-teal-600 text-white p-2 rounded-lg font-semibold text-md md:text-lg hover:bg-teal-700 transition duration-200"
        >
          إضافة المستخدم
        </button>
      </form>

      <h4 className="text-lg md:text-xl text-teal-600 font-semibold mb-4">قائمة المستخدمين المتاحين</h4>
<div className="bg-white shadow-md rounded-lg p-6 w-full md:w-2/4">
  <ul className="space-y-4">
    {usersData?.length ? (
      usersData.map((u:USERType) => (
        <li key={u.id} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
          <div className="text-gray-900 text-sm font-medium ">
            {u.username}
          </div>
          <div className="flex items-center  gap-2 space-x-2">
            <div className={`text-sm font-semibold py-1 px-3 rounded-lg min-w-14 text-center  ${u.role === 'Admin' ? 'bg-teal-600 text-white' : 'bg-yellow-500 text-white'}`}>
              {u.role === 'Admin' ? 'مشرف' : 'بايع'}
            </div>
            {user.role === 'Admin' && user.id !== u.id && (
              <button 
                onClick={() => handleDeleteUser(u.id)} 
                className="text-red-600 hover:text-red-800 font-semibold text-sm py-1 px-3 rounded-lg border border-red-600 hover:bg-red-100 transition-colors duration-200"
              >
                حذف
              </button>
            )}
          </div>
        </li>
      ))
    ) : (
      <div className="text-gray-400 text-center py-4">لايوجد مستخدمين حاليا</div>
    )}
  </ul>
</div>
<ModalBox
      loading={loading}
        show={showModal}
        title="تاكيد حذف المستخدم"
        message=" هل انت متاكد من حذف هاذا المستخدم؟."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default AdminPanel;

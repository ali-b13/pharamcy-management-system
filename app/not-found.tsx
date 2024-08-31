import Link from "next/link";


const NotFound = () => {
  


  return (
    <div className="flex flex-col items-center justify-center h-[100vh]  bg-gray-100 text-gray-800">
      <h1 className="text-md md:text-4xl p-4">عفوا الصفحه التي تحاول الوصول لها غير موجوده</h1>
      <Link 
         href={'/dashboard'}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md text-md md:text-lg hover:bg-blue-700 transition duration-300"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default NotFound;

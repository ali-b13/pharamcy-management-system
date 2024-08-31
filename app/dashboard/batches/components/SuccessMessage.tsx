import React from 'react';
import { RiMarkPenFill } from 'react-icons/ri';

const SuccessMessage = ({title}:{title:string}) => (
  <div className='w-full bg-green-500 text-white p-3 text-center'>
    <RiMarkPenFill /> {title}
  </div>
);

export default SuccessMessage;

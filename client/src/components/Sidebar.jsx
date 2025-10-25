import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/assets';
import menu_icon from '../assets/assets'; 

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src={logo} alt="logo" className='max-w-40' />
          <div className="relative py-2 group">
            <img src={menu_icon} alt="menu" className='max-h-5 cursor-pointer' />
            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
              <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
              <hr className="my-2 border-t border-gray-500" />
              <p className='cursor-pointer text-sm'>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

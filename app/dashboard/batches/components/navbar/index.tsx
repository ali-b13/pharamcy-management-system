"use client"
import React from 'react'
import MiniNavbar from './MiniNavbar'
import MobileNavBar from './MobileViewNavBar'
interface NavbarProps {
  handleSubmit: (query: any) => void;
  handleBatchNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterStatus: (value: string) => void; // Change to string
  handleSortOrderSelect: (value: string) => void; // Change to string
  filter: string;
  batchNumber: string;
  sortOrder: string;
}

const NavBar:React.FC<NavbarProps> = ({handleSubmit,handleBatchNumber,handleFilterStatus,batchNumber,filter,handleSortOrderSelect,sortOrder}) => {
 
  return (
    <>
    <div className='hidden md:block'>
    <MiniNavbar 
    
    handleOnSubmit={handleSubmit}
    handleBatchNumber={handleBatchNumber}
    handleFilterStatus={handleFilterStatus}
    handleSortOrderSelect={handleSortOrderSelect}
    sortOrder={sortOrder}
     batchNumber={batchNumber}
     filter={filter}
      />
     
    </div>
    <div className='block md:hidden'>
    <MobileNavBar 
    handleOnSubmit={handleSubmit}
      batchNumber={batchNumber}
      sortOrder={sortOrder}
      handleSortOrderSelect={handleSortOrderSelect}
      filter={filter}
    handleBatchNumber={handleBatchNumber}
     handleFilterStatus={handleFilterStatus}/>
    </div>
   </>
  )
}

export default NavBar
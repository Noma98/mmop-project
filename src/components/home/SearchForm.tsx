import React from 'react';

export default function SearchForm() {
  return (
    <form className='w-[320px] flex ml-4 mt-4'>
      <input
        className='p-4 flex-1 outline-none'
        placeholder="Search for someone else's"
      />
      <button className='px-4 font-bold bg-[#161C1E] text-white'>Search</button>
    </form>
  );
}

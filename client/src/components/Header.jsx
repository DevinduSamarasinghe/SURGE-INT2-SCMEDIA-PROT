import React from 'react';

const Header = ({ category, title }) => (
  <div className=" mb-10">
    <p className="text-lg text-gray-400 text-transform: capitalize">{category}</p>
    <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
      {title}
    </p>
  </div>
);

export default Header;

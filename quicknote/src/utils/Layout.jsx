import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="max-w-5xl w-[90%] m-auto mt-4">
      <Link
        className="fixed top-2 right-2 text-xs tracking-wide border border-slate-700 px-2 py-1 text-slate-600 active:text-slate-400 active:border-slate-500 sm:hover:text-slate-400 sm:hover:border-slate-500"
        to="https://github.com/radiaated/HandyScripts/tree/main/quicknote"
      >
        Github
      </Link>
      <Outlet />
    </div>
  );
};

export default Layout;

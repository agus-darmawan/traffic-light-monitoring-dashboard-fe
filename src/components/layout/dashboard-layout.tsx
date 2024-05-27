import { useState } from 'react';
import Sidebar from '../shared/sidebar';
import Header from '../shared/header';
import MobileSidebar from '../shared/mobile-sidebar';
import { MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const year = new Date().getFullYear();

  return (
    <div className="flex h-screen overflow-hidden bg-secondary">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar />
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <div className="relative z-10 flex h-20 flex-shrink-0  shadow">
          <button
            className="pl-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 xl:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <Header />
        </div>
        <main className="relative flex-1 overflow-y-auto bg-background focus:outline-none ">
          {children}
          <div className="bottom-0 left-0 right-0 flex h-10 items-center justify-center bg-black lg:absolute">
            <p className="font-base  text-white">
              Copyright © {year} |
              <Link
                to="https://www.linkedin.com/in/agusdarmawnn/"
                target="_blank"
                className="hover:underlin font-semibold italic text-blue-500 decoration-violet-400 underline-offset-4"
              >
                {' '}
                Agus Darmawan
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

import { Home, Calendar, FileText, User, Info } from 'lucide-react';

const NavBar = () => {
  return (
    <header className="bg-green-100 p-8 relative">
      {/* SVG Icon on the Left */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.00001C13.6569 6.00001 15 4.65686 15 3C15 1.34315 13.6569 0 12 0C10.3431 0 9 1.34315 9 3C9 4.65686 10.3431 6.00001 12 6.00001Z" fill="currentColor" />
            <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="currentColor" />
          </svg>
        </div>
      </div>
      {/* Navigation Links */}
      <nav className="container mx-auto flex justify-center">
        <ul className="flex space-x-6">
          <li><a href="/patient/home" className="flex items-center text-green-800 hover:text-green-600"><Home className="w-5 h-5 mr-1" /> Home</a></li>
          <li><a href="/patient/appointment/" className="flex items-center text-green-800 hover:text-green-600"><Calendar className="w-5 h-5 mr-1" /> Appointment</a></li>
          <li><a href="#" className="flex items-center text-green-800 hover:text-green-600"><FileText className="w-5 h-5 mr-1" /> Reporting</a></li>
          <li><a href="#" className="flex items-center text-green-800 hover:text-green-600"><User className="w-5 h-5 mr-1" /> Digital Profile</a></li>
          <li><a href="#" className="flex items-center text-green-800 hover:text-green-600"><Info className="w-5 h-5 mr-1" /> About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

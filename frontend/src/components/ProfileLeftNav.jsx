import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, BookOpen, Bell, User, MessageSquare } from 'lucide-react';

const Item = ({ to, Icon, label, count }) => (
  <Link to={to} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors">
    <Icon size={20} />
    <span className="font-medium">{label}</span>
    {typeof count === 'number' && count > 0 && (
      <span className="ml-auto bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">{count}</span>
    )}
  </Link>
);

const ProfileLeftNav = ({ counts = {} }) => {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:sticky lg:top-24 lg:w-56 lg:space-y-3">
      <div className="bg-white rounded-lg shadow p-3">
        <Item to="/messages" Icon={MessageSquare} label="Messages" count={counts.unreadMessages} />
        <Item to="/" Icon={Home} label="Home" />
        <Item to="/network" Icon={Users} label="My Network" count={counts.requests} />
        <Item to="/clubs" Icon={BookOpen} label="Clubs" />
        <Item to="/interview" Icon={BookOpen} label="Interview" />
        <Item to="/notifications" Icon={Bell} label="Notifications" count={counts.notifications} />
        <Item to="/profile" Icon={User} label="Me" />
      </div>
    </aside>
  );
};

export default ProfileLeftNav;

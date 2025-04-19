// Sidebar.js
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarItems }) => {
  return (
    <aside className="w-64 bg-gray-100 p-4 min-h-screen shadow-md block">
      <ul className="space-y-3">
        {sidebarItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block p-3 rounded-lg font-medium transition ${
                  isActive
                    ? 'bg-gray-300 text-blue-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                `
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink
            to="/setting"
            className={({isActive }) =>
              `block p-3 rounded-lg font-medium transition ${
                isActive
                  ? 'bg-gray-300 text-blue-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              `
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { Home as HomeIcon, Info as InfoIcon } from '@mui/icons-material';

const baseLinkStyles = "flex items-center space-x-2 hover:text-purple-200 transition font-bold";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="flex space-x-6 p-4 bg-purple-600 text-white shadow-md">
        <Link to="/" activeProps={{}} className={baseLinkStyles}>
          <HomeIcon fontSize="small" />
          <span>Home</span>
        </Link>
        <Link to="/about" activeProps={{}} className={baseLinkStyles}>
          <InfoIcon fontSize="small" />
          <span>About</span>
        </Link>
      </nav>
      <Outlet />
    </>
  ),
});

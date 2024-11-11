import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { Home as HomeIcon} from '@mui/icons-material';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import { GiSnake } from "react-icons/gi";


const baseLinkStyles = "flex items-center space-x-2 hover:text-purple-200 transition font-bold";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="flex space-x-6 p-4 bg-purple-600 text-white shadow-md">
        <Link to="/" activeProps={{}} className={baseLinkStyles}>
          <HomeIcon fontSize="small" />
          <span>Home</span>
        </Link>
        <Link to="/TicTacToe" activeProps={{}} className={baseLinkStyles}>
          <Grid3x3Icon fontSize="small" />
          <span>TicTacToe</span>
        </Link>
        <Link to="/snake" activeProps={{}} className={baseLinkStyles}>
          <GiSnake fontSize="small" />
          <span>Snake</span>
        </Link>
        <Link to="/mole" activeProps={{}} className={baseLinkStyles}>
         <GiSnake fontSize="small" />
         <span>Mole</span>
          </Link>

      </nav>
      <Outlet />
    </>
  ),
});

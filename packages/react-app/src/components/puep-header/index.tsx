import "./index.scss";
import { NavLink } from "react-router-dom";
const logo = require("../../images/pu-logo.webp");

function PuepHeader() {
  return (
    <header className="puep-header">
      <div className="puep-header-div">
        <img
          src={logo}
          alt="Pokemon Unite Logo"
          width="100px"
          height="54px"
        ></img>
        <nav>
          <ul>
            <li>
              <NavLink to="/">EmblemPlanner</NavLink>
            </li>
            <li>
              <NavLink to="/emblems">Emblems</NavLink>
            </li>
            <li>
              <NavLink to="/pokemons">Pokemons</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default PuepHeader;

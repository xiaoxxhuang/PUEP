import "./index.css";
const logo = require("../../images/pu-logo.png");

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
        <p>Pokemon Unite Emblems Planner</p>
      </div>
    </header>
  );
}

export default PuepHeader;

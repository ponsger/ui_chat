import type { Dispatch } from "react";
import { connection } from "../data/connection";
import { useChat } from "../hooks/useChat";

type SidebarProps = {
  isOpen: boolean;
  testConnection: boolean;
  setIsOpen: Dispatch<boolean>;
  toggleTheme: () => void;
}

const Sidebar = ({isOpen, testConnection, setIsOpen, toggleTheme} : SidebarProps) => {

  const {state, dispatch} = useChat();
  const { theme } = state;

  const getRequest = async () => {
    try {
      const response = await fetch(connection.url);
      const data = await response.json();
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <aside
      className={`d-none d-md-block vh-100 position-relative flex-shrink-0
        ${theme === "light" ? "bg-secondary-subtle text-dark" : "bg-black text-light"}`}
      style={{
        width: isOpen ? "16rem" : "4rem",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        className="navbar-toggler position-absolute top-0 end-0 m-2"
        onClick={() => setIsOpen(!isOpen)}
        style={{ zIndex: 1050 }}
      >
        Menu{" "}
        <span className="navbar-toggler-icon">
          <img
            src="/img/menu-icon.png"
            alt="Menu icon"
            className="w-100 h-100 bg-light rounded p-1"
          />
        </span>
      </button>

      <div className="p-4 fs-5 fw-bold border-bottom border-secondary">
        <img
          src={`/img/${theme === "light" ? "black" : "light"}-logo.png`}
          className="card-img-top"
          alt="logo"
        />
      </div>

      {isOpen && (
        <nav className="mt-3">
          <ul className="list-unstyled px-2">
            {testConnection && (
              <li
                onClick={getRequest}
                className="px-3 py-2 rounded sidebar-item"
                role="button"
              >
                Test Connection
              </li>
            )}

            <li
              className="px-3 py-2 rounded sidebar-item"
              role="button"
              onClick={toggleTheme}
            >
              Change Theme
            </li>
            <li
              className="px-3 py-2 rounded sidebar-item"
              role="button"
              onClick={() => dispatch({ type: "SET_ADD_TAU", payload: { addTau: !state.addTau } })}
            >
              Add Tau
            </li>
          </ul>
          <div className={`${theme === "light" ? "bg-warning bg-gradient" : "bg-secondary bg-gradient"} rounded p-3 mt-3`}>
            <p className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>This model doesn't have memory so it will not remember previous conversations or questions.</p>
          </div>
        </nav>

      )}
    </aside>
  );
};

export default Sidebar;

function Navigation({ activePage, setActivePage }) {

const pages = [
  "Dashboard",
  "My Trip",
  "Bookings",
  "Calendar",
  "Budget",
  "Weather",
  "Currency"
];

  return (
    <nav className="navigation">

      {pages.map(page => (
        <button
          key={page}
          className={activePage === page ? "nav-active" : ""}
          onClick={() => setActivePage(page)}
        >
          {page}
        </button>
      ))}

    </nav>
  );
}

export default Navigation;

import { useState, useEffect } from "react";

import Header from "./components/header";
import Navigation from "./components/Navigation";
import TripDetails from "./components/TripDetails";
import Budget from "./components/Budget";
import AddPlan from "./components/AddPlan";
import Itinerary from "./components/Itinerary";
import CurrencyConverter from "./components/CurrencyConverter";
import TravelCalendar from "./components/TravelCalendar";
import WeatherDestination from "./components/WeatherDestination";
import Footer from "./components/Footer";

import "./App.css";

function App() {

  const [activePage, setActivePage] = useState("Dashboard");

  const [trip, setTrip] = useState(() =>
    JSON.parse(localStorage.getItem("trip") || "null") || {
      destinations: [""],
      start: "",
      end: "",
      budget: ""
    }
  );

  const [plans, setPlans] = useState(() =>
    JSON.parse(localStorage.getItem("plans") || "[]")
  );

  const [storageError, setStorageError] = useState("");

  // Automatically save travel information
  useEffect(() => {
    try {
      localStorage.setItem("trip", JSON.stringify(trip));
      localStorage.setItem("plans", JSON.stringify(plans));
      setStorageError("");
    } catch {
      setStorageError("Unable to save travel plans.");
    }
  }, [trip, plans]);

  return (
    <div className="container">

      <Header />

      <Navigation
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Dashboard */}
{activePage === "Dashboard" && (
  <>
    <Budget trip={trip} plans={plans} />

    <WeatherDestination trip={trip} />

    <TravelCalendar plans={plans} trip={trip} />
  </>
)}

      {/* My Trip */}
      {activePage === "My Trip" && (
        <TripDetails
          trip={trip}
          setTrip={setTrip}
        />
      )}

      {/* Bookings */}
      {activePage === "Bookings" && (
        <>
          <AddPlan
            trip={trip}
            setPlans={setPlans}
          />

          <Itinerary
            plans={plans}
            setPlans={setPlans}
          />
        </>
      )}

      {/* Calendar */}
      {activePage === "Calendar" && (
        <TravelCalendar
          plans={plans}
          trip={trip}
        />
      )}

      {/* Budget */}
      {activePage === "Budget" && (
        <Budget
          trip={trip}
          plans={plans}
        />
      )}

      {/* Weather */}
{activePage === "Weather" && (
  <WeatherDestination trip={trip} />
)}

      {/* Currency */}
      {activePage === "Currency" && (
        <CurrencyConverter />
      )}

      <Footer storageError={storageError} />

    </div>
  );
}

export default App;


import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import {
  format,
  parse,
  startOfWeek,
  getDay
} from "date-fns";

import { enAU } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    "en-AU": enAU
  }
});

const colours = {
  Flight: "#3779c7",
  Hotel: "#9060bc",
  Activity: "#298565",
  Transport: "#ba852c",
  Food: "#c16d45",
  Other: "#777777"
};

function TravelCalendar({ plans, trip }) {

  const [date, setDate] = useState(
    trip.start
      ? new Date(`${trip.start}T00:00:00`)
      : new Date()
  );

  // Convert existing travel plans into calendar events
  const events = plans.map(plan => {

    const start = new Date(
      `${plan.date}T${plan.time || "09:00"}`
    );

    const end = new Date(
      start.getTime() + 60 * 60 * 1000
    );

    return {
      title: plan.title,
      start: start,
      end: end,
      category: plan.category,
      cost: plan.cost,
      status: plan.status
    };
  });

  // Give each category its own colour
  function eventStyle(event) {
    return {
      style: {
        backgroundColor:
          colours[event.category] || "#777777",
        border: "none",
        borderRadius: "5px",
        color: "white"
      }
    };
  }

  // Show booking information when clicked
  function showBooking(event) {
    alert(
      `${event.title}\n` +
      `Category: ${event.category}\n` +
      `Date: ${format(event.start, "dd/MM/yyyy")}\n` +
      `Time: ${format(event.start, "HH:mm")}\n` +
      `Cost: $${event.cost} AUD\n` +
      `Status: ${event.status}`
    );
  }

  return (
    <section className="calendar-section">

      <h2>📅 Travel Calendar</h2>

      <p>View your bookings and activities by date.</p>

      <div className="calendar-legend">
        {Object.entries(colours).map(([name, colour]) => (
          <span key={name}>
            <span
              className="legend-dot"
              style={{ backgroundColor: colour }}
            />
            {name}
          </span>
        ))}
      </div>

      {trip.start && (
        <button
          type="button"
          onClick={() =>
            setDate(new Date(`${trip.start}T00:00:00`))
          }
        >
          Go to Trip Start
        </button>
      )}

      <Calendar
        localizer={localizer}
        culture="en-AU"
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={setDate}
        defaultView="month"
        views={["month", "week", "day", "agenda"]}
        eventPropGetter={eventStyle}
        onSelectEvent={showBooking}
        style={{ height: 550 }}
      />

    </section>
  );
}

export default TravelCalendar;

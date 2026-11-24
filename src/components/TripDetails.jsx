
function TripDetails({ trip, setTrip }) {

  // Support previously saved trips
  const destinations = trip.destinations || [
    trip.destination || ""
  ];

  // Update trip details
  function updateTrip(e) {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value
    });
  }

  // Update a destination
  function updateDestination(index, value) {
    const updated = [...destinations];

    updated[index] = value;

    setTrip({
      ...trip,
      destinations: updated
    });
  }

  // Add another destination
  function addDestination() {
    setTrip({
      ...trip,
      destinations: [...destinations, ""]
    });
  }

  // Remove a destination
  function removeDestination(index) {
    setTrip({
      ...trip,
      destinations: destinations.filter(
        (_, i) => i !== index
      )
    });
  }

  return (
    <section>
      <h2>My Trip</h2>

      <label>Destinations</label>

      {destinations.map((destination, index) => (
        <div className="destination-row" key={index}>

          <input
            placeholder="e.g. Rome, Italy"
            value={destination}
            onChange={e =>
              updateDestination(index, e.target.value)
            }
          />

          <button
            type="button"
            className="delete"
            disabled={destinations.length === 1}
            onClick={() => removeDestination(index)}
          >
            Remove
          </button>

        </div>
      ))}

      <button
        type="button"
        onClick={addDestination}
      >
        + Add Destination
      </button>

      <label>Departure</label>
      <input
        type="date"
        name="start"
        value={trip.start}
        onChange={updateTrip}
      />

      <label>Return</label>
      <input
        type="date"
        name="end"
        min={trip.start}
        value={trip.end}
        onChange={updateTrip}
      />

      <label>Budget (AUD)</label>
      <input
        type="number"
        name="budget"
        min="0"
        placeholder="5000"
        value={trip.budget}
        onChange={updateTrip}
      />

    </section>
  );
}

export default TripDetails;

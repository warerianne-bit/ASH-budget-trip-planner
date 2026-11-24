import { useState } from "react";

const emptyPlan = {
  title: "",
  date: "",
  time: "",
  category: "Activity",
  cost: "",
  status: "Planned"
};

function AddPlan({ trip, setPlans }) {

  const [plan, setPlan] = useState(emptyPlan);

  function updatePlan(e) {
    setPlan({
      ...plan,
      [e.target.name]: e.target.value
    });
  }

  function addPlan(e) {
    e.preventDefault();

    if (!plan.title.trim()) return;

    setPlans(previousPlans => [
      ...previousPlans,
      {
        ...plan,
        title: plan.title.trim(),
        id: crypto.randomUUID(),
        cost: Number(plan.cost)
      }
    ]);

    setPlan(emptyPlan);
  }

  return (
    <section>
      <h2>Add Travel Plan</h2>

      <form onSubmit={addPlan}>

        <label>Activity or booking</label>
        <input
          required
          name="title"
          placeholder="e.g. Flight to Rome"
          value={plan.title}
          onChange={updatePlan}
        />

        <label>Date</label>
        <input
          required
          type="date"
          name="date"
          min={trip.start}
          max={trip.end}
          value={plan.date}
          onChange={updatePlan}
        />

        <label>Time</label>
        <input
          type="time"
          name="time"
          value={plan.time}
          onChange={updatePlan}
        />

        <label>Category</label>
        <select
          name="category"
          value={plan.category}
          onChange={updatePlan}
        >
          <option>Activity</option>
          <option>Flight</option>
          <option>Hotel</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <label>Cost (AUD)</label>
        <input
          required
          type="number"
          name="cost"
          min="0"
          step="0.01"
          value={plan.cost}
          onChange={updatePlan}
        />

        <label>Booking Status</label>
        <select
          name="status"
          value={plan.status}
          onChange={updatePlan}
        >
          <option>Planned</option>
          <option>Reserved</option>
          <option>Confirmed</option>
        </select>

        <button type="submit">
          Add Plan
        </button>

      </form>
    </section>
  );
}

export default AddPlan;
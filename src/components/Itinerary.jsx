function Itinerary({ plans, setPlans }) {

  function deletePlan(id) {
    setPlans(previousPlans =>
      previousPlans.filter(plan => plan.id !== id)
    );
  }

  const sortedPlans = [...plans].sort((a, b) =>
    `${a.date} ${a.time}`.localeCompare(
      `${b.date} ${b.time}`
    )
  );

  return (
    <section>
      <h2>My Itinerary</h2>

      {plans.length === 0 && (
        <p>No plans added yet.</p>
      )}

      {sortedPlans.map(plan => (
        <div className="plan-card" key={plan.id}>

          <h3>{plan.title}</h3>

          <p>📅 {plan.date} {plan.time}</p>
          <p>Category: {plan.category}</p>
          <p>Status: {plan.status}</p>
          <p>Cost: ${Number(plan.cost).toFixed(2)} AUD</p>

          <button
            className="delete"
            onClick={() => deletePlan(plan.id)}
          >
            Delete
          </button>

        </div>
      ))}
    </section>
  );
}

export default Itinerary;
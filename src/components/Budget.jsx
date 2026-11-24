function Budget({ trip, plans }) {

  const total = plans.reduce(
    (sum, plan) => sum + Number(plan.cost), 0
  );

  const remaining = Number(trip.budget) - total;

  return (
    <div className="budget-grid">

      <div className="budget-card">
        <p>Total Budget</p>
        <h2>${Number(trip.budget).toFixed(2)}</h2>
      </div>

      <div className="budget-card">
        <p>Planned Spending</p>
        <h2>${total.toFixed(2)}</h2>
      </div>

      <div className="budget-card">
        <p>Remaining</p>
        <h2 style={{
          color: remaining < 0 ? "salmon" : "white"
        }}>
          ${remaining.toFixed(2)}
        </h2>
      </div>

    </div>
  );
}

export default Budget;
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [plans, setPlans] = useState([]);
  const [selectedSize, setSelectedSize] = useState("10000");
  const [editPlan, setEditPlan] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [total, setTotal] = useState("299");

  useEffect(() => {
    axios
      .get(`http://localhost:5001/plans/${selectedSize}`)
      .then((response) => {
        setPlans(response.data);
        setTotal(response.data[0].details.weekend_holding);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [selectedSize]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/plans/${id}`)
      .then(() => {
        const updatedPlans = plans.filter((plan) => plan._id !== id);
        setPlans(updatedPlans);
      })
      .catch((error) => console.error("Error deleting plan: ", error));
  };

  const handleEdit = (plan) => {
    setEditPlan(plan);
  };

  const handleUpdate = (id, updatedDetails) => {
    axios
      .put(`http://localhost:5001/plans/${id}`, updatedDetails)
      .then((response) => {
        const updatedPlans = plans.map((plan) =>
          plan._id === id ? response.data : plan
        );
        setPlans(updatedPlans); // Update the UI with the edited plan
        setEditPlan(null); // Clear the edit state
      })
      .catch((error) => console.error("Error updating plan: ", error));
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Home | Internship Task</title>
      </Helmet>
      <div className="text-center mt-10 text-white">
        <h1 className="text-4xl font-bold">Pick Your Funding Programs</h1>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4 my-4">
          <button className="btn btn-info bg-transparent hover:bg-primary-gradient text-white rounded-full lg:px-6">
            Standard Challenge
          </button>
          <button className="btn btn-info bg-transparent hover:bg-primary-gradient text-white rounded-full lg:px-6">
            Instant Funding
          </button>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {/* Account size buttons */}
          {["10000", "20000", "30000", "50000", "60000"].map((size) => (
            <button
              key={size}
              className={`btn btn-info bg-transparent hover:bg-primary-gradient text-[#78FFD6] rounded-full lg:px-6 ${
                selectedSize === size
                  ? "bg-primary-gradient text-white"
                  : "text-white"
              }`}
              onClick={() => handleSizeChange(size)}
            >
              ${size}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="max-w-full lg:w-2/3 overflow-x-auto shadow-2xl rounded-xl">
            <table className="table w-full">
              {/* Head */}
              <thead>
                <tr>
                  <th></th> {/* Empty header for the detail names column */}
                  {plans.map((plan) => (
                    <th key={plan.plan_name}>{plan.plan_name}</th>
                  ))}
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {/* Row for Trading Period */}
                <tr>
                  <td>Trading Period</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>
                      {plan.details.trading_period} days
                    </td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Profit Target */}
                <tr>
                  <td>Profit Target</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>{plan.details.profit_target}</td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Maximum Daily Loss */}
                <tr>
                  <td>Maximum Daily Loss</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>
                      {plan.details.maximum_daily_loss}
                    </td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Maximum Overall Loss */}
                <tr>
                  <td>Maximum Overall Loss</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>
                      {plan.details.maximum_overall_loss}
                    </td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Drawdown Type */}
                <tr>
                  <td>Drawdown Type</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>{plan.details.drawdown_type}</td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for News Trading */}
                <tr>
                  <td>News Trading</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>
                      {plan.details.news_trading ? "Yes" : "No"}
                    </td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Weekend Holding */}
                <tr>
                  <td>Weekend Holding</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>{plan.details.weekend_holding}</td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Actions (if admin) */}
                {isAdmin && (
                  <tr>
                    <td>Actions</td>
                    {plans.map((plan) => (
                      <td key={plan.plan_name}>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEdit(plan)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-error"
                          onClick={() => handleDelete(plan._id)}
                        >
                          Delete
                        </button>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cart */}
          <div className="card bg-black w-full lg:w-1/3 shadow-2xl text-white">
            <div className="card-body">
              <h2 className="card-title">Pick Challenge</h2>
              <p>
                The Challenge is your initial dive into becoming a Titan Trader.
                Prove your trading skills, hit the profit target, maintain
                discipline, and showcase responsible risk management.
              </p>

              <figure>
                <img src="src/assets/Rectangle 1.png" alt="card image" />
              </figure>
              <div className="my-2">Total: {total}</div>
              <Link
                to="/checkout"
                state={{ total }}
                className="btn w-full rounded-lg bg-primary-gradient text-white"
              >
                Start Challenge
              </Link>
            </div>
          </div>
        </div>

        {/* Edit Form (Only if the plan is being edited) */}
        {editPlan && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editPlan._id, editPlan.details);
            }}
            className="mt-4"
          >
            <h3 className="text-lg font-bold">
              Edit Plan: {editPlan.plan_name}
            </h3>
            <input
              type="text"
              value={editPlan.details.trading_period}
              onChange={(e) =>
                setEditPlan({
                  ...editPlan,
                  details: {
                    ...editPlan.details,
                    trading_period: e.target.value,
                  },
                })
              }
              placeholder="Trading Period"
              className="input input-bordered mt-2"
            />
            {/* Add other fields similarly for Profit Target, Max Daily Loss, etc */}
            <button className="btn btn-primary mt-2">Update</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Home;

// import React from "react";
// import Layout from "./Layout/Layout";
// import { FaExclamationTriangle } from "react-icons/fa";
// import { BsDot } from "react-icons/bs";

// function SuperAdminDashboard() {
//   return (
//     <Layout>
//       <div className="container-fluid mt-4">
//         <h3 className="mb-4">Operational dashboard</h3>
//         {/* <span className="badge bg-success mb-3">Public</span> */}

//         {/* KPI Cards */}
//         <div className="row g-4">
//           {/* Card 1 */}
//           <div className="col-md-3">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6 className="card-title fw-bold text-decoration-underline">Number of active organizations</h6>
//                 <p className="text-danger mb-1">
//                   <FaExclamationTriangle className="me-1" />
//                   Over target by 29.00
//                 </p>
//                 <h2 className="fw-bold">31 <small className="fs-6 fw-light">work orders</small></h2>
//                 <p className="text-success"><BsDot /> 0.00% from last refresh</p>
//               </div>
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="col-md-3">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6 className="card-title fw-bold text-decoration-underline">Total subscriptions </h6>
//                 <p className="text-danger mb-1">
//                   <FaExclamationTriangle className="me-1" />
//                   Over target by 388.00
//                 </p>
//                 <h2 className="fw-bold">393 <small className="fs-6 fw-light">work orders</small></h2>
//                 <p className="text-success"><BsDot /> 0.00% from last refresh</p>
//               </div>
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div className="col-md-3">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6 className="card-title fw-bold text-decoration-underline">Recently added organizations</h6>
//                 <p className="text-success mb-1">
//                   ✅ Under target by 37.63
//                 </p>
//                 <h2 className="fw-bold">57.37<small className="fs-6 fw-light">%</small></h2>
//                 <p className="text-success"><BsDot /> 0.00% from last refresh</p>
//               </div>
//             </div>
//           </div>

//           {/* Card 4 */}
//           <div className="col-md-3">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h6 className="card-title fw-bold text-decoration-underline">New Subscriptions</h6>
//                 <p className="text-success mb-1">
//                   ✅ Under target by 17.50
//                 </p>
//                 <h2 className="fw-bold">72.5<small className="fs-6 fw-light">%</small></h2>
//                 <p className="text-success"><BsDot /> 0.00% from last refresh</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default SuperAdminDashboard;

import React from "react";
import Layout from "./Layout/Layout";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const SuperAdminDashboard = () => {
  // Dummy KPI data
  const kpiCards = [
    { title: "Number of active organizations", value: "500", sub: "+3.5%", icon: "$" },
    { title: "Total subscriptions", value: "763", icon: "🧭" },
    { title: "Recently added organizations", value: "35.5%", icon: "📈" },
    { title: "New Subscriptions", value: "233", icon: "🆕" },
  ];

  const cardBgColors = ["bg-info", "#4c8bf5", "#42bde8", "#93c5fd"];

  // Dummy bar chart data
  const conversionsData = [
    { date: 'Oct 1', value: 25 },
    { date: 'Oct 2', value: 20 },
    { date: 'Oct 3', value: 30 },
    { date: 'Oct 4', value: 22 },
    { date: 'Oct 5', value: 17 },
    { date: 'Oct 6', value: 10 },
    { date: 'Oct 7', value: 18 },
    { date: 'Oct 8', value: 26 },
    { date: 'Oct 9', value: 28 },
    { date: 'Oct 10', value: 26 },
    { date: 'Oct 11', value: 20 },
    { date: 'Oct 12', value: 31 },
  ];

  // Dummy traffic data
  const trafficData = [
    { name: "Direct", value: 70 },
    { name: "Organic", value: 20 },
    { name: "Referral", value: 10 },
  ];

  const COLORS = ["#4c8bf5", "#a0c1f7", "#d4e2f4"];

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <h3 className="mb-4">Operational Dashboard</h3>

        {/* KPI Cards */}
        <div className="row g-4 mb-4">
          {kpiCards.map((card, index) => {
            const bg = cardBgColors[index % cardBgColors.length];
            const isHex = bg.startsWith("#");

            return (
              <div className="col-md-3" key={index} >
                <div
                  className={`card h-100 text-white ${!isHex ? bg : ""}`}
                  style={isHex ? { backgroundColor: bg, borderRadius: "10px" } : { borderRadius: "10px" }}
                >
                  <div className="card-body text-start" >
                    <p className="text-uppercase fw-semibold small mb-2 text-black">{card.title}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="fw-bold mb-0 text-black">
                        {card.value}
                        {card.sub && (
                          <span className="badge bg-light text-success ms-2 text-black">{card.sub}</span>
                        )}
                      </h4>
                      <span
                        className="text-white"
                        style={{ fontSize: "2rem", lineHeight: "1" }}
                      >
                        {card.icon}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="row g-4">
          {/* Conversions Bar Chart */}
          <div className="col-md-8">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title">Conversions</h5>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="comparisonSwitch" disabled />
                    <label className="form-check-label" htmlFor="comparisonSwitch">Last year comparison</label>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={conversionsData} barSize={20}>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 40]} tickFormatter={(value) => `${value}%`} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => `${value}%`} labelStyle={{ fontWeight: 'bold' }} />
                    <Bar dataKey="value" fill="#4c8bf5" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Traffic Channels Donut Chart */}
          <div className="col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mb-4">Traffic Channels</h5>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={trafficData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {trafficData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3">
                  {trafficData.map((entry, index) => (
                    <div key={index} className="d-flex align-items-center mb-1">
                      <span
                        className="me-2"
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: COLORS[index],
                          display: "inline-block",
                          borderRadius: "50%",
                        }}
                      />
                      {entry.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;

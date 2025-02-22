import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

export default function BarChart_temp({ data }) {

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300} style={{marginBottom : "50px"}}>
      <h2 style={{color:"white", justifySelf:"center"}}>Weekly Health Trends:</h2>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date"  tick={{ fill: "black" }}/>
        <YAxis  tick={{ fill: "black" }} domain={[0, "dataMax + 500"]}/>
        <Tooltip />
        <Legend />
        <YAxis tick={{ fill: "black" }} domain={[0, "dataMax + 500"]} />
        <Bar dataKey="calorieIntake" fill="#8884d8" barSize={40} />
        <Bar dataKey="calorieBurned" fill="#82ca9d" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

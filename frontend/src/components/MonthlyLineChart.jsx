import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const months = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function MonthlyLineChart({ data }) {

  if (!data || data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-400">
        No monthly data
      </div>
    );
  }

  const chartData = data.map((item) => ({
    month: `${months[item._id.month]} ${item._id.year}`,
    Applications: item.count,
  }));

  return (
    <div className="w-full h-80">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
          />

          <YAxis
            allowDecimals={false}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="Applications"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{
              r: 5,
            }}
            activeDot={{
              r: 8,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default MonthlyLineChart;
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts';

interface MiniChartProps {
  data: number[];
  color: string;
  type?: 'area' | 'bar' | 'line';
}

export default function MiniChart({
  data,
  color,
  type = 'area',
}: MiniChartProps) {
  const chartData = data.map((value, index) => ({
    value: Math.max(0, value + Math.random() * 2 - 1),
    index,
  }));

  const displayData =
    chartData.length > 0
      ? chartData
      : [
          { value: 0, index: 0 },
          { value: 0, index: 1 },
          { value: 0, index: 2 },
          { value: 0, index: 3 },
          { value: 0, index: 4 },
        ];

  const getColor = (colorName: string) => {
    const colorMap: Record<string, string> = {
      blue: '#3B82F6',
      yellow: '#F59E0B',
      green: '#10B981',
      red: '#EF4444',
      gray: '#6B7280',
    };
    return colorMap[colorName] || colorMap.gray;
  };

  const chartColor = getColor(color);

  if (type === 'bar') {
    return (
      <div className="h-10 w-14 sm:h-12 sm:w-16">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={displayData}>
            <Bar dataKey="value" fill={chartColor} radius={[1, 1, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === 'line') {
    return (
      <div className="h-10 w-14 sm:h-12 sm:w-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-10 w-14 sm:h-12 sm:w-16">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={displayData}>
          <Area
            type="monotone"
            dataKey="value"
            stroke={chartColor}
            fill={chartColor}
            strokeWidth={1.5}
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

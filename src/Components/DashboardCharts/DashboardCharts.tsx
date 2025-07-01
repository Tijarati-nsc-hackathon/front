import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts'; 
import { ordersData, returnRateData } from './ChartData.tsx'; 
import { useApiQuery } from '../../api/useApiCall'; // Adjust path if needed

// Define the type for the API response
type OrderOverTime = { name: string; orders: number };

const DashboardCharts: React.FC = () => {
  // Replace with actual shopId from your app's state/store/context
  const shopId = '920046e6-be39-408b-9742-b783dc71ee2b';

  // Fetch data from the API
  const { data: ordersData, isLoading, error } = useApiQuery<OrderOverTime[]>(
    ['order-over-time', shopId],
    `analytics/order-over-time/${shopId}`
  );

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600', color: '#333' }}>Orders Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={ordersData || []}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" /> {/* Dotted horizontal grid lines */}
            <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#e0e0e0' }} />
            <YAxis tickLine={false} axisLine={{ stroke: '#e0e0e0' }} domain={[0, 120]} ticks={[0, 30, 60, 90, 120]} />
            <Tooltip />
            {(ordersData && ordersData.length > 0) && (
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#66bb6a"
                strokeWidth={2}
                dot={{ stroke: '#66bb6a', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error loading data</div>}
      </div>

      {/* Return Rate by Delivery Agency Chart */}
      <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600', color: '#333' }}>Return Rate by Delivery Agency</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={returnRateData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <XAxis dataKey="agency" tickLine={false} axisLine={{ stroke: '#e0e0e0' }} />
            <YAxis tickLine={false} axisLine={{ stroke: '#e0e0e0' }} hide={true} /> 
            <Tooltip />
            <Bar dataKey="rate" barSize={25}>
              {returnRateData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.highlight ? '#fbbf24' : '#e0e0e0'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-bootstrap4';
import { ValueScale } from '@devexpress/dx-react-chart';

interface IDataItem {
  month: string,
  sale: number,
  total: number,
}

const chartData: IDataItem[] = [
  { month: 'Jan', sale: 50, total: 987 },
  { month: 'Feb', sale: 100, total: 3000 },
  { month: 'March', sale: 30, total: 1100 },
  { month: 'April', sale: 107, total: 7100 },
  { month: 'May', sale: 95, total: 4300 },
  { month: 'June', sale: 150, total: 7500 },
];

const Line =()=>{

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ValueScale name="sale" />
          <ValueScale name="total" />

          <ArgumentAxis />
          <ValueAxis scaleName="sale" showGrid={false} showLine={true} showTicks={true} />
          <ValueAxis scaleName="total" position="right" showGrid={false} showLine={true} showTicks={true} />

          <BarSeries
            name="Units Sold"
            valueField="sale"
            argumentField="month"
            scaleName="sale"
          />

          <LineSeries
            name="Total Transactions"
            valueField="total"
            argumentField="month"
            scaleName="total"
          />
        </Chart>
      </Paper>
    );
  }


export default Line
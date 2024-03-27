import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


const Chart = ({ value }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const chartProperties = {
      width: 850,
      height: 600,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      }
    };



    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${value}USDT&interval=1d&limit=1000`);
        const data = await response.json();
        if (chartRef.current) {
          chartRef.current.remove();
        }
        const cdata = data.map(d => {
          return { time: d[0] / 1000, open: parseFloat(d[1]), high: parseFloat(d[2]), low: parseFloat(d[3]), close: parseFloat(d[4]) };
        });

        setLoading(false)
        const chartInstance = createChart(chartContainerRef.current, chartProperties);
        const candleSeries = chartInstance.addCandlestickSeries();
        candleSeries.setData(cdata);

        chartRef.current = chartInstance;
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (chartRef.current === true) {
        chartRef.current.remove();
      }
    };

  }, [value]);

  return (
    <>
      {loading ? <> <Stack
        paddingTop={20}
        alignItems="center"
        justifyContent="center"
        sx={{ color: 'grey.500' }} spacing={2} direction="row">
        <CircularProgress color="secondary" />
      </Stack> </> : <div ref={chartContainerRef} />}
    </>
  )
};

export default Chart;

// import { ColorType, createChart } from 'lightweight-charts';
// import { useRef, useEffect } from 'react';

// const one = new Date();
// const year = one.getFullYear();
// const month = String(one.getMonth() + 1).padStart(2, '0'); 
// const day = String(one.getDate()).padStart(2, '0');










// export default function Chart({value}) {
//     const chartContainer = useRef()
    
//     const formattedDate = `${year}-${month}-${day}`;
//     // const formattedDate1 = `${year}-${month}-${day-1}`;
//     // const formattedDate2 = `${year}-${month}-${day-2}`;
//     // const formattedDate3 = `${year}-${month}-${day-3}`;
//     // const formattedDate4 = `${year}-${month}-${day-4}`;
//     // const formattedDate5 = `${year}-${month}-${day-5}`;
//     // console.log(formattedDate5)

//     useEffect(()=>{
//         const initialData=[
//             { time: formattedDate, value: +value.substring(0, value.indexOf('.')) }
//         ];
//         const chart = createChart(chartContainer.current, {
//             layout: {
//                 background: {type: ColorType.Solid, color: "FFF"}
//             },
//             width: 870,
            
//             height: 500,
//         });

//         const newSeries = chart.addAreaSeries({
//             lineColor: "#2962FF",
//             topColor: "#2962FF",
//             bottomColor: "#2962FF"
//         });
//         newSeries.setData(initialData)

//         return ()=>{
//             chart.remove()
//         }
//     }, []);

//     return <div ref={chartContainer}> </div>    
// }


import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const Chart = ({value}) => {
    const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const log = console.log;

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

            // Entfernen Sie den alten Chart, falls vorhanden
      if (chartRef.current) {
        chartRef.current.remove();
      }


        const cdata = data.map(d => {
          return { time: d[0] / 1000, open: parseFloat(d[1]), high: parseFloat(d[2]), low: parseFloat(d[3]), close: parseFloat(d[4]) };
        });

        const chartInstance = createChart(chartContainerRef.current, chartProperties);
        const candleSeries = chartInstance.addCandlestickSeries();
        candleSeries.setData(cdata);
        
        chartRef.current = chartInstance; // Save chart instance reference
      } catch (err) {
        log(err);
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

  return <div ref={chartContainerRef} />;
};

export default Chart;

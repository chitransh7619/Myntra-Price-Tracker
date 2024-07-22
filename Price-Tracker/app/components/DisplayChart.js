"use client"

import { Chart } from "react-charts";
import React from "react";
import { useEffect } from "react";

const DisplayChart = ({data}) => {
    useEffect(() => {
        console.log('Chart data:', JSON.stringify(data, null, 2));
    }, [data])

    const chartData = React.useMemo(() => {
        if (!data || data.length === 0 || !data[0].data) return [];
        return data[0].data.map(item => ({
            primary: new Date(item.time),
            secondary: item.price
        }));
    }, [data]);

    const primaryAxis = React.useMemo(
        () => ({
            getValue: datum => datum.primary,
            label: 'Date',
        }),
        []
    )
    
    const secondaryAxes = React.useMemo(
        () => [
            {
                getValue: datum => datum.secondary,
                label: 'Price',
            },
        ],
        []
    )

    if (!chartData || chartData.length === 0) {
        return <div>No data available for chart</div>;
    }

    return (
        <div style={{ width: '600px', height: '300px' }}>
            <Chart
                options={{
                    data: [{ label: 'Price', data: chartData }],
                    primaryAxis,
                    secondaryAxes,
                }}
            />
        </div>
    )
}

export default DisplayChart
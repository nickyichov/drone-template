import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto'

export default function Charts({ groundspeed }) {
    const canvasRef = useRef(null)
    const chartRef = useRef(null)

    // create chart once
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')

        const initialData = [
            { year: 2010, count: 1 },
            { year: 2011, count: 1 },
            { year: 2012, count: 2 },
            { year: 2013, count: 1 },
            { year: 2014, count: 1 },
            { year: 2015, count: 1 },
            { year: 2016, count: 2 },
        ]

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: initialData.map(row => row.year),
                datasets: [{
                    label: 'Wind Speed',
                    data: [0.1, 0, 0.2, 0.5, 0.8, 0.2, 0.3],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        })

        return () => {
            chartRef.current?.destroy()
            chartRef.current = null
        }
    }, [])

    // update chart when groundspeed changes
    useEffect(() => {
        const chart = chartRef.current
        if (!chart) return

        const label = new Date().toLocaleTimeString()
        chart.data.labels.push(label)
        chart.data.datasets.forEach(ds => ds.data.push(groundspeed))
        chart.update()
    }, [groundspeed])

    return (
        <>
            <canvas id="acquisitions" ref={canvasRef} />
        </>
    )
}
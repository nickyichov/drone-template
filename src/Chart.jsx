import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto'

export default function Charts({ groundspeed }) {
    const canvasRef = useRef(null)
    const chartRef = useRef(null)

    // create chart once
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')

        const initialData = [
            { year: new Date().toLocaleTimeString(), count: 0 },
        ]

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: initialData.map(row => row.year),
                datasets: [{
                    label: 'Wind Speed',
                    data: [groundspeed],
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
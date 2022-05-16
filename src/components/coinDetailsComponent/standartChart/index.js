import {LineChart} from 'react-native-wagmi-charts';

function StandardChart({SIZE, color}) {

    return (
        <LineChart height={SIZE / 2} width={SIZE}>
            <LineChart.Path color={color}>
                <LineChart.Gradient/>
            </LineChart.Path>
            <LineChart.CursorCrosshair color={color}/>
        </LineChart>
    )
}


export default StandardChart;
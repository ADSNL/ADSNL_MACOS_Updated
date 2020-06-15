import React, { Component } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Row, Col } from 'reactstrap';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Item',
                        data: [],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)'
                        ]
                    }
                ]
            }
        }
    }

    componentDidMount() {
        this.getClothing();
    }

    getClothing = async () => {
        await fetch("http://localhost:5000/api/chartData")
            .then(res => {
                return res.json();
            })
            .then(data => {

                let chartData = this.state.chartData;
                let _label = [];
                let _data = [];

                data.forEach(i => {
                    _label.push(i.year);
                    _data.push(i.order_count);
                });

                chartData.labels = _label;
                chartData.datasets[0].data = _data;

                this.setState({
                    chartData: chartData
                });
            })
            .catch(err => err);
    };

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'City'
    }

    render() {

        // const[checked, setChecked] = React.useState(true);

        // const handleChange = (event) => {
        //     setChecked(event.target.checked);
        // };    

        return (
            <div>
                <Row>
                    <Col sm="6">
                        <Line
                            data={this.state.chartData}
                            options={{
                                title: {
                                    display: this.props.displayTitle,
                                    text: 'Total Item purchased per year',
                                    fontSize: 25
                                },
                                legend: {
                                    display: this.props.displayLegend,
                                    position: this.props.legendPosition
                                }
                            }}
                        />
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        //checked={state.checkedB}
                                        //onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="2000"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        //checked={state.checkedB}
                                        //onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="2001"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        //checked={state.checkedB}
                                        //onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="2002"
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Chart;
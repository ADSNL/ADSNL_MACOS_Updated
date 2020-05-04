import React, { Component } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {Row, Col } from 'reactstrap';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['2000', '2001', '2002'],
                datasets: [
                    {
                        label: 'Item',
                        data: [120000, 120000, 420464],
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

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'City'
    }

    render() {
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
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Chart;
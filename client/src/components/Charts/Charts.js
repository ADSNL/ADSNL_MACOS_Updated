import React, { Component } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Row, Col } from 'reactstrap';

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
            },
            books: []
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
        legendPosition: 'left',
        location: 'City'
    }

    getBooks = async () => {
        await fetch("http://localhost:5000/api/books")
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({
                    books: data
                });
            })
            .catch(err => err);
    };

    componentDidMount() {
        this.getBooks();
    }

    render() {
        const booksData = this.state.books;
        const price = {
            priceAboveTen: [],
            priceBelowTen: []
        }

        for (let i = 0; i < booksData.length; i++) {
            if (booksData[i].Price >= 10) {
                price.priceAboveTen.push(booksData[i].Price);
            }
            else {
                price.priceBelowTen.push(booksData[i].Price);
            }
        }

        var data = {
            labels: ["Genre 1", "Genre 2", "Genre 3", "Genre 4", "Genre 5", "Genre 5", "Genre 6", "Genre 7", "Genre 8"],
            datasets: [
                {
                    label: "Price Above $10",
                    data: price.priceAboveTen,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ]
                },
                {
                    label: "Price Below $10",
                    data: price.priceBelowTen,
                    backgroundColor: [
                        'rgba(13, 7, 126, 1)',
                        'rgba(245, 66, 141, 1)',
                        'rgba(66, 189, 125, 1)',
                        'rgba(172, 189, 66, 1)',
                        'rgba(189, 66, 66, 1)',
                        'rgba(66, 105, 189, 1)',
                        'rgba(31, 255, 184, 1)'
                    ]
                }
            ]
        }
        return (
            <div>
                <Row>
                    <Col sm="6">
                        <Line
                            data={data}
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
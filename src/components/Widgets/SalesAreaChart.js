/**
 * Users Area Chart Widget
 */
import React from 'react';
import CountUp from 'react-countup';

// chart
import TinyAreaChart from 'Components/Charts/TinyAreaChart';

// chart config
import ChartConfig from 'Constants/chart-config';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

// helpers
import { hexToRgbA } from 'Helpers/helpers';

const salesData = {
    chartData: {
       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
       data: [600, 500, 650, 470, 520, 700, 500, 650, 580, 500, 650, 700]
    },
    today: 6544,
    totalRevenue: 9125
 }

const UsersAreaChart = ({ data }) => (
    <RctCard>
        <RctCardContent>
            <div className="clearfix">
                <div className="float-left">
                    <h3 className="mb-15 fw-semi-bold"><IntlMessages id="Orders" /></h3>
                    <div className="d-flex">
                        <div className="mr-50">
                            <CountUp separator="," className="counter-point" start={0} end={localStorage.getItem("ordersCount")} duration={5} useEasing={true} />
                        </div>
                    </div>
                </div>
                <div className="float-right hidden-md-down">
                    <div className="featured-section-icon">
                        <i className="zmdi zmdi-shopping-cart"></i>
                    </div>
                </div>
            </div>
        </RctCardContent>
        <TinyAreaChart
            label="Sales"
            chartdata={salesData.chartData.data}
            labels={salesData.chartData.labels}
            backgroundColor={hexToRgbA(ChartConfig.color.info, 0.1)}
            borderColor={hexToRgbA(ChartConfig.color.info, 3)}
            lineTension="0"
            height={70}
            gradient
            hideDots
        />
    </RctCard>
);

export default UsersAreaChart;

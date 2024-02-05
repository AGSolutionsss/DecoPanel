/**
 * Orders Area Chart Widget
 */
import React from 'react';
import CountUp from 'react-countup';

// chart
import TinyAreaChart from 'Components/Charts/TinyAreaChart';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// chart config
import ChartConfig from 'Constants/chart-config';

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

// helpers
import { hexToRgbA } from 'Helpers/helpers';

const ordersData = {
    chartData: {
       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
       data: [600, 500, 650, 470, 520, 700, 500, 650, 580, 500, 650, 700]
    },
    today: 5652,
    totalRevenue: 8520
 }

const OrdersAreaChart = (props) => (
    <RctCard>
        <RctCardContent>
            <div className="clearfix">
                <div className="float-left">
                    <h3 className="mb-15 fw-semi-bold"><IntlMessages id="Clients" /></h3>
                    <div className="d-flex">
                        <div className="mr-50">
                            <CountUp separator="," className="counter-point" start={0} end={localStorage.getItem("usersCount")} duration={5} useEasing={true} />
                        </div>
                    </div>
                </div>
                <div className="float-right hidden-md-down">
                    <div className="featured-section-icon">
                        <i className="zmdi zmdi-flash"></i>
                    </div>
                </div>
            </div>
        </RctCardContent>
        <TinyAreaChart
            label="Orders"
            chartdata={ordersData.chartData.data}
            labels={ordersData.chartData.labels}
            backgroundColor={hexToRgbA(ChartConfig.color.warning, 0.1)}
            borderColor={hexToRgbA(ChartConfig.color.warning, 3)}
            lineTension="0"
            height={70}
            gradient
            hideDots
        />
    </RctCard>
);

export default OrdersAreaChart;

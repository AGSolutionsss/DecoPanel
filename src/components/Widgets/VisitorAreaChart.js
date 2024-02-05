import React from 'react';
import CountUp from 'react-countup';
import TinyAreaChart from 'Components/Charts/TinyAreaChart';
import IntlMessages from 'Util/IntlMessages';
import { RctCard, RctCardContent } from 'Components/RctCard';
import ChartConfig from 'Constants/chart-config';
import { hexToRgbA } from 'Helpers/helpers';

const visitorsData = {
    chartData: {
       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
       data: [600, 500, 650, 470, 520, 700, 500, 650, 580, 500, 650, 700]
    },
    monthly: 7233,
    weekly: 5529
}


const VisitorAreaChart = (props) => (
    
    <RctCard>
        <RctCardContent>
            <div className="clearfix">
                <div className="float-left">
                    <h3 className="mb-15 fw-semi-bold"><IntlMessages id="Products" /></h3>
                    <div className="d-flex">
                        <div className="mr-50">
                            <CountUp 
                                separator=","
                                className="counter-point" 
                                start={0} 
                                end={localStorage.getItem("productsCount")} 
                                duration={5} 
                                useEasing={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="float-right hidden-md-down">
                    <div className="featured-section-icon">
                        <i className="zmdi zmdi-globe-alt"></i>
                    </div>
                </div>
            </div>
        </RctCardContent>
        <TinyAreaChart
            label="Visitors"
            chartdata={visitorsData.chartData.data}
            labels={visitorsData.chartData.labels}
            backgroundColor={hexToRgbA(ChartConfig.color.primary, 0.1)}
            borderColor={hexToRgbA(ChartConfig.color.primary, 3)}
            lineTension="0"
            height={70}
            gradient
            hideDots
        />
    </RctCard >
);

export default VisitorAreaChart;
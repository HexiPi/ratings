import * as React from 'react';
// import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import { getContrastYIQ } from 'color-functions-hexipi';
import '../css/RatingsSummary.css';
// import 'font-awesome/css/font-awesome.min.css';

interface RatingPercentages {
    [key: string]: number
}

type RatingPercentagesType = RatingPercentages & {
    '0.5'?: number,
    '1'?: number,
    '1.5'?: number,
    '2'?: number,
    '2.5'?: number,
    '3'?: number,
    '3.5'?: number,
    '4'?: number,
    '4.5'?: number,
    '5'?: number
};

interface RatingsSummaryProps {
    ratingPercentages: RatingPercentages,
    numberOfReviews: number,
    backgroundColor?: string
}

export const defaultRatingPercentages: RatingPercentages = {
    '0.5': 0,
    '1': 0,
    '1.5': 0,
    '2': 0,
    '2.5': 0,
    '3': 0,
    '3.5': 0,
    '4': 0,
    '4.5': 0,
    '5': 0
};

const calculateAvgRating = (ratingPercentages: RatingPercentagesType, totalNumberOfReviewers: number) => {
    const percentages: RatingPercentagesType = {
        ...defaultRatingPercentages,
        ...ratingPercentages
    };

    var totalSum = 0;

    Object.keys(percentages).forEach((key: string) => {
        const percentageValue = percentages[key];
        const numberOfReviewers = (percentageValue / 100) * totalNumberOfReviewers;
        const weightedValue = Number(numberOfReviewers) * Number(key);

        totalSum += weightedValue;
    });

    const averageVal = totalSum / totalNumberOfReviewers;
    return (averageVal) ? averageVal: 0.0;
}

const RatingsSummary: React.FunctionComponent<RatingsSummaryProps> = (props: RatingsSummaryProps) => {
    const renderRatingPercentages = () => {
        const ratingPercentages: RatingPercentagesType = {
            ...defaultRatingPercentages,
            ...props.ratingPercentages
        };

        const renderedRatingPercentagesProgressBars = Object.keys(ratingPercentages).sort((a: string, b: string) => Number(b) - Number(a)).map((key: string, _) => {
            var barColor;

            switch(key) {
                case '0.5':
                case '1':
                    barColor = 'danger';
                    break;
                case '1.5':
                case '2':
                    barColor = 'warning';
                    break;
                case '2.5':
                case '3':
                    barColor = 'info';
                    break;
                case '3.5':
                case '4':
                    barColor = 'primary';
                    break;
                case '4.5':
                case '5':
                    barColor = 'success';
                    break;
                default:
                    barColor = 'info';
            }
                return <Progress bar striped color={barColor} value={ratingPercentages[key]}>{`${key} ${(Number(key) === 1) ? 'star' : 'stars'}`}</Progress>
        });

        return (
            <div>
                <Progress multi>
                    {renderedRatingPercentagesProgressBars}
                </Progress>
            </div>
        );
    }

    return (
        <div className="ratings-summary-container" style={{ color: getContrastYIQ(props.backgroundColor??'black') }}>
            <p className="ratings-summary-heading">Reviews:</p>
            <div>
                <p className="rating-average"><span className="fa fa-star rating-star"></span> {calculateAvgRating(props.ratingPercentages, props.numberOfReviews).toFixed(1)} <span className="number-of-reviews">{props.numberOfReviews} {(Number(props.numberOfReviews) === 1) ? 'review' : 'reviews'}</span></p>
                {renderRatingPercentages()}
            </div>
        </div>
    );
}

// RatingsSummary.propTypes = {
//     ratingPercentages: PropTypes.object, // Ex. { '0.5': '1', '1': '2', '5': '98' } means 1% of 0.5 start rating, 2% of 1 star rating, 98% of 5 star rating
//     numberOfReviews: PropTypes.number,
// }

RatingsSummary.defaultProps = {
    ratingPercentages: { '3': 30, '4': 20, '5': 50 },
    numberOfReviews: 200,
    backgroundColor: 'black'
}

export default RatingsSummary;
export type { RatingPercentagesType as RatingPercentages };
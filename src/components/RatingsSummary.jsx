import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import '../css/RatingsSummary.css';

export const defaultRatingPercentages = {
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

const calculateAvgRating = (ratingPercentages, totalNumberOfReviewers) => {
    const percentages = {
        ...defaultRatingPercentages,
        ...ratingPercentages
    };

    var totalSum = 0;

    Object.keys(percentages).forEach(key => {
        const percentageValue = Number(percentages[key]);
        const numberOfReviewers = (percentageValue / 100) * Number(totalNumberOfReviewers);
        const weightedValue = Number(numberOfReviewers) * Number(key);

        totalSum += weightedValue;
    });

    const averageVal = totalSum / Number(totalNumberOfReviewers);
    return (averageVal) ? averageVal: 0.0;
}

const RatingsSummary = (props) => {
    const renderRatingPercentages = () => {
        const ratingPercentages = {
            ...defaultRatingPercentages,
            ...props.ratingPercentages
        };

        const renderedRatingPercentagesProgressBars = Object.keys(ratingPercentages).sort((a, b) => b - a).map((key, _) => {
            var barColor;

            switch(Number(key)) {
                case 0.5:
                case 1:
                    barColor = 'danger';
                    break;
                case 1.5:
                case 2:
                    barColor = 'warning';
                    break;
                case 2.5:
                case 3:
                    barColor = 'info';
                    break;
                case 3.5:
                case 4:
                    barColor = 'primary';
                    break;
                case 4.5:
                case 5:
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
        <div className="ratings-summary-container">
            <p className="ratings-summary-heading">Reviews:</p>
            <div>
                <p className="rating-average"><span className="fa fa-star rating-star"></span> {calculateAvgRating(props.ratingPercentages, props.numberOfReviews).toFixed(1)} <span className="number-of-reviews">{props.numberOfReviews} {(Number(props.numberOfReviews) === 1) ? 'review' : 'reviews'}</span></p>
                {renderRatingPercentages()}
            </div>
        </div>
    );
}

export default RatingsSummary;

RatingsSummary.propTypes = {
    ratingPercentages: PropTypes.object, // Ex. { '0.5': '1', '1': '2', '5': '98' } means 1% of 0.5 start rating, 2% of 1 star rating, 98% of 5 star rating
    numberOfReviews: PropTypes.number,
}

RatingsSummary.defaultProps = {
    ratingPercentages: { '3': 30, '4': 20, '5': 50 },
    numberOfReviews: 200,
}
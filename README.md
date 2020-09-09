# __Ratings React.JS Component by _#HexiPi___

## __<u>Installation:</u>__

````
npm install ratings-hexipi --save

OR

yarn add ratings-hexipi
````

## __<u>Example of Usage:</u>__

````javascript
import React, { Component } from 'react';
import RatingSection, { RatingsSummary, CommentRes, 
        defaultRatingPercentages } from 'ratings-hexipi';
import './App.css';

class App extends Component {
    state = {
        comments: [],
        commentSubmitRes: CommentRes.NONE,
    };


    calculateRatingPercentages = () => {
        //This is just an example function that calculates the rating percentages
        //and is probably not the most efficient way of doing this :p.

        const ratingsCount = { ...defaultRatingPercentages };
        const ratingPercentages = { ...defaultRatingPercentages };
        const totalNumberOfComments = this.state.comments.length;

        this.state.comments.forEach(comment => {
            const rating = comment.commenter_rating.toString();
            ratingsCount[rating] = Number(ratingsCount[rating]) + 1;
        });

        Object.keys(ratingsCount).forEach((key, _) => {
            const ratingCount = ratingsCount[key];
            const percentageCalc = 
                (Number(ratingCount) / totalNumberOfComments) * 100;

            ratingPercentages[key] = (percentageCalc) ? percentageCalc : 0;
        });

        return ratingPercentages;
    }

    addComment = commentInfo => {
        //Use to call your backend/API functions (or anything else you need)
        //to send the comment data.

        try {
            const comments = this.state.comments;

            commentInfo.timestamp = new Date().getTime();
            comments.push(commentInfo);

            this.setState({
                comments: comments,
                commentSubmitRes: CommentRes.OK
            });
        }
        catch(e) {
            this.setState({
                commentSubmitRes: CommentRes.ERROR,
            });
        }
    }

    //Set the state of the "commentSubmitRes" to the default so that
    //the form could be displayed again
    commentSubmitResultReset = () => 
        this.setState({ commentSubmitRes: CommentRes.NONE });

    render() {
        return(
            <div>
                <RatingsSummary 
                    ratingPercentages={this.calculateRatingPercentages()}  
                    numberOfReviews={this.state.comments.length}
                />
                <RatingSection
                    submitMethod="post"
                    commentsData={this.state.comments}
                    addComment={this.addComment}
                    commentSubmitResult={this.state.commentSubmitRes}
                    commentSubmitResultReset={this.commentSubmitResultReset}
                />
            </div>
        );
    }
}

export default App;
````

## __<u>Attributes & Data Types for RatingSection:</u>__

### Below is a list of all the available __attributes__:
<br>

````typescript
interface RatingSectionProps {
    //The form submission method (either "get" or "post")
    submitMethod: 'get' | 'post',

    //The optional custom main heading that would be displayed
    heading?: string,

    //The optional custom subheading that would be displayed
    subHeading?: string,

    //The array that will contain the comments that were made
    commentsData: CommentData[],

    //The optional custom "OK" message that would be displayed
    commentSubmitOKMsg?: string,

    //The optional custom "ERROR" message that would be displayed
    commentSubmitErrorMsg?: string,

    //The result of the comment submission
    //(one of the options of the CommentRes enum)
    commentSubmitResult: CommentRes,

    //The optional value of the background color of the page the RatingSection 
    //component is used on;
    //This helps determine the appropriate font color that the RatingSection 
    //component should use
    backgroundColor?: string,

    //Provides the ability for a website admin to delete review comments
    isAdmin?: Boolean,

    //The callback that is executed after the comment form is submitted;
    //The "comment" parameter holds the data that was submitted on the form of 
    //the type "CommentData"
    addComment: (comment: CommentData) => void,

    //The callback that is executed after the comment form is reset
    commentSubmitResultReset: () => void,

    //The optional callback that is executed after a comment is deleted by an admin;
    //The "comment_data" parameter holds the data of the comment 
    //which is of the type "CommentData"
    //This ONLY works when isAdmin is set to 'true'
    onCommentDelete?: (comment_data: CommentData) => void
}
````
#### <u>Note:</u> Most attributes are technically optional since they already have default values assigned to them. However the ones that are actually optional (marked with a "?") will not be shown or used by default (with the exception of the default headings). __All callback functions are required if you actually want the ratings form to work properly.__
<br>

### Below are all the available values of the __RatingSectionProps__ default values:
<br>

````typescript
RatingSectionProps.defaultProps = {
    heading: 'Add a Review...',

    subHeading: 'Let us know what you think!',

    commentsData: [],

    commentSubmitOKMsg: 'Review Submitted!',

    commentSubmitErrorMsg: 'An error has occurred (why???)!' +
        '😥 Please try again later.',

    commentSubmitResult: CommentRes.NONE,

    //The background containing the RatingSection component is 'black'
    backgroundColor: 'black',

    //Admin privileges are not allowed
    isAdmin: false
}
````
<br>

### Below are all the available values of the __CommentRes__ Enumerator:
<br>

````typescript
enum CommentRes {
    //The comment submitted successfully; a success message is displayed
    OK,

    //An error occurred during comment submission; an error message is displayed
    ERROR,

    //The comment form is displayed and is ready to be filled out
    NONE
}
````
<br>

### Below are all the available values of the __CommentData__ interface:
<br>

````typescript
interface CommentData {
  commenter_name: string,
  commenter_rating: number,
  comment_content: string,
  timestamp: number
}
````
<br>

## __<u>Attributes & Data Types for RatingsSummary:</u>__

### Below are all the available values of the __RatingsSummaryProps__ interface:
<br>

````typescript
interface RatingsSummaryProps {
    //The JSON object that will contain the rating percentages of the different
    //ratings that were made;
    //It should have the same structure as the RatingPercentages interface
    ratingPercentages: RatingPercentages,

    //The total number of reviews that were made;
    //This gets displayed for users to see
    numberOfReviews: number,

    //The optional value of the background color of the page the RatingsSummary 
    //component is used on;
    //This helps determine the appropriate font color that the RatingsSummary 
    //component should use
    backgroundColor?: string
}
````

### Below are all the available values of the __RatingsSummaryProps__ default values:
<br>

````typescript
RatingsSummary.defaultProps = {
    //30% are 3 star ratings, 20% are 4 star ratings, and 50% are 5 star ratings
    ratingPercentages: { '3': 30, '4': 20, '5': 50 },

    //200 total reviews
    numberOfReviews: 200,

    //The background containing the RatingsSummary component is 'black'
    backgroundColor: 'black'
}
````

### Below are all the available values of the __RatingPercentages__ interface:
<br>

````typescript
interface RatingPercentages {
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
````
<br>

### Below are all the available values of the __defaultRatingPercentages__ JSON Object:
<br>

````typescript
const defaultRatingPercentages: RatingPercentages = {
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
````

import React, { Component } from 'react';
import { Rating as RatingSection, RatingsSummary, CommentRes, defaultRatingPercentages } from './Ratings';
import { getCurrentPageBgColor } from 'color-functions-hexipi';
import './App.css';

class App extends Component {
  state = {
    comments: [], // [ { commenter_email: 'ja@test.com', commenter_name: 'Jose A.', comment_content: 'Cool stuff!', commenter_rating: 4 , timestamp: 1588787700000 } ],
    commentSubmitRes: CommentRes.NONE,
  };

  createRatingPercentages = () => {
    const ratingsCount = { ...defaultRatingPercentages };
    const ratingPercentages = { ...defaultRatingPercentages };
    const totalNumberOfComments = this.state.comments.length;

    this.state.comments.forEach(comment => {
      const rating = comment.commenter_rating.toString();
      ratingsCount[rating] = Number(ratingsCount[rating]) + 1;
    });

    Object.keys(ratingsCount).forEach((key, _) => {
      const ratingCount = ratingsCount[key];
      const percentageCalc = (Number(ratingCount) / totalNumberOfComments) * 100;

      ratingPercentages[key] = (percentageCalc) ? percentageCalc : 0;
    });

    return ratingPercentages;
  }

  addComment = (commentInfo) => {
    const comments = this.state.comments;

    commentInfo.timestamp = new Date().getTime();
    comments.push(commentInfo);

    this.setState({
      comments: comments,
      commentSubmitRes: CommentRes.OK
    });
  }

  commentSubmitResultReset = () => this.setState({ commentSubmitRes: CommentRes.NONE });

  render() {
    return(
      <div className="App-header">
        <div style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexFlow: 'row wrap', alignItems: 'center'}}>
          <div style={{ flexGrow: 1 }}>
            <RatingsSummary ratingPercentages={this.createRatingPercentages()}  numberOfReviews={this.state.comments.length} backgroundColor={getCurrentPageBgColor()}/>
          </div>
          <div style={{ flexGrow: 1 }}>
            <RatingSection
              commentsData={this.state.comments}
              addComment={this.addComment}
              commentSubmitResult={this.state.commentSubmitRes}
              commentSubmitResultReset={this.commentSubmitResultReset}
              backgroundColor={getCurrentPageBgColor()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
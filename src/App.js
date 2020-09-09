import React, { Component } from 'react';
import RatingSection, { RatingsSummary, CommentRes, defaultRatingPercentages } from './Ratings';
import { getCurrentPageBgColor } from 'color-functions-hexipi';
import './App.css';

class App extends Component {
  state = {
    comments: [], // [ { commenter_email: 'ja@test.com', commenter_name: 'Jose A.', comment_content: 'Cool stuff!', commenter_rating: 4 , timestamp: 1588787700000 } ],
    commentSubmitRes: CommentRes.NONE,
  };

  calculateRatingPercentages = () => {
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

  addComment = commentInfo => {
    const comments = this.state.comments;

    commentInfo.timestamp = new Date().getTime();
    comments.push(commentInfo);

    this.setState({
      comments: comments,
      commentSubmitRes: CommentRes.OK
    });
  }

  commentSubmitResultReset = () => this.setState({ commentSubmitRes: CommentRes.NONE });

  onCommentDelete = comment_data => {
    alert(JSON.stringify(comment_data));
  }

  render() {
    return(
      <div id="review-section" className="App-header">
        <div className="reviews-section-component-container">
          <div className="reviews-section-component">
            <RatingsSummary ratingPercentages={this.calculateRatingPercentages()}  numberOfReviews={this.state.comments.length} backgroundColor={getCurrentPageBgColor()}/>
          </div>
          <div className="reviews-section-component">
            <RatingSection
              submitMethod="post"
              commentsData={this.state.comments}
              addComment={this.addComment}
              commentSubmitResult={this.state.commentSubmitRes}
              commentSubmitResultReset={this.commentSubmitResultReset}
              backgroundColor={getCurrentPageBgColor()}
              isAdmin={true}
              onCommentDelete={this.onCommentDelete}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
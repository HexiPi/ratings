import React, { Component } from 'react';
import './App.css';
import RatingSection, { CommentRes } from './components/Rating.jsx';

class App extends Component {
  state = {
    comments: [], //[ { commenter_email: 'ja@test.com', commenter_name: 'Jose A.', comment_content: 'Cool stuff!', commenter_rating: 4 , timestamp: 1588787700000 } ],
    commentSubmitRes: CommentRes.NONE,
  };

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
        <div style={{ width: '25%', marginLeft: 'auto', marginRight: 'auto' }}>
            <RatingSection
                blockGroupInfo={this.state.comments}
                addComment={this.addComment}
                commentSubmitResult={this.state.commentSubmitRes}
                commentSubmitResultReset={this.commentSubmitResultReset}
            />
        </div>
      </div>
    );
  }
}

export default App;
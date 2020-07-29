import React from 'react';
import PropTypes from 'prop-types';
import CommentBlock from './CommentBlock.jsx';
import { Form, FormGroup, Label, Input, Button, Tooltip } from  'reactstrap';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import '../css/Rating.css';

export const CommentRes = {
    OK: 'OK',
    ERROR: 'ERROR',
    NONE: 'NONE'
}

class RatingSection extends React.Component {
  state = {
      commenter_name: '',
      comment_content: '',
      commenter_rating: 0,
      commentSubmitResult: CommentRes.NONE,
      showNoRatingErrMsg: false,
  };

  generateCommentBlockGroup = (blockGroupInfo) => {
      let blockGroup = [];

      if (blockGroupInfo.length !== 0) {
          blockGroupInfo.forEach((blockInfo) => {
              blockGroup.push((
                  <CommentBlock comment_data={blockInfo}/>
              ));
          });
      }
      else {
          const data = {
              commenter_name: "No Reviews...yet.",
              comment_content: "",
              timestamp: "null"
          }

          blockGroup.push((
              <CommentBlock
                  comment_data={data}
              />
          ));
      }

      return blockGroup;
  }

  handleInputChange = (e) => {
      const target = e.currentTarget;
      const name = target.name;

      if (name === "RESET_BTN") {
          this.setState({
              commenter_email: '',
              commenter_name: '',
              comment_content: '',
              commenter_rating: 0,
              showNoRatingErrMsg: false,
          });
      }
      else {
        this.setState({
            [name]: target.value,
        });
      }
  }

  processForm = (e) => {
      e.preventDefault();
      
      const { commenter_email, commenter_name, comment_content, commenter_rating } = this.state;
      const newComment = { commenter_email, commenter_name, comment_content, commenter_rating };

      if (commenter_rating === 0) {
          this.setState({
            showNoRatingErrMsg: true,
          });
      }
      else {
        this.setState({
            commentSubmitResult: CommentRes.OK,
            showNoRatingErrMsg: false,
        }, () => this.props.addComment(newComment));
      }
  }

  displayForm = () => {
      if (this.props.commentSubmitResult === CommentRes.NONE) {
          return (
            <Form id="comment-form" onSubmit={this.processForm}>
                <FormGroup>
                    <Label for="commenter_rating"><span id="rating-label">Rating:</span></Label><br />
                    <Tooltip isOpen={this.state.showNoRatingErrMsg} target="rating-label" placement="right">
                        Please enter a rating!
                    </Tooltip>
                    <fieldset className="rating" name="rating">
                        <Input id="star5full" className="commenter-rating" name="commenter_rating" type="radio" value="5" onClick={this.handleInputChange} /><Label for="star5full" className="fa fa-star full"></Label>
                        <Input id="star5half" className="commenter-rating" name="commenter_rating" type="radio" value="4.5" onClick={this.handleInputChange} /><Label for="star5half" className="fa fa-star-half half"></Label>
                        <Input id="star4full" className="commenter-rating" name="commenter_rating" type="radio" value="4" onClick={this.handleInputChange} /><Label for="star4full" className="fa fa-star full"></Label>
                        <Input id="star4half" className="commenter-rating" name="commenter_rating" type="radio" value="3.5" onClick={this.handleInputChange} /><Label for="star4half" className="fa fa-star-half half"></Label>
                        <Input id="star3full" className="commenter-rating" name="commenter_rating" type="radio" value="3" onClick={this.handleInputChange} /><Label for="star3full" className="fa fa-star full"></Label>
                        <Input id="star3half" className="commenter-rating" name="commenter_rating" type="radio" value="2.5" onClick={this.handleInputChange} /><Label for="star3half" className="fa fa-star-half half"></Label>
                        <Input id="star2full" className="commenter-rating" name="commenter_rating" type="radio" value="2" onClick={this.handleInputChange} /><Label for="star2full" className="fa fa-star full"></Label>
                        <Input id="star2half" className="commenter-rating" name="commenter_rating" type="radio" value="1.5" onClick={this.handleInputChange} /><Label for="star2half" className="fa fa-star-half half"></Label>
                        <Input id="star1full" className="commenter-rating" name="commenter_rating" type="radio" value="1" onClick={this.handleInputChange} /><Label for="star1full" className="fa fa-star full"></Label>
                        <Input id="star1half" className="commenter-rating" name="commenter_rating" type="radio" value="0.5" onClick={this.handleInputChange} /><Label for="star1half" className="fa fa-star-half half"></Label>
                    </fieldset>
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="commenter_email">Email:</Label>
                        <Input name="commenter_email" id="form-field-email" className="form-control" placeholder="My Email Address" type="email" onChange={this.handleInputChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="commenter_name">Name:</Label>
                        <Input name="commenter_name" id="form-field-name" className="form-control" placeholder="My Name" onChange={this.handleInputChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="comment_content">Message:</Label>
                        <textarea name="comment_content" id="form-field-message" className="form-control" cols="40" rows="5" maxLength="500" placeholder="My Review" onChange={this.handleInputChange} required></textarea>
                    </FormGroup>
                    <FormGroup className="form-button-group">
                    <Button style={{ flexGrow: 1 }} id="form-submit-btn" color="success" className="btn btn-primary" type="submit">Submit</Button>&nbsp;
                    <Button style={{ flexGrow: 1 }} name="RESET_BTN" id="form-reset-btn" className="btn btn-danger" type="reset" onClick={this.handleInputChange}>Reset</Button>
                </FormGroup>
            </Form>
          )
      }
      else if (this.props.commentSubmitResult === CommentRes.OK) {
          return(
              <div className="text-container">
                  Review Submitted!<br />
                  <button className="btn btn-link" style={{color: 'deepskyblue'}} onClick={this.resetCommentForm}>Click me to submit another one!</button>
              </div>
          );
      }
      else if (this.props.commentSubmitResult === CommentRes.ERROR) {
          return(
              <div className="text-container">
                  An error has occurred (why???)! Please try again later.<br />
              </div>
          );
      }
  }

  resetCommentForm = (e) => {
      const target = e.target;
      target.disabled = true;

      let count = 5;
      const formShowInterval = setInterval(() => {
          if (count !== 0) {
              if (count !== 1) {
                  target.innerHTML = `Ready in ${count} secs...`;
              }
              else {
                  target.innerHTML = `Ready in ${count} sec...`;
              }
              count--;
          }
          else {
              clearInterval(formShowInterval);
              this.props.commentSubmitResultReset();
          }
      }, 1000);
  }

  render() {
    return (
        <div>
            <div className="ratings-container">
                <h2>{this.props.heading}</h2>
                <h5>{this.props.subHeading}</h5>
                <br />
                {this.displayForm()}
                <br /><br />
                <h2>Reviews</h2>
                {this.generateCommentBlockGroup(this.props.blockGroupInfo)}
            </div>
        </div>
      );
    }
}

RatingSection.propTypes = {
    heading: PropTypes.string,
    blockGroupInfo: PropTypes.arrayOf(PropTypes.object), //JSON object with properties { commenter_name ,comment_content, timestamp }
    commentSubmitResult: PropTypes.objectOf(CommentRes),
    addComment: PropTypes.func,
    commentSubmitResultReset: PropTypes.func,
}

RatingSection.defaultProps = {
    heading: 'Add a Review...',
    subHeading: 'Let us know what you think!',
    blockGroupInfo: [],
    commentSubmitResult: CommentRes.NONE,
    addComment: (_) => {},
    commentSubmitResultReset: () => {},
}

export default RatingSection
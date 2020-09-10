import * as React from 'react';
import * as queryString from 'query-string';
// import PropTypes from 'prop-types';
import CommentBlock, { CommentData, CommentDataBare } from './CommentBlock';
import { Form, FormGroup, Label, Input, Button, Tooltip } from 'reactstrap';
import { getContrastYIQ } from 'color-functions-hexipi';
import '../css/RatingSection.css';
// import 'font-awesome/css/font-awesome.min.css';

export enum CommentRes {
    OK,
    ERROR,
    NONE
}

interface RatingSectionProps {
    submitMethod: 'get' | 'post',
    heading: string,
    subHeading: string,
    commentsData: CommentData[],
    commentSubmitOKMsg: string,
    commentSubmitErrorMsg: string,
    commentSubmitResult: CommentRes,
    backgroundColor: string,
    isAdmin: Boolean,
    addComment: (comment: CommentDataBare) => void,
    commentSubmitResultReset: () => void,
    onCommentDelete: (comment_data: CommentData) => void
}

class RatingSection extends React.Component<RatingSectionProps, {}> {
    static defaultProps = {
        submitMethod: 'get',
        heading: 'Add a Review...',
        subHeading: 'Let us know what you think!',
        commentsData: [],
        commentSubmitOKMsg: 'Review Submitted!',
        commentSubmitErrorMsg: <span>An error has occurred (why???)! <span role="img" aria-label="sad face">😥</span> Please try again later.</span>,
        commentSubmitResult: CommentRes.NONE,
        backgroundColor: 'black',
        isAdmin: false,
        onCommentDelete: (_: CommentData) => {}
    }

    static defaultState = {
        commenter_email: '',
        commenter_name: '',
        comment_content: '',
        commenter_rating: 0,
        showNoRatingErrMsg: false,
    };

    state = {
        commenter_email: '',
        commenter_name: '',
        comment_content: '',
        commenter_rating: 0,
        showNoRatingErrMsg: false,
    };

    componentDidMount = () => {
        if (this.props.submitMethod.toLowerCase() === 'get') {
            const query = queryString.parse(window.location.search);

            if (Object.keys(query).length > 0) {
                if ((query.commenter_email && query.commenter_name && query.comment_content) && (!query.commenter_rating || Number(query.commenter_rating) === 0)) {
                    this.setState({
                        commenter_email: query.commenter_email,
                        commenter_name: query.commenter_name,
                        comment_content: query.comment_content,
                        showNoRatingErrMsg: true,
                    });
                }
                else if (query.commenter_email && query.commenter_name && query.comment_content && query.commenter_rating) {
                    const newComment: CommentDataBare = {
                        commenter_email: query.commenter_email.toString(),
                        commenter_name: query.commenter_name.toString(),
                        comment_content: query.comment_content.toString(),
                        commenter_rating: Number(query.commenter_rating)
                    }
                    
                    this.props.addComment(newComment);
                }
            }
        }
    }

    generateCommentBlockGroup = (commentsData: CommentData[]) => {
        let blockGroup = [];

        if (commentsData.length !== 0) {
            commentsData.forEach((commentData: CommentData) => {
                blockGroup.push((
                    <CommentBlock comment_data={commentData} isAdmin={this.props.isAdmin} onCommentDelete={this.props.onCommentDelete} />
                ));
            });
        }
        else {
            const data = {
                commenter_name: "No Reviews...yet.",
                commenter_rating: 0.0,
                comment_content: "",
                timestamp: -1
            }

            blockGroup.push((
                <CommentBlock
                    comment_data={data}
                />
            ));
        }

        return blockGroup;
    }

    handleInputChange = (e: any) => {
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

    processForm = (e: any) => {
        const isPost = this.props.submitMethod.toLowerCase() === 'post';

        if (isPost) {
            e.preventDefault();

            const { commenter_email, commenter_name, comment_content, commenter_rating } = this.state;
            const newComment: CommentDataBare = { 
                commenter_email, 
                commenter_name, 
                comment_content, 
                commenter_rating 
            };

            if (commenter_rating === 0) {
                e.preventDefault();
                this.setState({
                    showNoRatingErrMsg: true,
                });
            }
            else {
                this.props.addComment(newComment);
                this.setState(RatingSection.defaultState);
            }
        }
    }

    displayForm = () => {
        if (this.props.commentSubmitResult === CommentRes.NONE) {
            return (
                <Form id="comment-form" onSubmit={this.processForm} method={this.props.submitMethod}>
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
                            <Input name="commenter_email" id="form-field-email" className="form-control" placeholder="My Email Address" type="email" value={this.state.commenter_email} onChange={this.handleInputChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="commenter_name">Name:</Label>
                            <Input name="commenter_name" id="form-field-name" className="form-control" placeholder="My Name" value={this.state.commenter_name} onChange={this.handleInputChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="comment_content">Message:</Label>
                            <textarea name="comment_content" id="form-field-message" className="form-control" cols={40} rows={5} maxLength={500} placeholder="My Review" value={this.state.comment_content} onChange={this.handleInputChange} required></textarea>
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
                <div className="status-container">
                    {this.props.commentSubmitOKMsg}<br />
                    <Button color="link" style={{color: 'deepskyblue'}} onClick={this.resetCommentForm}>Click me to submit another one!</Button>
                </div>
            );
        }
        else if (this.props.commentSubmitResult === CommentRes.ERROR) {
            return(
                <div className="status-container">
                    {this.props.commentSubmitErrorMsg}<br />
                </div>
            );
        }
    }

    resetCommentForm = (e: any) => {
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
                <div className="ratings-container" style={{ color: getContrastYIQ(this.props.backgroundColor) }}>
                    <h2>{this.props.heading}</h2>
                    <h5>{this.props.subHeading}</h5>
                    <br />
                    {this.displayForm()}
                    <br /><br />
                    <h2>Reviews</h2>
                    {this.generateCommentBlockGroup(this.props.commentsData)}
                </div>
            </div>
        );
    }
}

// RatingSection.propTypes = {
//     heading: PropTypes.string,
//     commentsData: PropTypes.arrayOf(PropTypes.object), //JSON object with properties { commenter_name ,comment_content, timestamp }
//     commentSubmitResult: PropTypes.objectOf(CommentRes),
//     addComment: PropTypes.func,
//     commentSubmitResultReset: PropTypes.func,
//     backgroundColor: PropTypes.string,
// }

// RatingSection.defaultProps = {
//     heading: 'Add a Review...',
//     subHeading: 'Let us know what you think!',
//     commentsData: [],
//     commentSubmitResult: CommentRes.NONE,
//     addComment: (_) => {},
//     commentSubmitResultReset: () => {},
//     backgroundColor: 'black',
// }

export default RatingSection;
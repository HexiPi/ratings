import * as React from 'react';
import { formatDate } from '../js/dateFunctions';
import '../css/CommentBlock.css';
// import 'font-awesome/css/font-awesome.min.css';

interface CommentData {
  commenter_name: string,
  commenter_rating: number,
  comment_content: string,
  timestamp: number
};

interface CommentDataBare {
  commenter_email?: string,
  commenter_name: string,
  commenter_rating: number,
  comment_content: string,
  timestamp?: number
};

interface CommentBlockProps {
  comment_data: CommentData
};

const CommentBlock = (props: CommentBlockProps) => {
    return(
        <div className="comment-container">
            <div className="comment-container-user-icon-container">
                <span className="fa fa-user"></span>
            </div>
            <div className="comment-container-comment-body">
                <h5 className="comment-container-commenter-name">{props.comment_data.commenter_name}</h5>
                {
                  (props.comment_data.commenter_rating)
                  ?
                    <div className="comment-container-commenter-rating">
                      <span id="star5full" className={`fa fa-star full ${(Number(props.comment_data.commenter_rating) >= 5) ? 'filled' : ''}`}></span>
                      <span id="star5half" className={`fa fa-star-half half ${(Number(props.comment_data.commenter_rating) >= 4.5) ? 'filled' : ''}`}></span>
                      <span id="star4full" className={`fa fa-star full ${(Number(props.comment_data.commenter_rating) >= 4) ? 'filled' : ''}`}></span>
                      <span id="star4half" className={`fa fa-star-half half ${(Number(props.comment_data.commenter_rating) >= 3.5) ? 'filled' : ''}`}></span>
                      <span id="star3full" className={`fa fa-star full ${(Number(props.comment_data.commenter_rating) >= 3) ? 'filled' : ''}`}></span>
                      <span id="star3half" className={`fa fa-star-half half ${(Number(props.comment_data.commenter_rating) >= 2.5) ? 'filled' : ''}`}></span>
                      <span id="star2full" className={`fa fa-star full ${(Number(props.comment_data.commenter_rating) >= 2) ? 'filled' : ''}`}></span>
                      <span id="star2half" className={`fa fa-star-half half ${(Number(props.comment_data.commenter_rating) >= 1.5) ? 'filled' : ''}`}></span>
                      <span id="star1full" className={`fa fa-star full ${(Number(props.comment_data.commenter_rating) >= 1) ? 'filled' : ''}`}></span>
                      <span id="star1half" className={`fa fa-star-half half ${(Number(props.comment_data.commenter_rating) >= 0.5) ? 'filled' : ''}`}></span>
                    </div>
                  :
                    ""
                }
                <br />
                <p className="comment-container-comment-content">{props.comment_data.comment_content}</p>
                <p className="comment-container-comment-date">{formatDate(props.comment_data.timestamp, true)}</p>
            </div>
        </div>
    );
}

export default CommentBlock;
export type { CommentData, CommentDataBare };
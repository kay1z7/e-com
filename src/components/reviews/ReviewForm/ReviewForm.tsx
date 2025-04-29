import { useMutation } from "@apollo/client";
import { useState } from "react";

import CloseIcon from "@/src/assets/icons/x.svg";
import { COMMENT_MUTATION } from "@/src/lib/mutations/CommentMutation";

import Button from "../../base/Button/Button";
import css from "./ReviewForm.module.scss";

const ReviewForm = ({ addReviews, setReviewForm, barcodeId }) => {
  const [newText, setNewText] = useState("");
  const [addComment] = useMutation(COMMENT_MUTATION);

  const handleAddComment = async () => {
    try {
      const response = await addComment({
        variables: { barcodeId, commentText: newText },
      });
      const newReview = response?.data?.createComment?.comment;
      addReviews(newReview);
      setReviewForm(false);
      setNewText("");
    } catch (error) {
      console.error("There was an error posting the review!", error);
    }
  };
  return (
    <div className={css.review_form}>
      <button className={css.review_btn_close}>
        <CloseIcon
          onClick={() => {
            setReviewForm(false);
          }}
        />
      </button>
      <h2>Оставьте отзыв</h2>
      <textarea onChange={(e) => setNewText(e.target.value)} placeholder="Напишите ваш отзыв" />

      <Button text="Отправить отзыв" variant="lightBlue" onClick={handleAddComment} />
    </div>
  );
};

export default ReviewForm;

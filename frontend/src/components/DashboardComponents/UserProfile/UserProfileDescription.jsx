import { useState } from "react";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";

export default function UserProfileDescription() {
    const [rating, setRating] = useState(0);

    return (
        <div className="userProfileDescriptionContainer">
            <div className="userProfileDescription">
                <h2>DESCRIPTION</h2>
                <h2>Describe yourself!</h2>
            </div>

            <div className="userProfileRating">
                <div className="ratingButtonRow">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                        >
                            {rating >= star ? (
                                <TiStarFullOutline className="starButton" />
                            ) : (
                                <TiStarOutline className="starButton" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="ratingDescription">
                    <h2>Community Rating</h2>
                    <p>
                        After a task is completed, an employer can rate the
                        individual on their performance. Ratings are given on a
                        scale of 1 to 5 stars, reflecting reliability, quality of
                        work, communication, and overall experience.
                    </p>
                </div>
            </div>
        </div>
    );
}

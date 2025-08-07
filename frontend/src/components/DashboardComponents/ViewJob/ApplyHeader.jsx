import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function ApplyHeader() {
    const [applied, setApplied] = useState(false);

    return (
        <div className="applyHeader">
            <div className="rowThis">
                <button className="returnButton">
                    <IoArrowBackCircleOutline />
                </button>
                <p>Recommended for beginners</p>
            </div>

            <button
                className={`applyButton ${applied ? "appliedButton" : ""}`}
                onClick={() => setApplied(true)}
                disabled={applied}
            >
                {applied ? "Applied" : "Apply"}
            </button>
        </div>
    );
}
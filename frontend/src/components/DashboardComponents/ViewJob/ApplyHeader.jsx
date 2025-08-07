import { Link } from "react-router-dom"
import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function ApplyHeader() {
    const [applied, setApplied] = useState(false);

    return (
        <div className="applyHeader">
            <div className="rowThis">
                <Link className="returnButton" to="/dashboard">
                    <button className="returnButton">
                        <IoArrowBackCircleOutline />
                    </button>
                </Link>
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
import { Link } from "react-router-dom"
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function DeleteHeader() {
    return (
        <div className="applyHeader">
            <div className="rowThis">
                <Link className="returnButton" to="/dashboard">
                    <button className="returnButton">
                        <IoArrowBackCircleOutline />
                    </button>
                </Link>
            </div>

            <button className="applyButton">
                Delete Post
            </button>
        </div>
    );
}
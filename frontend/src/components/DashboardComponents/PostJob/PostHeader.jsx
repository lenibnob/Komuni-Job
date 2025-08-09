import { Link } from 'react-router-dom'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";

export default function PostHeader(data) {

    return (
        <div className="postHeader">
            <div className="rowThis">
                <Link className="rowThis" to="/dashboard">
                    <button className="returnButton">
                        <IoArrowBackCircleOutline />
                    </button>
                </Link>
                <p>Create Job Posting</p>
            </div>

            <div className="groupThis">
                <button className="deletePostButton"><FiTrash2 /></button>
                <button className="postHeaderButton">Preview</button>
                <button className="postHeaderButton">Save as Draft</button>
                <button className="postHeaderButton">Publish</button>
            </div>

        </div>
    );
}
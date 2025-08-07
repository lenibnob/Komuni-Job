import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";

export default function PostHeader() {

    return (
        <div className="postHeader">
            <div className="rowThis">
                <button className="returnButton">
                    <IoArrowBackCircleOutline />
                </button>
                <p>Create Job Posting</p>
            </div>

            <div className="groupThis">
                <button className="deletePostButton"><FiTrash2 /></button>
                <button className="postHeaderButton">Preview</button>
                <button className="postHeaderButton">Draft</button>
                <button className="postHeaderButton">Publish</button>
            </div>

        </div>
    );
}
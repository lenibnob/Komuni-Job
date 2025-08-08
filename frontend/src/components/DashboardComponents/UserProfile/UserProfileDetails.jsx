import { MdMailOutline } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { HiOutlinePhone } from "react-icons/hi";

export default function UserProfileDetails() {
    return (
        <div className="userProfileDetails">
            <div className="userProfileImage">
                {/*INSERT IMAGE HERE BACKEND DEVS*/}
            </div>
            <div className="userProfileText">
                {/*INSERT DATA HERE BACKEND DEVS*/}
                <h1>Juan Dela Cruz</h1>
                <h1>Tier</h1>
                <h2>Joined July 2025</h2>
            </div>
            <div className="userProfileContacts">
                <h2><MdMailOutline className="userProfileEmail"/>user123@gmail.com</h2>
                <h2><GrLocation className="userProfileLocation"/>City, Country</h2>
                <h2><HiOutlinePhone className="userProfileNumber"/>09XX-XXX-XXXX</h2>
            </div>
        </div>
    );
}
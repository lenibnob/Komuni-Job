import { MdMailOutline } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { useState, useEffect } from 'react';
import { HiOutlinePhone } from "react-icons/hi";
import { BASE_URL } from "@/endpoints/api";

export default function UserProfileDetails() {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        fetch(`${BASE_URL}api/accounts/profile`, {
            method: "GET",
            credentials: 'include',
        })
        .then(res => {
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => setProfile(data))
        .catch(err => console.error("Fetch error: ", err));
    }, []);

    function DisplayProfile({data}) {
        return (
            <div className="userProfileDetails">
                <div className="userProfileImage">
                    {/*INSERT IMAGE HERE BACKEND DEVS*/}
                </div>
                <div className="userProfileText">
                    {/*INSERT DATA HERE BACKEND DEVS*/}
                    <h1>{profile.user?.first_name} {profile.user?.last_name}</h1>
                    <h1>Tier</h1>
                    <h2>Joined July 2025</h2>
                </div>
                <div className="userProfileContacts">
                    <h2><MdMailOutline className="userProfileEmail"/>{profile.user?.email}Email here</h2>
                    <h2><GrLocation className="userProfileLocation"/>{profile.municipality}Location here {profile.province}</h2>
                    <h2><HiOutlinePhone className="userProfileNumber"/>{profile.phone_number}Phone number here</h2>
                </div>
            </div>
        );
    }
    
    return(
        <>
            <DisplayProfile data={profile}/>
        </>
    )
}
import "../css/Favorites.css";
import NavBar from "../components/Navbar";

export default function Favorites() {
    return (
        <>
            <NavBar />

            <div className="favorites-empty">
                <h2>No Favorite Moopies Yet</h2>
                <p>Start adding movies to your favorites and they will appear here</p>
                 
            </div>
        </>
    )
}
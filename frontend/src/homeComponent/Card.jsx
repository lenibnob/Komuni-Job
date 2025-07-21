import "../css/Home.css";

export default function Card({className, heading1, heading2}) {
    return (
        <div className={className}>
            <h1>{heading1}</h1>
            <hr />
            <h2>{heading2}</h2>
        </div>
    );
}
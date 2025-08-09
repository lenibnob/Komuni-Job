const journeySteps = [
  { id: 1, title: "" },
  { id: 2, title: "" },
  { id: 3, title: "" },
  { id: 4, title: "" },
  { id: 5, title: "" },
];

export default function JourneyPath() {
  return (
    <section className="journey-container">
      <h2>Your Journey Path</h2>
      <p className="subtitle">Start with nothing. Build your Future</p>
      <div className="card-wrapper">
        {journeySteps.map((step) => (
          <div key={step.id} className="glass-card-last">
            <h3 className="card-title">{step.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

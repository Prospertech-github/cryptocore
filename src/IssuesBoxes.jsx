function IssueBoxes({ title, description, icon, link }) {
    return (
      <div className="issue-box" onClick={() => window.location.href = link}>
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
}

export default IssueBoxes
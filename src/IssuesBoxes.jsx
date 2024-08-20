function IssueBoxes({ title, description, icon, showModal }) {
    return (
      <div className="issue-box" onClick={showModal}>
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
}

export default IssueBoxes
const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.login} className="avatar" />
      <div className="user-info">
        <h3>{user.login}</h3>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          View Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;
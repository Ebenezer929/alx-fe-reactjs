import UserCard from './UserCard';

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {users.length > 0 ? (
        users.map((user) => <UserCard key={user.id} user={user} />)
      ) : (
        <p>No users found. Try a different search.</p>
      )}
    </div>
  );
};

export default UserList;
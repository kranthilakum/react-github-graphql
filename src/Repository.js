function Repository({ repo }) {
  return (
    <li key={repo.id}>
      <a href={repo.url}>{repo.name}</a>
      <p>{repo.description}</p>
    </li>
  );
}
export default Repository;

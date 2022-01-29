function Repository({ repo }) {
  const languages = repo.languages.nodes
    .map((language) => language.name)
    .join(", ");
  return (
    <div className="border border-slate-300 shadow-md py-6 my-6" key={repo.id}>
      <a href={repo.url} target="_blank" rel="noreferrer">
        <strong className="font-bold capitalize">{repo.name}</strong>
        <span className="p-1 mx-2 text-xs border-solid border-slate-400 rounded-lg bg-gray-200">
          {repo.isPrivate ? "Private" : "Public"}
        </span>
      </a>
      <p>{repo.description}</p>
      <div className="uppercase">{repo.licenseInfo?.spdxId}</div>
      <div className="text-sm">{languages}</div>
      <div className="text-sm text-gray-600">{repo.diskUsage} kilobytes</div>
    </div>
  );
}
export default Repository;

function Repository({ repo }) {
  return (
    <div className="border border-slate-300 shadow-md py-6 my-6" key={repo.id}>
      <a href={repo.url} target="_blank" rel="noreferrer">
        <strong className="font-bold capitalize">{repo.name}</strong>
        <span className="px-1 mx-2 text-xs border border-solid border-slate-400 rounded-full bg-gray-200">
          {repo.isPrivate ? "Private" : "Public"}
        </span>
      </a>
      <p>{repo.description}</p>
      <div className="uppercase">{repo.licenseInfo?.spdxId}</div>
      <div>
        {repo.languages.nodes.map((language) => (
          <span
            key={language.id}
            className="text-xs border border-solid border-slate-400 rounded-full bg-gray-200 px-2 space-x-6"
          >
            {language.name}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-600">{repo.diskUsage} kilobytes</div>
    </div>
  );
}
export default Repository;

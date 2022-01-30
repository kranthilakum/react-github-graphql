const userName = process.env.REACT_APP_USER_NAME;
const Queries = (searchTerm) => {
  const searchQuery = searchTerm
    ? `user:${userName} /${searchTerm}/ sort:updated-desc`
    : `user:${userName} sort:updated-desc`;
  return {
    query: `
      {
        viewer {
          login
          name
        }
        search(type: REPOSITORY, query: "${searchQuery}", first: 10) {
          nodes {
            ...on Repository {
              id
              name
              url
              description
              diskUsage
              licenseInfo {
                spdxId
              }
              isPrivate
              languages(first:5){
                nodes {
                  id
                  name
                }
              }
            }
          }
        }
      }
    `,
  };
};

export default Queries;

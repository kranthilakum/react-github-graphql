const userName = process.env.REACT_APP_USER_NAME;
const Queries = {
  query: `
        {
          viewer {
            login
            name
          }
          search(type: REPOSITORY, query: "user:${userName} sort:updated-desc", first: 10) {
            nodes {
              ...on Repository {
                id
                name
                url
                description
              }
            }
          }
        }
      `,
};

export default Queries;

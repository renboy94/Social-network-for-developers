export const api = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  count: 5,
  sort: "created: asc"
};

// export const getGithub = username => {
//   fetch(
//     `https://api.github.com/users/${username}/repos?per_page=${
//       api.count
//     }&sort=${api.sort}&client_id=${api.clientId}&client_secret=${
//       api.clientSecret
//     }`
//   )
//     .then(res => res.json())
//     .then(data => data)
//     .catch(err => console.log(err));
// };

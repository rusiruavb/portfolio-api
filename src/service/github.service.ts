import logger from '../log';
import axios from 'axios';
import GitHubModels from '../model/github.model';

export const updateGitHubUserProfile = async () => {
  try {
    const GITHUB_USER = await axios.get(`https://api.github.com/users/${process.env.GITHUB_USER_NAME}`)
    .then(async (data) => {
      let profile = {
        name: data.data.name,
        bio: data.data.bio,
        username: data.data.login,
        imageurl: data.data.avatar_url,
        profileurl: data.data.html_url,
        twitterusername: data.data.twitter_username,
        publicrepos: data.data.public_repos,
        followers: data.data.followers,
        following: data.data.following
      };
      await GitHubModels.GitHubProfile.create(profile);
      return profile;
    })
    .catch(error => {
      throw new Error(error.message);
    });
    logger.info('GitHub user data updated');
    return GITHUB_USER;
  } catch (error) {
    logger.error(error.message);
    return error.message;
  }
}

export const updateGitHubUserRepositories = async () => {
  try {
    await GitHubModels.GitHubRepositories.remove(); // This will drop the repositories collection before fetching the new values
    const GITHUB_REPOSITORIES = await axios.get(`https://api.github.com/users/${process.env.GITHUB_USER_NAME}/repos`)
    .then(async (repos) => {
      let repositories: any[] = [];
      if (repos.data.length > 0) {
        repos.data.map(async (repo: any) => {
          let repository = {
            name: repo.name,
            fullname: repo.full_name,
            private: repo.private,
            url: repo.html_url,
            description: repo.description,
            owner: repo.owner.login,
            imageurl: repo.owner.avatar_url,
            defaultbranch: repo.default_branch,
            issues: repo.open_issues
          };
          repositories.push(repository);
          await GitHubModels.GitHubRepositories.create(repository);
        });
      }
      return repositories;
    })
    .catch(error => {
      throw new Error(error.message);
    });

    logger.info('GitHub repositories fetched');
    return GITHUB_REPOSITORIES;
  } catch (error) {
    logger.error(error.message);
    return error.message;
  }
}

export const getGitHubUserProfile = async () => {
  try {
    const GITHUB_PROFILE = await GitHubModels.GitHubProfile.find({}).limit(1).then(profile => { return profile });
    
    if (!GITHUB_PROFILE) {
      throw new Error('No GitHub Profile in the account')
    }

    return GITHUB_PROFILE;
  } catch (error) {
    logger.error(error.message);
    return error.message;
  }
}

export const getGitHubUserRepositories = async () => {
  try {
    const GITHUB_REPOSITORIES = await GitHubModels.GitHubRepositories.find({}).then(repositories => { return repositories });

    if (GITHUB_REPOSITORIES.length === 0) {
      throw new Error('No Repositories to fetch');
    } 

    return GITHUB_REPOSITORIES;
  } catch (error) {
    logger.error(error.message);
    return error.message;
  }
}
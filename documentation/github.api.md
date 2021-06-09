### GitHub API 
I have used GitHub developer API to get my collaboration information from the API.

#### GitHub API endpoints to get information
**GET** <https://api.github.com/users/{your_github_username}> \
Using this API call you can get user profile data from the GitHub API. Replace `{your_github_username}` with your username.

#### Get your Repository infromation
**GET** <https://api.github.com/users/{your_github_username}/repos> \
Using this API call you can get user repository data from the GitHub API. Replace `{your_github_username}` with your username.

### Implementation Details
Fetching data from the GitHub API is entirely free. With some constraints. The GitHub API allow us to only send 60 request per hour. If the request count is exeed the limit within a hour, the application had to wait until that hour period is over. Because of that I have do some changes to avoid that issue. 
<br><br>
The useage of the GitHub API is little bit different in this application. This is how it works.
<br>
#### Get GitHub user profile & repositories
When the owner of the application sends a request **first time** to GitHub API to get the user profile information, it will fetch profile information and stores inside the database. So, when public user request those GitHub profile information, it will fetch from the database instead of sending requests to GitHub API. This will reduce number of calls sends to GitHub API. The same implementation is apply to get user repository information.
#### Implemented file locations 
**MongoDB model** - `src/model/github.model.ts` \
**Service methods** - `src/service/github.service.ts` \
**Controller methods** - `src/controller/github.controller.ts`
import mongoose, { Document, Schema, HookNextFunction } from 'mongoose';

export interface GitHubUserProfileDocument extends Document {
  name: string,
  bio: string,
  username: string,
  imageurl: string,
  profileurl: string,
  twitterusername: string,
  publicrepos: string,
  followers: number,
  following: number
}

export interface GitHubUserRepositoriesDocument extends Document {
  name: string,
  fullname: string,
  private: boolean,
  url: string,
  description: string,
  owner: string,
  imageurl: string,
  defaultbranch: string,
  issues: string
}

const GitHubProfileSchema = new Schema({
  name: { type: String, required: true, trim: true },
  bio: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true },
  imageurl: { type: String, required: true, trim: true },
  profileurl: { type: String, required: true, trim: true },
  twitterusername: { type: String, required: true, trim: true },
  publicrepos: { type: String, required: true, trim: true },
  followers: { type: Number, required: true, trim: true },
  following: { type: Number, required: true, trim: true }
}, {
  timestamps: true
});

const GitHubRespositorySchema = new Schema({
  name: { type: String, required: true, trim: true },
  fullname: { type: String, required: true, trim: true },
  private: { type: Boolean, required: true, trim: true },
  url: { type: String, required: true, trim: true },
  description: { type: String, required: false, trim: true },
  owner: { type: String, required: true, trim: true },
  imageurl: { type: String, required: true, trim: true },
  defaultbranch: { type: String, required: true, trim: true },
  issues: { type: String, required: true, trim: true }
}, {
  timestamps: true
});

const GitHubProfile = mongoose.model<GitHubUserProfileDocument>('githubprofiles', GitHubProfileSchema);
const GitHubRepositories = mongoose.model<GitHubUserRepositoriesDocument>('githubrepositories', GitHubRespositorySchema);

export default { GitHubProfile, GitHubRepositories };
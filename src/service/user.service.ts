import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from '../model/user.model';
import logger from '../log';
import bcrypt from 'bcrypt';
import Parser from 'rss-parser';

export const checkUserByUsernameAndPassword = async (username: string, passowrd: string) => {
  const user = await User.findOne({ username });

  if (!user) {
    logger.error('There is no user in the database');
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(passowrd, user.password);

  if (!isMatch) {
    logger.error('Password is not matched');
    throw new Error('Password is not matched');
  }

  return user;
}

export const insertUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    const user = await User.create(input);
    const token = await user.generateAuthToken();
    logger.info('User created successfully');
    return user
  } catch (error) {
    logger.error(error.message);
    throw new Error(error);
  }
}

export const updateUserbyId = async (userId: string, userDetails: DocumentDefinition<UserDocument>) => {
  try {
    return await User.findByIdAndUpdate(userId, userDetails);
  } catch (error) {
    logger.error(error.message);
    throw new Error(error);
  }
}

export const getUserById = async (input: string) => {
  try {
    const user = await User.findById(input);

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error);
  }
}

export const getUserDetails = async () => {
  try {
    // need to populate user details with other collections
    return await User.find({}).limit(1);
  } catch (error) {
    logger.error(error.message);
    throw new Error(error);
  }
}

interface BlogPost {
  id: string
  title: string
  description: string
  link: string
  categories: string[]
  published: number
  author: string
}

interface BlogPage {
  link: string
  image: {
    link: string
    url: string
    title: string
  }
  title: string
  description: string
  webMaster: string
}

export const getUserMediumPosts = async (userName: string)
: Promise<{
  blogPage: BlogPage,
  items: BlogPost[]
}> => {
  if (!userName || typeof userName !== 'string') {
    throw new Error('User name is required');
  }
  
  /**
   * Currently there is no way to retrieve Medium posts via api because
   * their api is write-only. Instead, we can get rss feed from special
   * address. So, to turn rss-response in a human-readable format we need a parser.
   */
  
  const parser: Parser<BlogPage, BlogPost> = new Parser({
    customFields: {
      // rss fields that Medium sends
      feed: ['link', 'webMaster'],
      item: ['link', 'published']
    }
  });
  const medium_url = 'https://medium.com/feed/@username';
  let request: any;
  let items: BlogPost[] = [];
  let blogPage: BlogPage;
  try {
    request = await parser.parseURL(medium_url.replace('username', userName));
    if (request && request.items && Array.isArray(request.items)) {
      const ad_text = 'Continue reading on Momentum »';
      for (let item of request.items) {
        items.push({
          title: item.title,
          author: item.creator,
          link: item.link,
          categories: item.categories,
          // for removing 'Continue reading on Momentum' text
          description: item.contentSnippet.replace(ad_text, '').trim(),
          id: item.guid,
          published: item.pubDate
        });
      }
    }
  }
  catch(error: any) {
    console.error(error.message || error);
  }
  blogPage = {
    link: request.link,
    image: {
      link: request.image.link,
      url: request.image.url,
      title: request.image.title
    },
    title: request.title,
    description: request.description,
    webMaster: request.webMaster
  };
  return {
    blogPage,
    items
  };
}
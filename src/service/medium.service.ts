import Parser from 'rss-parser';
import logger from '../log/index';

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

export const getUserMediumPosts = async (): Promise<{blogPage: BlogPage, items: BlogPost[]}> => {
  const parser: Parser<BlogPage, BlogPost> = new Parser({
    customFields: {
      feed: ['link', 'webMaster'],
      item: ['link', 'published']
    }
  });

  const MEDIUM_URL = `https://medium.com/feed/@${process.env.MEDIUM_USER_NAME}`;
  let request: any;
  let items: BlogPost[] = [];
  let blogPage: BlogPage;

  try {
    request = await parser.parseURL(MEDIUM_URL);
    if (request && request.items) {
      for (let item of request.items) {
        let blog = {
          title: item.title,
          author: item.creator,
          link: item.link,
          categories: item.categories,
          description: item['content:encoded'].replace(/\"/g, `'`),
          id: item.guid,
          published: item.pubDate
        }
        items.push(blog);
      }
    }
  }
  catch(error: any) {
    logger.error(error.message);
    throw new Error(error.message);
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

  return { blogPage, items };
}
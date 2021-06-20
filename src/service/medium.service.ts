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
  imageurl: string
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
      const REGEX = /<figure>(.*?)<\/figure>/;
      const IMG_SRC_REGEX = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/;

      for (let item of request.items) {
        let matchArray = REGEX.exec(item['content:encoded'].replace(/\"/g, `'`))
        let imageUrl: string = '';
        if (matchArray !== null) {
          imageUrl = matchArray[1];
        }
        
        let blog = {
          title: item.title,
          author: item.creator,
          link: item.link,
          categories: item.categories,
          description: item['content:encoded'].replace(/\"/g, `'`),
          id: item.guid,
          published: item.pubDate,
          imageurl: imageUrl.match(IMG_SRC_REGEX)![1]
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
    webMaster: request.webMaster,
    imageurl: request.imageurl
  };

  return { blogPage, items };
}
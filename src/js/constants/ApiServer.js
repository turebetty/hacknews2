export const newStoriesUri = 'https://hacker-news.firebaseio.com/v0/newstories.json';
export const topStoriesUri = 'https://hacker-news.firebaseio.com/v0/topstories.json';
export const bestStoriesUri = 'https://hacker-news.firebaseio.com/v0/beststories.json';
export function itemUri(id){
  if(id){
    return `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  }else{
    return '';
  }
}
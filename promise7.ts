// Implement a class called APIService with methods as depicted below:
// fetches the post for a given id using the following endpoint (example id // 1)  https://jsonplaceholder.typicode.com/posts/1
// it must return a post object on success, if there is an error it should
//  throw an exception
// async fetchPost(id: number): Promise<Post> {}
// fetches the comments of a given post,
// use this API: https://jsonplaceholder.typicode.com/posts/1/comments
// this end point will fetch you 'count' number of comments of post id 1, you can replace this id to a different one to fetch comments of another post.
// async fetchComments(id: number, count:number): Promise<Comments[]>{}

// Test this APIService class using vitest.

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
export class APIService {
  async fetchPost(id: number): Promise<Post> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  }
  async fetchComments(id: number, count: number): Promise<Comment[]> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const comments: Comment[] = await response.json();
    return comments.slice(0, count);
  }
}

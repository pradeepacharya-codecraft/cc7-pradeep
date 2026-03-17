import { describe, it, expect, vi, afterEach } from 'vitest';
import type { Post, Comment } from '../promise7.ts';
import { APIService } from '../promise7.ts';

describe('APIService', () => {
  const api = new APIService();
  let fetchSpy: ReturnType<typeof vi.spyOn> | undefined;

  afterEach(() => {
    // Restore the original fetch after each test
    fetchSpy?.mockRestore();
  });

  it('fetchPost returns a post', async () => {
    const mockPost: Post = {
      userId: 1,
      id: 1,
      title: 'Test Post',
      body: 'Test body'
    };

    fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(
      {
        ok: true,
        json: async () => mockPost
      } as Response // Type assertion to Response
    );

    const result = await api.fetchPost(1);
    expect(result).toEqual(mockPost);
  });

  it('fetchComments returns limited comments', async () => {
    const mockComments: Comment[] = [
      { postId: 1, id: 1, name: 'A', email: 'a@test.com', body: 'comment1' },
      { postId: 1, id: 2, name: 'B', email: 'b@test.com', body: 'comment2' },
      { postId: 1, id: 3, name: 'C', email: 'c@test.com', body: 'comment3' }
    ];

    fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockComments
    } as Response);

    const result = await api.fetchComments(1, 2);
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('A');
  });

  it('fetchPost throws error if request fails', async () => {
    fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({})
    } as Response);

    await expect(api.fetchPost(1)).rejects.toThrow('Failed to fetch post');
  });
});

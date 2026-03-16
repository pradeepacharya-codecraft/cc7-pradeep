import { describe, it, expect, vi } from "vitest";
import { APIService } from "../promise7.ts";

describe("APIService", () => {
  const api = new APIService();

  it("fetchPost returns a post", async () => {
    const mockPost = {
      userId: 1,
      id: 1,
      title: "Test Post",
      body: "Test body",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPost),
      }),
    ) as any;

    const result = await api.fetchPost(1);

    expect(result).toEqual(mockPost);
  });

  it("fetchComments returns limited comments", async () => {
    const mockComments = [
      { postId: 1, id: 1, name: "A", email: "a@test.com", body: "comment1" },
      { postId: 1, id: 2, name: "B", email: "b@test.com", body: "comment2" },
      { postId: 1, id: 3, name: "C", email: "c@test.com", body: "comment3" },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockComments),
      }),
    ) as any;

    const result = await api.fetchComments(1, 2);

    expect(result.length).toBe(2);
  });

  it("fetchPost throws error if request fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      }),
    ) as any;

    const promise = api.fetchPost(1);

    await expect(promise).rejects.toThrow();
  });
});

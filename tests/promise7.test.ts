import { describe, it, expect } from "vitest";
import { APIService } from "../promise7.ts";

describe("APIService", () => {
  it("should fetch a post by id", async () => {
    const api = new APIService();

    const post = await api.fetchPost(1);

    expect(post).toHaveProperty("id");
    expect(post).toHaveProperty("title");
    expect(post.id).toBe(1);
  });

  it("should fetch limited number of comments", async () => {
    const api = new APIService();

    const comments = await api.fetchComments(1, 3);

    expect(comments.length).toBe(3);
    expect(comments[0]).toHaveProperty("email");
  });
});

import { APIService } from '../../promise7';
import type { Comment, Post } from '../../promise7';

/* ---------------- ELEMENTS ---------------- */
const postCountEl = document.getElementById('post-count')!;
const titleEl = document.getElementById('post-title')!;
const bodyEl = document.getElementById('post-body')!;

const commentsSection = document.getElementById('comments-section')!;
const commentsList = document.getElementById('comments-list')!;

const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;
const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
const commentBtn = document.getElementById('comment-btn') as HTMLButtonElement;
const refreshBtn = document.getElementById('refresh-btn') as HTMLButtonElement;

/* ---------------- SERVICES ---------------- */
const api = new APIService();

/* ---------------- CACHE ---------------- */
const cache = new Map<string, Post | Comment[]>();

/* ---------------- STATE ---------------- */
let currentPost = 1;
const totalPosts = 100;
let commentsVisible = false;

/* ---------------- LOAD POST ---------------- */
async function loadPost(id: number) {
  const key = `post-${id}`;
  setLoadingState(true, 'post');

  try {
    let post: Post;
    if (cache.has(key)) {
      post = cache.get(key) as Post;
    } else {
      post = await api.fetchPost(id);
      cache.set(key, post);
    }

    postCountEl.textContent = `Post ${id} of ${totalPosts}`;
    titleEl.textContent = post.title;
    bodyEl.textContent = post.body;

    // Reset comments
    commentsVisible = false;
    commentsSection.classList.add('hidden');
    commentsList.innerHTML = '';

    updateButtons();
  } catch (error) {
    console.error(error);
    titleEl.textContent = 'Error loading post';
    bodyEl.textContent = '';
  }

  setLoadingState(false, 'post');
}

/* ---------------- LOAD COMMENTS ---------------- */
async function loadComments(postId: number) {
  const key = `comments-${postId}`;
  setLoadingState(true, 'comments');

  try {
    let comments: Comment[];
    if (cache.has(key)) {
      comments = cache.get(key) as Comment[];
    } else {
      comments = await api.fetchComments(postId, 5);
      cache.set(key, comments);
    }

    renderComments(comments);
  } catch (error) {
    console.error(error);
    commentsList.innerHTML = '<p>Error loading comments</p>';
  }

  setLoadingState(false, 'comments');
}
async function refreshPost() {
  // 👉 Reset to first post
  currentPost = 1;

  const postKey = `post-${currentPost}`;

  setLoadingState(true, 'post');

  try {
    const post = await api.fetchPost(currentPost);

    // Optional: clear entire cache (better for full reset)
    cache.clear();

    cache.set(postKey, post);

    postCountEl.textContent = `Post ${currentPost} of ${totalPosts}`;
    titleEl.textContent = post.title;
    bodyEl.textContent = post.body;

    // Reset comments
    commentsVisible = false;
    commentsSection.classList.add('hidden');
    commentsList.innerHTML = '';
  } catch (error) {
    console.error(error);
    titleEl.textContent = 'Error refreshing post';
    bodyEl.textContent = '';
  }

  setLoadingState(false, 'post');
}

/* ---------------- RENDER COMMENTS ---------------- */
function renderComments(comments: Comment[]) {
  commentsVisible = true;
  commentsSection.classList.remove('hidden');

  if (comments.length === 0) {
    commentsList.innerHTML = '<p>No comments available</p>';
    return;
  }

  commentsList.innerHTML = comments
    .map(
      (c) => `
    <div class="comment">
      <div class="comment-email">${c.email}</div>
      <div class="comment-body">${c.body}</div>
    </div>`
    )
    .join('');
}

/* ---------------- BUTTON STATES ---------------- */
function updateButtons() {
  prevBtn.toggleAttribute('disabled', currentPost === 1);
  nextBtn.toggleAttribute('disabled', currentPost === totalPosts);
}

/* ---------------- LOADING STATE ---------------- */
function setLoadingState(isLoading: boolean, target: 'post' | 'comments') {
  prevBtn.disabled = isLoading && target === 'post';
  nextBtn.disabled = isLoading && target === 'post';
  commentBtn.disabled = isLoading;
  refreshBtn.disabled = isLoading && target === 'post';

  if (isLoading && target === 'post') {
    titleEl.textContent = 'Loading...';
    bodyEl.textContent = '';
  }
}

/* ---------------- BUTTONS ---------------- */
prevBtn.onclick = () => {
  if (currentPost > 1) {
    currentPost--;
    loadPost(currentPost);
  }
};

nextBtn.onclick = () => {
  if (currentPost < totalPosts) {
    currentPost++;
    loadPost(currentPost);
  }
};

commentBtn.onclick = () => {
  if (commentsVisible) {
    commentsVisible = false;
    commentsSection.classList.add('hidden');
  } else {
    loadComments(currentPost);
  }
};

refreshBtn.onclick = () => {
  refreshPost();
};

/* ---------------- INIT ---------------- */
loadPost(currentPost);
updateButtons();

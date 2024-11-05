export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const response = await fetch('/api/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export async function getPost(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.id === id) || null;
}
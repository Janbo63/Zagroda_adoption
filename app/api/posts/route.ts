import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const files = await fs.readdir(postsDirectory);
    
    const posts = await Promise.all(
      files.map(async (fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          id: fileName.replace(/\.md$/, ''),
          title: data.title,
          date: data.date,
          content: content,
        };
      })
    );
    
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
} 
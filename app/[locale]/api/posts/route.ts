import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), '_posts')

interface PostData {
  id: string
  date: string
  title: string
  excerpt: string
}

export async function GET() {
  console.log('API route handler called')
  try {
    console.log('Checking if _posts directory exists')
    if (!fs.existsSync(postsDirectory)) {
      console.error('_posts directory does not exist')
      return NextResponse.json({ message: '_posts directory does not exist', posts: [] }, { status: 200 })
    }

    console.log('Reading files from _posts directory')
    const fileNames = fs.readdirSync(postsDirectory)
    
    if (fileNames.length === 0) {
      console.log('No files found in _posts directory')
      return NextResponse.json({ message: 'No blog posts available', posts: [] }, { status: 200 })
    }

    console.log('Processing files')
    const allPostsData: PostData[] = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        
        try {
          const matterResult = matter(fileContents)
          return {
            id,
            date: matterResult.data.date as string,
            title: matterResult.data.title as string,
            excerpt: matterResult.data.excerpt as string
          }
        } catch (error) {
          console.error(`Error parsing file ${fileName}:`, error)
          return null
        }
      })
      .filter((post): post is PostData => post !== null)

    const sortedPosts = allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })

    console.log('Sending response')
    return NextResponse.json({ posts: sortedPosts }, { status: 200 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
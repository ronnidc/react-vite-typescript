export interface Course {
  id: number
  title: string
  description: string
  goal: number        // SDG-nummer 1-17
  durationMinutes: number
  published: boolean
}

export interface Resource {
  id: number
  title: string
  body: string
}

export interface User {
  id: number
  name: string
  email: string
  role: 'instructor' | 'admin'
}

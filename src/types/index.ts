// Course types
export interface Course {
  id: string
  title: string
  description: string
}

export interface CreateCourseRequest {
  title: string
  description: string
}

export interface GetCoursesQuery {
  search?: string
  orderBy?: 'title' | 'id'
}

export interface GetCoursesResponse {
  courses: Array<{
    id: string
    title: string
  }>
}

// User types
export interface User {
  id: string
  name: string
  email: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

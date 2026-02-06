export interface ICreateCourse {
  title: String,
  description: String,
  learning: String,
  requirements: String,
  level: String,
  category: String,
  language: String,
  oldPrice: Number,
  currentPrice: Number,
  previewImage: String,
}

export interface ICreateUser {
  clerkId: String,
  email: String,
  fullName: String,
  picture: String,
}

export interface IUpdateUser {
  clerkId: String,
  updatedData: {
    email: String,
    fullName?: String,
    picture?: String,
  }
}

export interface IUpdateSection {
  lists: {
    _id: string,
    position: number,
  }[],
  path: string,
}

export interface ILessonFields {
  title: string
  content: string
  videoUrl: string
  hours: string
  minutes: string
  seconds: string
  free: boolean
}

export interface ICreateLesson {
  lesson: ILessonFields
  section: string
  path: string
}

export interface IUpdatePosition {
	lists: { _id: string; position: number }[]
	path: string
}
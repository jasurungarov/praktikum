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
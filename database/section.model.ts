import { Schema, model, models } from 'mongoose';

const SectionSchema = new Schema(
  {
  title: String,
  position: Number,
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  lessons: {
  type: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  default: [],
}
},
  {timestamps: true}
)

const Section = models.Section || model ('Section', SectionSchema)
export default Section
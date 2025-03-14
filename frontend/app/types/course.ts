export interface Course {
  id: string;
  name: string;
  description: string;
  badge: string;
  price: number;
  startDate: Date;
  durationInDays: number;
  instructor: string;
  level: Level;
  maxMembers: number;
  signedMembers: number;
  syllabusElements: string[];
  imageURL: string;
  isRemote: boolean;
}

export type CreateCourseDto = Omit<Course, "id">;

export enum Level {
  Beginner,
  Intermediate,
  Advanced,
  Expert,
}

export enum Format {
  Remote,
  InPerson,
  Both,
}

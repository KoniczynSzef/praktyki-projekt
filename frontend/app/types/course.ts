export interface Course {
  id: number;
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

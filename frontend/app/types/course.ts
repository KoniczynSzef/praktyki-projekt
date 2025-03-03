
export interface Course {
  Id: number;
  Name: string;
  Description: string;
  Badge: string;
  Price: number;
  StartDate: Date;
  DurationInDays: number;
  Instructor: string;
  Level: Level;
  MaxMembers: number;
  SignedMembers: number;
  SyllabusElements: string[];
  ImageURL: string;
  IsRemote: boolean;
}

export enum Level {
  Beginner,
  Intermediate,
  Advanced,
  Expert
}

export enum Format {
  Remote,
  InPerson,
  Both
}

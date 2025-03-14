import { Level } from "@/app/types/course";

export function formatLevelEnum(level: Level) {
  if (level === Level.Beginner) {
    return "Beginner";
  }

  if (level === Level.Intermediate) {
    return "Intermediate";
  }

  if (level === Level.Advanced) {
    return "Advanced";
  }

  return "Expert";
}

export function formatStringToLevelEnum(level: string) {
  if (level === "Beginner") {
    return Level.Beginner;
  }

  if (level === "Intermediate") {
    return Level.Intermediate;
  }

  if (level === "Advanced") {
    return Level.Advanced;
  }

  return Level.Expert;
}

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

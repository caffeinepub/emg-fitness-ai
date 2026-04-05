export interface Exercise {
  name: string;
  muscleGroups: Array<
    | "Chest"
    | "Back"
    | "Shoulders"
    | "Biceps"
    | "Triceps"
    | "Core"
    | "Quads"
    | "Hamstrings"
    | "Glutes"
  >;
  primaryMuscle:
    | "Chest"
    | "Back"
    | "Shoulders"
    | "Biceps"
    | "Triceps"
    | "Core"
    | "Quads"
    | "Hamstrings"
    | "Glutes";
  sets: number;
  reps: string; // e.g. "8-12" or "30 sec"
  metValue: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  equipment: string;
  description: string;
  goals: Array<"Build Muscle" | "Lose Weight" | "Maintain">;
  intensity: Array<"Low" | "Moderate" | "High">;
}

export const exerciseDatabase: Exercise[] = [
  // ─── CHEST ───────────────────────────────────────────────────────────────
  {
    name: "Push-Up",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    primaryMuscle: "Chest",
    sets: 3,
    reps: "10-15",
    metValue: 3.8,
    difficulty: "Beginner",
    equipment: "Bodyweight",
    description:
      "Classic upper-body push. Keep core tight and lower chest to near floor.",
    goals: ["Build Muscle", "Lose Weight", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Barbell Bench Press",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    primaryMuscle: "Chest",
    sets: 4,
    reps: "6-10",
    metValue: 5.0,
    difficulty: "Intermediate",
    equipment: "Barbell, Bench",
    description:
      "Compound chest press. Drive feet into floor and arch back slightly.",
    goals: ["Build Muscle"],
    intensity: ["Moderate", "High"],
  },
  {
    name: "Dumbbell Chest Fly",
    muscleGroups: ["Chest", "Shoulders"],
    primaryMuscle: "Chest",
    sets: 3,
    reps: "12-15",
    metValue: 4.0,
    difficulty: "Beginner",
    equipment: "Dumbbells, Bench",
    description:
      "Isolation fly to stretch and contract chest fibers. Control the arc.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Incline Dumbbell Press",
    muscleGroups: ["Chest", "Shoulders", "Triceps"],
    primaryMuscle: "Chest",
    sets: 4,
    reps: "8-12",
    metValue: 5.0,
    difficulty: "Intermediate",
    equipment: "Dumbbells, Incline Bench",
    description: "Targets upper chest. Set bench to 30-45 degrees.",
    goals: ["Build Muscle"],
    intensity: ["Moderate", "High"],
  },
  {
    name: "Cable Crossover",
    muscleGroups: ["Chest"],
    primaryMuscle: "Chest",
    sets: 3,
    reps: "12-15",
    metValue: 4.5,
    difficulty: "Intermediate",
    equipment: "Cable Machine",
    description:
      "Full-range chest isolation. Squeeze hard at center crossover point.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Moderate"],
  },
  {
    name: "Decline Push-Up",
    muscleGroups: ["Chest", "Triceps"],
    primaryMuscle: "Chest",
    sets: 3,
    reps: "10-15",
    metValue: 4.0,
    difficulty: "Beginner",
    equipment: "Bench or elevated surface",
    description: "Feet elevated to hit upper chest. Keep hips level.",
    goals: ["Build Muscle", "Lose Weight", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  // ─── BACK ─────────────────────────────────────────────────────────────────
  {
    name: "Pull-Up",
    muscleGroups: ["Back", "Biceps"],
    primaryMuscle: "Back",
    sets: 3,
    reps: "5-10",
    metValue: 8.0,
    difficulty: "Intermediate",
    equipment: "Pull-up Bar",
    description: "Full bodyweight pull. Drive elbows down and back at top.",
    goals: ["Build Muscle", "Lose Weight"],
    intensity: ["High"],
  },
  {
    name: "Barbell Deadlift",
    muscleGroups: ["Back", "Glutes", "Hamstrings"],
    primaryMuscle: "Back",
    sets: 4,
    reps: "5-8",
    metValue: 6.0,
    difficulty: "Intermediate",
    equipment: "Barbell",
    description:
      "King of all lifts. Neutral spine, bar close to body throughout.",
    goals: ["Build Muscle"],
    intensity: ["High"],
  },
  {
    name: "Seated Cable Row",
    muscleGroups: ["Back", "Biceps"],
    primaryMuscle: "Back",
    sets: 3,
    reps: "10-12",
    metValue: 4.5,
    difficulty: "Beginner",
    equipment: "Cable Machine",
    description: "Pull handle to mid-abdomen. Squeeze shoulder blades at end.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Moderate"],
  },
  {
    name: "Lat Pulldown",
    muscleGroups: ["Back", "Biceps"],
    primaryMuscle: "Back",
    sets: 4,
    reps: "8-12",
    metValue: 4.5,
    difficulty: "Beginner",
    equipment: "Cable Machine",
    description:
      "Widen lats by pulling bar to upper chest. Lean back 10 degrees.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Moderate"],
  },
  {
    name: "Bent-Over Barbell Row",
    muscleGroups: ["Back", "Biceps", "Core"],
    primaryMuscle: "Back",
    sets: 4,
    reps: "8-10",
    metValue: 5.5,
    difficulty: "Intermediate",
    equipment: "Barbell",
    description:
      "Hinge at hips, pull bar to lower chest. Don't round lower back.",
    goals: ["Build Muscle"],
    intensity: ["Moderate", "High"],
  },
  {
    name: "Single-Arm Dumbbell Row",
    muscleGroups: ["Back", "Biceps"],
    primaryMuscle: "Back",
    sets: 3,
    reps: "10-12",
    metValue: 4.0,
    difficulty: "Beginner",
    equipment: "Dumbbell, Bench",
    description:
      "Brace on bench and pull dumbbell to hip. Elbow stays close to body.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  // ─── SHOULDERS ────────────────────────────────────────────────────────────
  {
    name: "Overhead Press",
    muscleGroups: ["Shoulders", "Triceps", "Core"],
    primaryMuscle: "Shoulders",
    sets: 4,
    reps: "6-10",
    metValue: 5.0,
    difficulty: "Intermediate",
    equipment: "Barbell or Dumbbells",
    description:
      "Press overhead from shoulder height. Brace core to protect spine.",
    goals: ["Build Muscle"],
    intensity: ["Moderate", "High"],
  },
  {
    name: "Dumbbell Lateral Raise",
    muscleGroups: ["Shoulders"],
    primaryMuscle: "Shoulders",
    sets: 3,
    reps: "12-15",
    metValue: 3.5,
    difficulty: "Beginner",
    equipment: "Dumbbells",
    description:
      "Raise dumbbells to shoulder height. Slight elbow bend, no swinging.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Arnold Press",
    muscleGroups: ["Shoulders", "Triceps"],
    primaryMuscle: "Shoulders",
    sets: 3,
    reps: "10-12",
    metValue: 4.5,
    difficulty: "Intermediate",
    equipment: "Dumbbells",
    description:
      "Rotate palms outward as you press. Hits all three deltoid heads.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Moderate"],
  },
  {
    name: "Face Pull",
    muscleGroups: ["Shoulders", "Back"],
    primaryMuscle: "Shoulders",
    sets: 3,
    reps: "15-20",
    metValue: 3.5,
    difficulty: "Beginner",
    equipment: "Cable Machine, Rope",
    description:
      "Pull rope to face with elbows high. Great for rear delts and posture.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low"],
  },
  {
    name: "Front Raise",
    muscleGroups: ["Shoulders"],
    primaryMuscle: "Shoulders",
    sets: 3,
    reps: "12-15",
    metValue: 3.5,
    difficulty: "Beginner",
    equipment: "Dumbbells or Plate",
    description:
      "Lift weight in front to shoulder height. Control the descent.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  // ─── BICEPS ───────────────────────────────────────────────────────────────
  {
    name: "Barbell Curl",
    muscleGroups: ["Biceps"],
    primaryMuscle: "Biceps",
    sets: 3,
    reps: "10-12",
    metValue: 3.8,
    difficulty: "Beginner",
    equipment: "Barbell",
    description: "Curl bar from hips to chin. Keep elbows pinned at sides.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Dumbbell Hammer Curl",
    muscleGroups: ["Biceps"],
    primaryMuscle: "Biceps",
    sets: 3,
    reps: "10-12",
    metValue: 3.5,
    difficulty: "Beginner",
    equipment: "Dumbbells",
    description:
      "Neutral grip targets brachialis. Strong for forearm thickness too.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Incline Dumbbell Curl",
    muscleGroups: ["Biceps"],
    primaryMuscle: "Biceps",
    sets: 3,
    reps: "10-12",
    metValue: 3.5,
    difficulty: "Intermediate",
    equipment: "Dumbbells, Incline Bench",
    description:
      "Long-head bias. Arms hang behind torso — full stretch at bottom.",
    goals: ["Build Muscle"],
    intensity: ["Moderate"],
  },
  {
    name: "Concentration Curl",
    muscleGroups: ["Biceps"],
    primaryMuscle: "Biceps",
    sets: 3,
    reps: "12-15",
    metValue: 3.0,
    difficulty: "Beginner",
    equipment: "Dumbbell",
    description:
      "Seated, elbow braced on inner thigh. Peak contraction isolation.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low"],
  },
  // ─── TRICEPS ──────────────────────────────────────────────────────────────
  {
    name: "Tricep Dip",
    muscleGroups: ["Triceps", "Chest"],
    primaryMuscle: "Triceps",
    sets: 3,
    reps: "8-12",
    metValue: 5.0,
    difficulty: "Intermediate",
    equipment: "Parallel Bars or Bench",
    description:
      "Lower until arms are 90 degrees. Lean forward for more chest, upright for triceps.",
    goals: ["Build Muscle", "Lose Weight"],
    intensity: ["Moderate", "High"],
  },
  {
    name: "Skull Crusher",
    muscleGroups: ["Triceps"],
    primaryMuscle: "Triceps",
    sets: 3,
    reps: "10-12",
    metValue: 4.0,
    difficulty: "Intermediate",
    equipment: "EZ Bar or Barbell, Bench",
    description:
      "Lower bar to forehead from locked-out position. Only elbows flex.",
    goals: ["Build Muscle"],
    intensity: ["Moderate"],
  },
  {
    name: "Cable Tricep Pushdown",
    muscleGroups: ["Triceps"],
    primaryMuscle: "Triceps",
    sets: 3,
    reps: "12-15",
    metValue: 3.5,
    difficulty: "Beginner",
    equipment: "Cable Machine, Bar or Rope",
    description:
      "Push down from elbow-height to full extension. Don't let elbows flare.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Overhead Tricep Extension",
    muscleGroups: ["Triceps"],
    primaryMuscle: "Triceps",
    sets: 3,
    reps: "12-15",
    metValue: 3.5,
    difficulty: "Beginner",
    equipment: "Dumbbell or Cable",
    description:
      "Long head stretch. Lower weight behind head, keep elbows pointing up.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  // ─── CORE ─────────────────────────────────────────────────────────────────
  {
    name: "Plank",
    muscleGroups: ["Core"],
    primaryMuscle: "Core",
    sets: 3,
    reps: "30-60 sec",
    metValue: 4.0,
    difficulty: "Beginner",
    equipment: "Bodyweight",
    description:
      "Hold neutral spine position. Squeeze glutes and brace abs hard.",
    goals: ["Build Muscle", "Lose Weight", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Cable Crunch",
    muscleGroups: ["Core"],
    primaryMuscle: "Core",
    sets: 3,
    reps: "15-20",
    metValue: 4.0,
    difficulty: "Beginner",
    equipment: "Cable Machine, Rope",
    description:
      "Kneel and crunch elbow toward knee. Resist weight on way back up.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Hanging Leg Raise",
    muscleGroups: ["Core"],
    primaryMuscle: "Core",
    sets: 3,
    reps: "10-15",
    metValue: 4.5,
    difficulty: "Intermediate",
    equipment: "Pull-up Bar",
    description:
      "Hang and raise legs to 90 degrees. No swinging — slow and controlled.",
    goals: ["Build Muscle", "Lose Weight"],
    intensity: ["Moderate", "High"],
  },
  {
    name: "Russian Twist",
    muscleGroups: ["Core"],
    primaryMuscle: "Core",
    sets: 3,
    reps: "20 reps (10 each side)",
    metValue: 4.0,
    difficulty: "Beginner",
    equipment: "Bodyweight or Plate/Medicine Ball",
    description: "Oblique rotation. Elevate feet for extra challenge.",
    goals: ["Build Muscle", "Lose Weight", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Ab Wheel Rollout",
    muscleGroups: ["Core"],
    primaryMuscle: "Core",
    sets: 3,
    reps: "8-12",
    metValue: 4.5,
    difficulty: "Advanced",
    equipment: "Ab Wheel",
    description:
      "Roll forward from knees keeping core braced. Don't let hips drop.",
    goals: ["Build Muscle"],
    intensity: ["High"],
  },
  {
    name: "Bicycle Crunch",
    muscleGroups: ["Core"],
    primaryMuscle: "Core",
    sets: 3,
    reps: "20 reps (10 each side)",
    metValue: 3.8,
    difficulty: "Beginner",
    equipment: "Bodyweight",
    description:
      "Alternate elbow-to-knee while cycling legs. Keep lower back pressed down.",
    goals: ["Build Muscle", "Lose Weight", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  // ─── QUADS ────────────────────────────────────────────────────────────────
  {
    name: "Barbell Back Squat",
    muscleGroups: ["Quads", "Glutes", "Hamstrings", "Core"],
    primaryMuscle: "Quads",
    sets: 4,
    reps: "6-10",
    metValue: 6.0,
    difficulty: "Intermediate",
    equipment: "Barbell, Squat Rack",
    description:
      "King of leg exercises. Break parallel, knees track over toes.",
    goals: ["Build Muscle"],
    intensity: ["High"],
  },
  {
    name: "Leg Press",
    muscleGroups: ["Quads", "Glutes"],
    primaryMuscle: "Quads",
    sets: 4,
    reps: "10-15",
    metValue: 5.0,
    difficulty: "Beginner",
    equipment: "Leg Press Machine",
    description:
      "Safe quad builder. Don't lock knees out at top. Foot position adjusts target.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Moderate", "High"],
  },
  {
    name: "Leg Extension",
    muscleGroups: ["Quads"],
    primaryMuscle: "Quads",
    sets: 3,
    reps: "12-15",
    metValue: 4.0,
    difficulty: "Beginner",
    equipment: "Leg Extension Machine",
    description: "Isolation for quads. Squeeze at top, slow on the way down.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Bulgarian Split Squat",
    muscleGroups: ["Quads", "Glutes"],
    primaryMuscle: "Quads",
    sets: 3,
    reps: "8-12 per leg",
    metValue: 5.0,
    difficulty: "Intermediate",
    equipment: "Dumbbells, Bench",
    description:
      "Rear foot elevated split squat. Powerful single-leg quad driver.",
    goals: ["Build Muscle", "Lose Weight"],
    intensity: ["Moderate", "High"],
  },
  {
    name: "Goblet Squat",
    muscleGroups: ["Quads", "Glutes", "Core"],
    primaryMuscle: "Quads",
    sets: 3,
    reps: "12-15",
    metValue: 4.5,
    difficulty: "Beginner",
    equipment: "Dumbbell or Kettlebell",
    description:
      "Hold weight at chest, squat deep. Great for beginners learning squat pattern.",
    goals: ["Build Muscle", "Lose Weight", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Jump Squat",
    muscleGroups: ["Quads", "Glutes"],
    primaryMuscle: "Quads",
    sets: 3,
    reps: "10-15",
    metValue: 7.0,
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    description: "Explosive squat jump. Land softly with knees slightly bent.",
    goals: ["Lose Weight", "Maintain"],
    intensity: ["High"],
  },
  // ─── HAMSTRINGS ───────────────────────────────────────────────────────────
  {
    name: "Romanian Deadlift",
    muscleGroups: ["Hamstrings", "Glutes", "Back"],
    primaryMuscle: "Hamstrings",
    sets: 4,
    reps: "8-12",
    metValue: 5.5,
    difficulty: "Intermediate",
    equipment: "Barbell or Dumbbells",
    description:
      "Hip hinge with slight knee bend. Feel hamstring stretch at bottom.",
    goals: ["Build Muscle"],
    intensity: ["Moderate", "High"],
  },
  {
    name: "Lying Leg Curl",
    muscleGroups: ["Hamstrings"],
    primaryMuscle: "Hamstrings",
    sets: 3,
    reps: "12-15",
    metValue: 4.0,
    difficulty: "Beginner",
    equipment: "Leg Curl Machine",
    description:
      "Isolation curl for hamstrings. Point toes slightly outward for better contraction.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Nordic Hamstring Curl",
    muscleGroups: ["Hamstrings"],
    primaryMuscle: "Hamstrings",
    sets: 3,
    reps: "5-8",
    metValue: 5.0,
    difficulty: "Advanced",
    equipment: "Partner or anchored feet",
    description:
      "Eccentric-focused. Lower body slowly to floor. Hardest hamstring exercise.",
    goals: ["Build Muscle"],
    intensity: ["High"],
  },
  {
    name: "Good Morning",
    muscleGroups: ["Hamstrings", "Back"],
    primaryMuscle: "Hamstrings",
    sets: 3,
    reps: "10-12",
    metValue: 4.5,
    difficulty: "Intermediate",
    equipment: "Barbell",
    description:
      "Bar on back, hinge forward. Teaches hip hinge pattern. Keep back flat.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Moderate"],
  },
  {
    name: "Glute-Ham Raise",
    muscleGroups: ["Hamstrings", "Glutes"],
    primaryMuscle: "Hamstrings",
    sets: 3,
    reps: "8-12",
    metValue: 5.0,
    difficulty: "Advanced",
    equipment: "GHD Machine",
    description:
      "Powerful posterior chain builder. Combines knee flexion and hip extension.",
    goals: ["Build Muscle"],
    intensity: ["High"],
  },
  // ─── GLUTES ───────────────────────────────────────────────────────────────
  {
    name: "Hip Thrust",
    muscleGroups: ["Glutes", "Hamstrings"],
    primaryMuscle: "Glutes",
    sets: 4,
    reps: "10-15",
    metValue: 5.0,
    difficulty: "Beginner",
    equipment: "Barbell, Bench",
    description:
      "Best glute isolator. Drive hips up and squeeze hard at the top.",
    goals: ["Build Muscle", "Lose Weight"],
    intensity: ["Moderate", "High"],
  },
  {
    name: "Glute Bridge",
    muscleGroups: ["Glutes", "Hamstrings"],
    primaryMuscle: "Glutes",
    sets: 3,
    reps: "15-20",
    metValue: 3.5,
    difficulty: "Beginner",
    equipment: "Bodyweight or Barbell",
    description: "Lie on back, drive hips up. Easier version of hip thrust.",
    goals: ["Build Muscle", "Lose Weight", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Cable Kickback",
    muscleGroups: ["Glutes"],
    primaryMuscle: "Glutes",
    sets: 3,
    reps: "15 per leg",
    metValue: 3.5,
    difficulty: "Beginner",
    equipment: "Cable Machine, Ankle Strap",
    description:
      "Kick leg back and up, squeeze glute at peak. Don't use momentum.",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Sumo Squat",
    muscleGroups: ["Glutes", "Quads", "Hamstrings"],
    primaryMuscle: "Glutes",
    sets: 3,
    reps: "12-15",
    metValue: 4.5,
    difficulty: "Beginner",
    equipment: "Dumbbell or Barbell",
    description: "Wide stance, toes pointed out. Inner thigh and glute focus.",
    goals: ["Build Muscle", "Lose Weight", "Maintain"],
    intensity: ["Low", "Moderate"],
  },
  {
    name: "Lateral Band Walk",
    muscleGroups: ["Glutes"],
    primaryMuscle: "Glutes",
    sets: 3,
    reps: "15 steps each way",
    metValue: 3.0,
    difficulty: "Beginner",
    equipment: "Resistance Band",
    description:
      "Band around knees, walk sideways. Activates glute medius (hip stability).",
    goals: ["Build Muscle", "Maintain"],
    intensity: ["Low"],
  },
];

export function selectExercisesFromDataset(
  activatedMuscles: string[],
  intensity: "Low" | "Moderate" | "High",
  goal: string,
  maxExercises = 5,
): Exercise[] {
  const typedGoal = goal as "Build Muscle" | "Lose Weight" | "Maintain";

  if (activatedMuscles.length === 0) return [];

  // Score each exercise based on how relevant it is
  const scored = exerciseDatabase.map((ex) => {
    let score = 0;

    // Primary muscle match scores highest
    if (activatedMuscles.includes(ex.primaryMuscle)) score += 3;

    // Secondary muscle group match
    for (const mg of ex.muscleGroups) {
      if (activatedMuscles.includes(mg)) score += 1;
    }

    // Intensity match
    if (ex.intensity.includes(intensity)) score += 2;

    // Goal match
    if (ex.goals.includes(typedGoal)) score += 2;

    // Difficulty adjustment based on intensity
    if (intensity === "Low" && ex.difficulty === "Beginner") score += 1;
    if (intensity === "Moderate" && ex.difficulty === "Intermediate")
      score += 1;
    if (intensity === "High" && ex.difficulty === "Advanced") score += 1;

    return { exercise: ex, score };
  });

  // Sort by score descending, then add variety by picking from different primary muscles
  scored.sort((a, b) => b.score - a.score);

  const selected: Exercise[] = [];
  const usedPrimary = new Set<string>();

  // First pass: one exercise per primary muscle group
  for (const { exercise, score } of scored) {
    if (score <= 0) continue;
    if (!usedPrimary.has(exercise.primaryMuscle)) {
      selected.push(exercise);
      usedPrimary.add(exercise.primaryMuscle);
      if (selected.length >= maxExercises) break;
    }
  }

  // Second pass: fill remaining slots if needed
  if (selected.length < maxExercises) {
    for (const { exercise, score } of scored) {
      if (score <= 0) continue;
      if (!selected.includes(exercise)) {
        selected.push(exercise);
        if (selected.length >= maxExercises) break;
      }
    }
  }

  return selected;
}

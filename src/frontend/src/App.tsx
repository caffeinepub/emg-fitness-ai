import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Activity,
  Bot,
  CheckCircle2,
  Paintbrush,
  Trash2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { EMGRecord } from "./backend";
import { createActorWithConfig } from "./config";
import { selectExercisesFromDataset } from "./exerciseData";
import { selectMealsFromDataset } from "./nutritionData";

type ThemeId = "light" | "dark" | "blue" | "green";
type EmgMode = "slider" | "raw";
type SensingStatus = "idle" | "sensing" | "done";

const THEMES: {
  id: ThemeId;
  label: string;
  icon: string;
  htmlClass: string;
  dataPalette: string | null;
}[] = [
  {
    id: "light",
    label: "Light",
    icon: "☀️",
    htmlClass: "light",
    dataPalette: null,
  },
  { id: "dark", label: "Dark", icon: "🌙", htmlClass: "", dataPalette: null },
  { id: "blue", label: "Blue", icon: "💙", htmlClass: "", dataPalette: null },
  {
    id: "green",
    label: "Green",
    icon: "🟢",
    htmlClass: "",
    dataPalette: "green",
  },
];

interface UserProfile {
  name: string;
  age: number;
  weight: number;
  gender: "Male" | "Female" | "Other";
  goal: "Build Muscle" | "Lose Weight" | "Maintain Fitness";
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const BEGINNER_TIPS: Record<string, string> = {
  Low: "Great start! Focus on perfecting your form at low intensity before increasing resistance. Rest 60–90 seconds between sets.",
  Moderate:
    "You're in the ideal training zone for beginners! Aim for 2–3 sessions per week and make sure to stay hydrated throughout.",
  High: "Impressive intensity! As a beginner, listen to your body and allow 48 hours of recovery for each muscle group before training it again.",
};

function EMGWaveSVG({
  strokeColor = "oklch(0.72 0.22 220)",
}: { strokeColor?: string }) {
  return (
    <div className="overflow-hidden h-8 relative w-full">
      <svg
        role="img"
        aria-label="EMG signal wave"
        viewBox="0 0 400 40"
        className="absolute emg-wave-line"
        style={{ width: "200%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="0,20 20,20 25,5 30,35 35,5 40,35 45,20 70,20 75,8 80,32 85,8 90,32 95,20 120,20 125,2 130,38 135,2 140,38 145,20 170,20 175,10 180,30 185,10 190,30 195,20 220,20 225,5 230,35 235,5 240,35 245,20 270,20 275,8 280,32 285,8 290,32 295,20 320,20 325,2 330,38 335,2 340,38 345,20 370,20 375,10 380,30 385,10 390,30 395,20 400,20"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

function ThemeSelector({
  selectedTheme,
  onChange,
}: {
  selectedTheme: ThemeId;
  onChange: (t: ThemeId) => void;
}) {
  const current = THEMES.find((t) => t.id === selectedTheme) ?? THEMES[2];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          data-ocid="header.theme.open_modal_button"
          variant="outline"
          size="sm"
          className="border-border text-muted-foreground hover:text-foreground gap-1.5 px-2.5"
          aria-label="Select theme"
        >
          <Paintbrush className="h-3.5 w-3.5" />
          <span className="text-xs font-medium hidden sm:inline">
            {current.label}
          </span>
          <span className="text-xs sm:hidden">{current.icon}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        data-ocid="header.theme.dropdown_menu"
        align="end"
        className="w-36"
      >
        {THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            data-ocid={`header.theme-${theme.id}.toggle`}
            onClick={() => onChange(theme.id)}
            className={`gap-2 cursor-pointer ${selectedTheme === theme.id ? "text-primary font-semibold" : ""}`}
          >
            <span>{theme.icon}</span>
            <span>{theme.label}</span>
            {selectedTheme === theme.id && (
              <CheckCircle2 className="h-3.5 w-3.5 ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProfileSetup({
  onComplete,
  initialData,
}: {
  onComplete: (p: UserProfile) => void;
  initialData?: UserProfile;
}) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [age, setAge] = useState(
    initialData?.age ? String(initialData.age) : "",
  );
  const [weight, setWeight] = useState(
    initialData?.weight ? String(initialData.weight) : "",
  );
  const [gender, setGender] = useState<string>(initialData?.gender ?? "");
  const [goal, setGoal] = useState<string>(initialData?.goal ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    const a = Number.parseInt(age);
    if (!age || a < 10 || a > 100) e.age = "Age must be between 10–100";
    const w = Number.parseFloat(weight);
    if (!weight || w < 30 || w > 200)
      e.weight = "Weight must be between 30–200 kg";
    if (!gender) e.gender = "Please select a gender";
    if (!goal) e.goal = "Please select a fitness goal";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    onComplete({
      name: name.trim(),
      age: Number.parseInt(age),
      weight: Number.parseFloat(weight),
      gender: gender as UserProfile["gender"],
      goal: goal as UserProfile["goal"],
    });
  };

  const swatchColor = "oklch(var(--primary))";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <img
            src="/assets/generated/fitness-ai-logo-transparent.dim_120x120.png"
            alt="EMG Fitness AI"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h1 className="font-display text-4xl font-bold text-foreground text-glow-blue">
            EMG Fitness AI
          </h1>
          <p className="text-muted-foreground mt-2">
            Your personal AI gym assistant powered by muscle sensor data
          </p>
        </div>

        <Card className="border-border bg-card glow-blue">
          <CardHeader>
            <CardTitle className="font-display text-xl text-primary">
              {initialData ? "Edit Your Profile" : "Set Up Your Profile"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Your Name</Label>
              <Input
                id="profile-name"
                placeholder="e.g. Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input border-border"
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="profile-age">Age</Label>
                <Input
                  id="profile-age"
                  data-ocid="profile.age.input"
                  type="number"
                  min={10}
                  max={100}
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-input border-border"
                />
                {errors.age && (
                  <p className="text-destructive text-sm">{errors.age}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="profile-weight">Weight (kg)</Label>
                <Input
                  id="profile-weight"
                  data-ocid="profile.weight.input"
                  type="number"
                  min={30}
                  max={200}
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-input border-border"
                />
                {errors.weight && (
                  <p className="text-destructive text-sm">{errors.weight}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger
                  data-ocid="profile.gender.select"
                  className="bg-input border-border"
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-destructive text-sm">{errors.gender}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Fitness Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger
                  data-ocid="profile.goal.select"
                  className="bg-input border-border"
                >
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Build Muscle">Build Muscle</SelectItem>
                  <SelectItem value="Lose Weight">Lose Weight</SelectItem>
                  <SelectItem value="Maintain Fitness">
                    Maintain Fitness
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.goal && (
                <p className="text-destructive text-sm">{errors.goal}</p>
              )}
            </div>

            <Button
              data-ocid="profile.submit_button"
              className="w-full bg-primary text-primary-foreground hover:opacity-90 font-display font-semibold text-base glow-blue mt-2"
              style={{ boxShadow: `0 0 20px ${swatchColor} / 0.3` }}
              onClick={handleSubmit}
            >
              <Zap className="mr-2 h-4 w-4" />
              Start Training
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

const MUSCLE_KEYS = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Core",
  "Quads",
  "Hamstrings",
  "Glutes",
] as const;

type MuscleKey = (typeof MUSCLE_KEYS)[number];

const MUSCLE_OCIDS: Record<MuscleKey, string> = {
  Chest: "emg.chest.input",
  Back: "emg.back.input",
  Shoulders: "emg.shoulders.input",
  Biceps: "emg.biceps.input",
  Triceps: "emg.triceps.input",
  Core: "emg.core.input",
  Quads: "emg.quads.input",
  Hamstrings: "emg.hamstrings.input",
  Glutes: "emg.glutes.input",
};

function getBarColor(val: number): string {
  if (val < 30) return "bg-green-500";
  if (val <= 60) return "bg-yellow-400";
  return "bg-red-500";
}

function buildDatasetInsightSection(
  record: EMGRecord,
  emgAdcValue: number,
): string {
  return `📡 Dataset Insight (EMG: ${emgAdcValue} ADC):
Activity Level: ${record.activity} | Recommended Intake: ${Number(record.calories)} kcal
Protein: ${Number(record.protein)}g | Carbs: ${Number(record.carbs)}g | Water: ${record.water.toFixed(1)}L
💡 ${record.recommendation}`;
}

function analyzeWorkout(
  muscles: Record<MuscleKey, number>,
  duration: number,
  profile: UserProfile,
  datasetRecord?: EMGRecord,
  emgAdcValue?: number,
) {
  const values = MUSCLE_KEYS.map((k) => muscles[k]);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const primary = MUSCLE_KEYS.filter((k) => muscles[k] > 40);

  let intensity: "Low" | "Moderate" | "High";
  let met: number;
  if (avg < 30) {
    intensity = "Low";
    met = 3;
  } else if (avg <= 60) {
    intensity = "Moderate";
    met = 5;
  } else {
    intensity = "High";
    met = 8;
  }

  const calories = Math.round(met * profile.weight * (duration / 60));

  const bmr =
    profile.gender === "Male"
      ? 10 * profile.weight + 6.25 * 170 - 5 * profile.age + 5
      : 10 * profile.weight + 6.25 * 170 - 5 * profile.age - 161;

  let dailyCals = Math.round(bmr * 1.55);
  if (profile.goal === "Build Muscle") dailyCals += 300;
  else if (profile.goal === "Lose Weight") dailyCals -= 500;

  let proteinG: number;
  let fatG: number;
  let carbG: number;

  if (profile.goal === "Build Muscle") {
    proteinG = Math.round(2.2 * profile.weight);
    fatG = Math.round((dailyCals * 0.25) / 9);
    carbG = Math.round((dailyCals - proteinG * 4 - fatG * 9) / 4);
  } else if (profile.goal === "Lose Weight") {
    proteinG = Math.round(2.0 * profile.weight);
    fatG = Math.round((dailyCals * 0.3) / 9);
    carbG = Math.round((dailyCals - proteinG * 4 - fatG * 9) / 4);
  } else {
    proteinG = Math.round(1.6 * profile.weight);
    fatG = Math.round((dailyCals * 0.3) / 9);
    carbG = Math.round((dailyCals - proteinG * 4 - fatG * 9) / 4);
  }

  const mealPlan = selectMealsFromDataset(
    primary as unknown as string[],
    intensity,
    profile.goal,
    dailyCals,
    proteinG,
  );

  const tip = BEGINNER_TIPS[intensity];
  const primaryStr = primary.length > 0 ? primary.join(", ") : "None detected";

  // Select exercises from dataset
  const recommendedExercises = selectExercisesFromDataset(
    primary as unknown as string[],
    intensity,
    profile.goal,
    5,
  );
  const exerciseLines =
    recommendedExercises.length > 0
      ? recommendedExercises
          .map(
            (ex) =>
              `  • ${ex.name} (${ex.difficulty}) – ${ex.sets} sets × ${ex.reps} | ${ex.equipment}
    ${ex.description}`,
          )
          .join("\n")
      : "  • Compound movements matching your activated muscle groups";

  // Build meal plan text
  const mealLines = mealPlan.meals
    .map((meal) => {
      const foodLines = meal.foods
        .map(
          (f) =>
            `  • ${f.food.name} (${f.food.servingSize}) – ${f.adjustedCalories} kcal | P:${f.adjustedProtein}g C:${f.adjustedCarbs}g F:${f.adjustedFat}g`,
        )
        .join("\n");
      return `${meal.mealName}\n${foodLines}\n  ─ Total: ${meal.totalCalories} kcal | P:${Math.round(meal.totalProtein)}g C:${Math.round(meal.totalCarbs)}g F:${Math.round(meal.totalFat)}g`;
    })
    .join("\n\n");

  const recoveryLines =
    mealPlan.recoveryFoods.length > 0
      ? mealPlan.recoveryFoods
          .map(
            (f) =>
              `  • ${f.name} (${f.servingSize}) – great for muscle repair & recovery`,
          )
          .join("\n")
      : "  • Whey Protein Shake – fast-absorbing protein for recovery\n  • Salmon – rich in omega-3s for muscle repair\n  • Blueberries – antioxidants to reduce inflammation";

  // Build dataset insight section if available
  const datasetSection =
    datasetRecord !== undefined && emgAdcValue !== undefined
      ? `\n${buildDatasetInsightSection(datasetRecord, emgAdcValue)}\n`
      : "";

  const assistantMsg = `Great workout, ${profile.name}! Here's what your EMG data tells us:

💪 Primary muscles activated: ${primaryStr}
⚡ Workout intensity: ${intensity}
🔥 Calories burned: ~${calories} kcal
${datasetSection}
📊 Your daily calorie target: ${dailyCals} kcal
🥩 Protein: ${proteinG}g | 🍚 Carbs: ${carbG}g | 🥑 Fat: ${fatG}g

🍽️ Your personalized meal plan:

${mealLines}

💪 Recovery foods for ${primaryStr}:
${recoveryLines}

🏋️ Recommended exercises for ${primaryStr}:
${exerciseLines}

💡 ${tip}`;

  const userMsg = `Analyzed workout: ${duration} min | Intensity: ${intensity} | Active muscles: ${primaryStr}`;

  return { assistantMsg, userMsg };
}

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem("emg-profile");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [editingProfile, setEditingProfile] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(() => {
    return (localStorage.getItem("emg-theme-v2") as ThemeId) || "blue";
  });

  const [muscles, setMuscles] = useState<Record<MuscleKey, number>>(
    Object.fromEntries(MUSCLE_KEYS.map((k) => [k, 0])) as Record<
      MuscleKey,
      number
    >,
  );

  // Raw ADC values (0-1023) mirroring the percentage state
  const [rawValues, setRawValues] = useState<Record<MuscleKey, number>>(
    Object.fromEntries(MUSCLE_KEYS.map((k) => [k, 0])) as Record<
      MuscleKey,
      number
    >,
  );

  const [emgMode, setEmgMode] = useState<EmgMode>("slider");

  // Auto-analyze states
  const [autoAnalyze, setAutoAnalyze] = useState(false);
  const [sensingStatus, setSensingStatus] = useState<SensingStatus>("idle");
  const autoAnalyzeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs to latest muscles and profile for debounce callback
  const musclesRef = useRef(muscles);
  const profileRef = useRef(profile);

  useEffect(() => {
    musclesRef.current = muscles;
  }, [muscles]);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  const [duration, setDuration] = useState("30");
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem("emg-chat");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light");
    html.removeAttribute("data-palette");

    if (selectedTheme === "light") {
      html.classList.add("light");
    } else if (selectedTheme === "green") {
      html.setAttribute("data-palette", "green");
    }
    // "dark" and "blue" = default (no class, no data-palette)
    localStorage.setItem("emg-theme-v2", selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    if (profile) localStorage.setItem("emg-profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("emg-chat", JSON.stringify(messages));
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleProfileComplete = (p: UserProfile) => {
    setProfile(p);
    setEditingProfile(false);
  };

  // Compute representative ADC value from muscle percentages
  const computeEmgAdcValue = (
    muscleValues: Record<MuscleKey, number>,
  ): number => {
    const values = MUSCLE_KEYS.map((k) => muscleValues[k]);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return Math.round((avg / 100) * 1023);
  };

  // Core analyze function that accepts values directly (for debounce use)
  const handleAnalyzeWithValues = async (
    muscleValues: Record<MuscleKey, number>,
    userProfile: UserProfile,
  ) => {
    const dur = Number.parseInt(duration) || 30;

    // Fetch dataset insight from backend (non-blocking — falls back gracefully)
    const emgAdcValue = computeEmgAdcValue(muscleValues);
    let datasetRecord: EMGRecord | undefined;
    try {
      const backendInstance = await createActorWithConfig();
      datasetRecord = await backendInstance.getEMGRecommendation(
        BigInt(emgAdcValue),
      );
    } catch (err) {
      console.warn(
        "Backend EMG dataset lookup failed, continuing without it:",
        err,
      );
    }

    const { assistantMsg, userMsg } = analyzeWorkout(
      muscleValues,
      dur,
      userProfile,
      datasetRecord,
      datasetRecord !== undefined ? emgAdcValue : undefined,
    );

    const now = Date.now();
    const userMessage: ChatMessage = {
      id: `u-${now}`,
      role: "user",
      content: userMsg,
      timestamp: now,
    };
    const botMessage: ChatMessage = {
      id: `a-${now}`,
      role: "assistant",
      content: assistantMsg,
      timestamp: now + 1,
    };
    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const handleAnalyze = async () => {
    if (!profile) return;
    await handleAnalyzeWithValues(muscles, profile);
  };

  const clearHistory = () => {
    setMessages([]);
  };

  // Toggle between slider and raw ADC mode
  const handleToggleEmgMode = () => {
    if (emgMode === "slider") {
      // slider → raw: convert current percentages to raw ADC values
      const newRaw = Object.fromEntries(
        MUSCLE_KEYS.map((k) => [k, Math.round((muscles[k] / 100) * 1023)]),
      ) as Record<MuscleKey, number>;
      setRawValues(newRaw);
      setEmgMode("raw");
    } else {
      // raw → slider: percentages already updated in real-time, just switch mode
      // Also reset auto-analyze
      setAutoAnalyze(false);
      setSensingStatus("idle");
      if (autoAnalyzeTimer.current) clearTimeout(autoAnalyzeTimer.current);
      if (statusResetTimer.current) clearTimeout(statusResetTimer.current);
      setEmgMode("slider");
    }
  };

  // Handle raw ADC input change
  const handleRawChange = (muscle: MuscleKey, rawStr: string) => {
    const raw = Math.max(0, Math.min(1023, Number.parseInt(rawStr) || 0));
    setRawValues((prev) => ({ ...prev, [muscle]: raw }));
    const percent = Math.round((raw / 1023) * 100);
    setMuscles((prev) => ({ ...prev, [muscle]: percent }));

    // Auto-analyze debounce
    if (autoAnalyze) {
      if (autoAnalyzeTimer.current) clearTimeout(autoAnalyzeTimer.current);
      if (statusResetTimer.current) clearTimeout(statusResetTimer.current);
      setSensingStatus("sensing");
      autoAnalyzeTimer.current = setTimeout(async () => {
        const currentMuscles = musclesRef.current;
        const currentProfile = profileRef.current;
        if (currentProfile) {
          await handleAnalyzeWithValues(currentMuscles, currentProfile);
        }
        setSensingStatus("done");
        statusResetTimer.current = setTimeout(() => {
          setSensingStatus("idle");
        }, 2000);
      }, 1500);
    }
  };

  const handleToggleAutoAnalyze = () => {
    if (autoAnalyze) {
      // Turning OFF
      setAutoAnalyze(false);
      setSensingStatus("idle");
      if (autoAnalyzeTimer.current) clearTimeout(autoAnalyzeTimer.current);
      if (statusResetTimer.current) clearTimeout(statusResetTimer.current);
    } else {
      setAutoAnalyze(true);
    }
  };

  if (!profile || editingProfile) {
    return (
      <ProfileSetup
        onComplete={handleProfileComplete}
        initialData={profile ?? undefined}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/fitness-ai-logo-transparent.dim_120x120.png"
              alt="EMG Fitness AI"
              className="w-10 h-10"
            />
            <div>
              <h1 className="font-display text-xl font-bold text-foreground text-glow-blue">
                EMG Fitness AI
              </h1>
              <p className="text-xs text-muted-foreground">MyoWare Powered</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground">
                {profile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {profile.goal} · {profile.weight}kg
              </p>
            </div>

            {/* Theme selector */}
            <ThemeSelector
              selectedTheme={selectedTheme}
              onChange={setSelectedTheme}
            />
            <Button
              data-ocid="header.edit_profile.button"
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:text-foreground"
              onClick={() => setEditingProfile(true)}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* EMG Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-border bg-card h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <CardTitle className="font-display text-lg text-primary">
                      MyoWare EMG Sensor Data
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Auto-analyze toggle — only in raw ADC mode */}
                    {emgMode === "raw" && (
                      <TooltipProvider delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              data-ocid="emg.auto.toggle"
                              onClick={handleToggleAutoAnalyze}
                              aria-label={
                                autoAnalyze
                                  ? "Disable auto-analyze"
                                  : "Enable auto-analyze"
                              }
                              aria-pressed={autoAnalyze}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                autoAnalyze
                                  ? "bg-green-500/20 text-green-400 border-green-500/40"
                                  : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  autoAnalyze
                                    ? "bg-green-400 animate-pulse"
                                    : "bg-muted-foreground"
                                }`}
                              />
                              Auto
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="text-xs">
                            Auto-analyze when sensor values change
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    {/* Input mode toggle pill */}
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            data-ocid="emg.mode.toggle"
                            onClick={handleToggleEmgMode}
                            aria-label={`Switch to ${emgMode === "slider" ? "Raw ADC" : "Slider"} mode`}
                            className="flex items-center rounded-full border border-border bg-muted/50 p-0.5 text-xs font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <span
                              className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                                emgMode === "slider"
                                  ? "bg-primary text-primary-foreground shadow-sm"
                                  : "text-muted-foreground"
                              }`}
                            >
                              Slider
                            </span>
                            <span
                              className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                                emgMode === "raw"
                                  ? "bg-primary text-primary-foreground shadow-sm"
                                  : "text-muted-foreground"
                              }`}
                            >
                              Raw ADC
                            </span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                          {emgMode === "slider"
                            ? "Switch to raw ADC input (0–1023) like real MyoWare output"
                            : "Switch back to percentage sliders"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {emgMode === "raw" && (
                  <>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      📡 Raw ADC (0–1023) — simulating live MyoWare sensor
                      output
                    </p>
                    {/* Hardware tip callout */}
                    <div className="mt-2 flex items-start gap-1.5 rounded-md border border-border bg-muted/30 px-2.5 py-1.5">
                      <span className="text-xs leading-relaxed text-muted-foreground">
                        💡{" "}
                        <span className="font-medium text-foreground/70">
                          Hardware tip:
                        </span>{" "}
                        Connect MyoWare → Arduino analog pin → Serial → parse
                        values 0–1023 per muscle. Enable Auto above to stream
                        live.
                      </span>
                    </div>
                  </>
                )}

                <EMGWaveSVG
                  strokeColor={
                    selectedTheme === "green"
                      ? "oklch(0.72 0.22 145)"
                      : "oklch(0.72 0.22 220)"
                  }
                />
              </CardHeader>
              <CardContent className="space-y-4">
                {MUSCLE_KEYS.map((muscle) => {
                  const val = muscles[muscle];
                  const rawVal = rawValues[muscle];
                  return (
                    <div key={muscle} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm text-foreground">
                          {muscle}
                        </Label>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            val < 30
                              ? "bg-green-500/20 text-green-400"
                              : val <= 60
                                ? "bg-yellow-400/20 text-yellow-300"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {val}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {emgMode === "slider" ? (
                          <div className="flex-1">
                            <Slider
                              data-ocid={MUSCLE_OCIDS[muscle]}
                              min={0}
                              max={100}
                              step={1}
                              value={[val]}
                              onValueChange={([v]) =>
                                setMuscles((prev) => ({
                                  ...prev,
                                  [muscle]: v,
                                }))
                              }
                              className="w-full"
                            />
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center gap-2">
                            <Input
                              data-ocid={MUSCLE_OCIDS[muscle]}
                              type="number"
                              min={0}
                              max={1023}
                              value={rawVal}
                              onChange={(e) =>
                                handleRawChange(muscle, e.target.value)
                              }
                              className="bg-input border-border w-24 h-8 text-sm font-mono tabular-nums"
                              aria-label={`${muscle} raw ADC value (0–1023)`}
                            />
                            <span className="text-xs text-muted-foreground font-mono">
                              / 1023
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className={`h-full ${getBarColor(val)}`}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="pt-2 space-y-1.5">
                  <Label htmlFor="duration" className="text-sm text-foreground">
                    Workout Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    data-ocid="emg.duration.input"
                    type="number"
                    min={1}
                    max={120}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="bg-input border-border w-28"
                  />
                </div>

                {/* Status badge — only in raw ADC mode */}
                {emgMode === "raw" && sensingStatus !== "idle" && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={sensingStatus}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      data-ocid={
                        sensingStatus === "sensing"
                          ? "emg.loading_state"
                          : "emg.success_state"
                      }
                      className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border w-fit ${
                        sensingStatus === "sensing"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-green-500/10 text-green-400 border-green-500/30"
                      }`}
                    >
                      {sensingStatus === "sensing" ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          Reading sensor...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Analysis complete
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}

                <Button
                  data-ocid="emg.analyze.primary_button"
                  className={`w-full font-display font-semibold text-base glow-blue mt-2 transition-opacity ${
                    autoAnalyze && emgMode === "raw"
                      ? "bg-primary/60 text-primary-foreground hover:opacity-80"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                  onClick={handleAnalyze}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  {autoAnalyze && emgMode === "raw"
                    ? "Manual Analyze"
                    : "Analyze My Workout"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <Card
              className="border-border bg-card flex flex-col"
              style={{ height: "calc(100vh - 180px)", minHeight: "500px" }}
            >
              <CardHeader className="pb-3 border-b border-border flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-accent" />
                    <CardTitle className="font-display text-lg text-accent">
                      AI Fitness Assistant
                    </CardTitle>
                  </div>
                  <Button
                    data-ocid="chat.clear_button"
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={clearHistory}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
              </CardHeader>

              <ScrollArea className="flex-1 p-4">
                {messages.length === 0 ? (
                  <div
                    data-ocid="chat.empty_state"
                    className="h-full flex items-center justify-center text-center py-16"
                  >
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto glow-green">
                        <Bot className="h-8 w-8 text-accent" />
                      </div>
                      <p className="text-muted-foreground text-sm max-w-xs">
                        Hi! I'm your AI Fitness Assistant. Set up your EMG data
                        on the left and click{" "}
                        <span className="text-primary font-semibold">
                          Analyze
                        </span>{" "}
                        to get started!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {messages.map((msg, i) => (
                        <motion.div
                          key={msg.id}
                          data-ocid={`chat.item.${i + 1}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${
                            msg.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {msg.role === "assistant" && (
                            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                              <Bot className="h-4 w-4 text-accent" />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground rounded-br-sm"
                                : "bg-secondary text-foreground border border-border rounded-bl-sm"
                            }`}
                          >
                            <pre className="whitespace-pre-wrap font-body text-sm leading-relaxed">
                              {msg.content}
                            </pre>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div ref={chatBottomRef} />
                  </div>
                )}
              </ScrollArea>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          Built with ❤️ using caffeine.ai
        </a>
      </footer>
    </div>
  );
}

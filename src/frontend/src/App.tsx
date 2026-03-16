import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Activity, Bot, Moon, Sun, Trash2, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type PaletteId = "blue" | "purple" | "orange" | "crimson";

const PALETTES: {
  id: PaletteId;
  label: string;
  swatch: string;
  accentSwatch: string;
}[] = [
  {
    id: "blue",
    label: "Electric Blue",
    swatch: "oklch(0.72 0.22 220)",
    accentSwatch: "oklch(0.82 0.22 145)",
  },
  {
    id: "purple",
    label: "Neon Purple",
    swatch: "oklch(0.72 0.25 290)",
    accentSwatch: "oklch(0.78 0.22 340)",
  },
  {
    id: "orange",
    label: "Solar Orange",
    swatch: "oklch(0.78 0.2 50)",
    accentSwatch: "oklch(0.76 0.18 180)",
  },
  {
    id: "crimson",
    label: "Crimson",
    swatch: "oklch(0.68 0.24 15)",
    accentSwatch: "oklch(0.72 0.22 260)",
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

const MEAL_PLANS = {
  "Build Muscle": [
    "Grilled chicken with brown rice and broccoli",
    "Egg white omelette with oats",
    "Salmon with sweet potato",
    "Greek yogurt with mixed nuts and banana",
    "Lean beef stir-fry with quinoa",
  ],
  "Lose Weight": [
    "Grilled tilapia with steamed veggies",
    "Mixed greens salad with grilled chicken",
    "Zucchini noodles with turkey meatballs",
    "Boiled eggs with avocado toast (1 slice)",
    "Lentil soup with a side salad",
  ],
  "Maintain Fitness": [
    "Whole wheat pasta with grilled chicken",
    "Veggie wrap with hummus",
    "Brown rice bowl with tofu and veggies",
    "Smoothie with protein powder, banana, and almond milk",
    "Overnight oats with berries",
  ],
};

const BEGINNER_TIPS: Record<string, string> = {
  Low: "Great start! Focus on perfecting your form at low intensity before increasing resistance. Rest 60–90 seconds between sets.",
  Moderate:
    "You're in the ideal training zone for beginners! Aim for 2–3 sessions per week and make sure to stay hydrated throughout.",
  High: "Impressive intensity! As a beginner, listen to your body and allow 48 hours of recovery for each muscle group before training it again.",
};

function EMGWaveSVG({ palette }: { palette: PaletteId }) {
  const strokeColor =
    PALETTES.find((p) => p.id === palette)?.swatch ?? "oklch(0.72 0.22 220)";
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

function PalettePicker({
  palette,
  onChange,
}: {
  palette: PaletteId;
  onChange: (p: PaletteId) => void;
}) {
  return (
    <TooltipProvider delayDuration={300}>
      <div
        className="flex items-center gap-1.5"
        aria-label="Color palette picker"
      >
        {PALETTES.map((p) => {
          const isSelected = palette === p.id;
          return (
            <Tooltip key={p.id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  data-ocid={`header.palette-${p.id}.toggle`}
                  aria-label={`Switch to ${p.label} palette`}
                  aria-pressed={isSelected}
                  onClick={() => onChange(p.id)}
                  className="relative w-6 h-6 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  style={{
                    background: `linear-gradient(135deg, ${p.swatch} 50%, ${p.accentSwatch} 50%)`,
                    boxShadow: isSelected
                      ? `0 0 0 2px var(--background-color, transparent), 0 0 0 4px ${p.swatch}`
                      : "none",
                    outline: isSelected ? `2px solid ${p.swatch}` : "none",
                    outlineOffset: "2px",
                    transform: isSelected ? "scale(1.2)" : "scale(1)",
                  }}
                />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {p.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

function ProfileSetup({
  onComplete,
  palette,
}: { onComplete: (p: UserProfile) => void; palette: PaletteId }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
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

  const swatchColor =
    PALETTES.find((p) => p.id === palette)?.swatch ?? "oklch(0.72 0.22 220)";

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
              Set Up Your Profile
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

function analyzeWorkout(
  muscles: Record<MuscleKey, number>,
  duration: number,
  profile: UserProfile,
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

  const meals = MEAL_PLANS[profile.goal];
  const tip = BEGINNER_TIPS[intensity];

  const primaryStr = primary.length > 0 ? primary.join(", ") : "None detected";

  const assistantMsg = `Great workout, ${profile.name}! Here's what your EMG data tells us:

💪 Primary muscles activated: ${primaryStr}
⚡ Workout intensity: ${intensity}
🔥 Calories burned: ~${calories} kcal

📊 Your daily calorie target: ${dailyCals} kcal

🥗 Your personalized diet plan:
• Protein: ${proteinG}g per day
• Carbohydrates: ${carbG}g per day
• Fats: ${fatG}g per day

🍽️ Meal ideas for you:
• ${meals[0]}
• ${meals[1]}
• ${meals[2]}
• ${meals[3]}
• ${meals[4]}

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

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    return (localStorage.getItem("emg-theme") as "dark" | "light") || "dark";
  });

  const [palette, setPalette] = useState<PaletteId>(() => {
    return (localStorage.getItem("emg-palette") as PaletteId) || "blue";
  });

  const [muscles, setMuscles] = useState<Record<MuscleKey, number>>(
    Object.fromEntries(MUSCLE_KEYS.map((k) => [k, 0])) as Record<
      MuscleKey,
      number
    >,
  );
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
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("emg-theme", theme);
  }, [theme]);

  useEffect(() => {
    const html = document.documentElement;
    if (palette === "blue") {
      html.removeAttribute("data-palette");
    } else {
      html.setAttribute("data-palette", palette);
    }
    localStorage.setItem("emg-palette", palette);
  }, [palette]);

  useEffect(() => {
    if (profile) localStorage.setItem("emg-profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("emg-chat", JSON.stringify(messages));
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleProfileComplete = (p: UserProfile) => {
    setProfile(p);
  };

  const handleAnalyze = () => {
    if (!profile) return;
    const dur = Number.parseInt(duration) || 30;
    const { assistantMsg, userMsg } = analyzeWorkout(muscles, dur, profile);

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

  const clearHistory = () => {
    setMessages([]);
  };

  if (!profile) {
    return (
      <ProfileSetup onComplete={handleProfileComplete} palette={palette} />
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

            {/* Palette picker */}
            <PalettePicker palette={palette} onChange={setPalette} />

            {/* Divider */}
            <div className="w-px h-5 bg-border" />

            {/* Theme toggle */}
            <Button
              data-ocid="header.theme.toggle"
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:text-foreground w-9 px-0"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <Sun className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <Moon className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:text-foreground"
              onClick={() => {
                localStorage.removeItem("emg-profile");
                setProfile(null);
              }}
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
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-5 w-5 text-primary" />
                  <CardTitle className="font-display text-lg text-primary">
                    MyoWare EMG Sensor Data
                  </CardTitle>
                </div>
                <EMGWaveSVG palette={palette} />
              </CardHeader>
              <CardContent className="space-y-4">
                {MUSCLE_KEYS.map((muscle) => {
                  const val = muscles[muscle];
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
                        <div className="flex-1">
                          <Slider
                            data-ocid={MUSCLE_OCIDS[muscle]}
                            min={0}
                            max={100}
                            step={1}
                            value={[val]}
                            onValueChange={([v]) =>
                              setMuscles((prev) => ({ ...prev, [muscle]: v }))
                            }
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${getBarColor(val)}`}
                          style={{ width: `${val}%` }}
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

                <Button
                  data-ocid="emg.analyze.primary_button"
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 font-display font-semibold text-base glow-blue mt-2"
                  onClick={handleAnalyze}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Analyze My Workout
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

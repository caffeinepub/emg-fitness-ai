export interface FoodItem {
  name: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category:
    | "protein_source"
    | "carb_source"
    | "fat_source"
    | "vegetable"
    | "dairy"
    | "fruit"
    | "snack";
  tags: Array<
    | "muscle_building"
    | "fat_loss"
    | "recovery"
    | "pre_workout"
    | "post_workout"
    | "high_protein"
    | "low_carb"
    | "whole_food"
  >;
  muscleAffinities?: Array<
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
}

export interface MealSuggestion {
  mealName: string;
  foods: Array<{
    food: FoodItem;
    amount: string;
    adjustedCalories: number;
    adjustedProtein: number;
    adjustedCarbs: number;
    adjustedFat: number;
  }>;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface MealPlan {
  meals: MealSuggestion[];
  dailyTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  recoveryFoods: FoodItem[];
}

export const NUTRITION_DB: FoodItem[] = [
  // ── Protein Sources ──────────────────────────────────────────────────────────
  {
    name: "Chicken Breast (cooked)",
    servingSize: "100g",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    category: "protein_source",
    tags: [
      "muscle_building",
      "high_protein",
      "fat_loss",
      "post_workout",
      "whole_food",
    ],
    muscleAffinities: ["Chest", "Back", "Shoulders"],
  },
  {
    name: "Turkey Breast (cooked)",
    servingSize: "100g",
    calories: 135,
    protein: 30,
    carbs: 0,
    fat: 1,
    category: "protein_source",
    tags: [
      "muscle_building",
      "high_protein",
      "fat_loss",
      "post_workout",
      "whole_food",
    ],
    muscleAffinities: ["Back", "Shoulders"],
  },
  {
    name: "Atlantic Salmon (cooked)",
    servingSize: "100g",
    calories: 208,
    protein: 28,
    carbs: 0,
    fat: 10,
    category: "protein_source",
    tags: ["muscle_building", "recovery", "post_workout", "whole_food"],
    muscleAffinities: ["Back", "Hamstrings", "Glutes"],
  },
  {
    name: "Tuna (canned in water)",
    servingSize: "100g",
    calories: 116,
    protein: 26,
    carbs: 0,
    fat: 1,
    category: "protein_source",
    tags: ["muscle_building", "high_protein", "fat_loss", "low_carb"],
    muscleAffinities: ["Core", "Biceps"],
  },
  {
    name: "Tilapia (cooked)",
    servingSize: "100g",
    calories: 128,
    protein: 26,
    carbs: 0,
    fat: 2.6,
    category: "protein_source",
    tags: ["muscle_building", "high_protein", "fat_loss", "low_carb"],
    muscleAffinities: ["Chest", "Triceps"],
  },
  {
    name: "Shrimp (cooked)",
    servingSize: "100g",
    calories: 99,
    protein: 24,
    carbs: 0,
    fat: 0.3,
    category: "protein_source",
    tags: ["fat_loss", "high_protein", "low_carb"],
  },
  {
    name: "Lean Ground Beef (95%)",
    servingSize: "100g",
    calories: 172,
    protein: 26,
    carbs: 0,
    fat: 7,
    category: "protein_source",
    tags: ["muscle_building", "high_protein", "post_workout", "whole_food"],
    muscleAffinities: ["Chest", "Back", "Quads"],
  },
  {
    name: "Ground Turkey (93% lean)",
    servingSize: "100g",
    calories: 148,
    protein: 22,
    carbs: 0,
    fat: 7,
    category: "protein_source",
    tags: ["muscle_building", "high_protein", "fat_loss"],
  },
  {
    name: "Whole Eggs",
    servingSize: "2 large eggs",
    calories: 143,
    protein: 13,
    carbs: 1,
    fat: 10,
    category: "protein_source",
    tags: ["muscle_building", "recovery", "whole_food", "post_workout"],
    muscleAffinities: ["Chest", "Shoulders", "Triceps"],
  },
  {
    name: "Egg Whites",
    servingSize: "1 cup (243g)",
    calories: 126,
    protein: 26,
    carbs: 2,
    fat: 0.4,
    category: "protein_source",
    tags: ["muscle_building", "high_protein", "fat_loss", "low_carb"],
  },
  {
    name: "Cottage Cheese (low-fat)",
    servingSize: "1 cup (226g)",
    calories: 163,
    protein: 28,
    carbs: 6,
    fat: 2.3,
    category: "dairy",
    tags: ["muscle_building", "high_protein", "recovery"],
    muscleAffinities: ["Biceps", "Triceps"],
  },
  {
    name: "Greek Yogurt (non-fat)",
    servingSize: "170g",
    calories: 100,
    protein: 17,
    carbs: 6,
    fat: 0.7,
    category: "dairy",
    tags: ["muscle_building", "high_protein", "recovery", "post_workout"],
    muscleAffinities: ["Core"],
  },
  {
    name: "Whey Protein Powder",
    servingSize: "1 scoop (30g)",
    calories: 120,
    protein: 24,
    carbs: 3,
    fat: 1.5,
    category: "protein_source",
    tags: ["muscle_building", "high_protein", "post_workout", "recovery"],
    muscleAffinities: [
      "Chest",
      "Back",
      "Shoulders",
      "Biceps",
      "Triceps",
      "Quads",
    ],
  },
  {
    name: "Casein Protein Powder",
    servingSize: "1 scoop (33g)",
    calories: 120,
    protein: 24,
    carbs: 4,
    fat: 1,
    category: "protein_source",
    tags: ["muscle_building", "high_protein", "recovery"],
  },
  {
    name: "Tempeh",
    servingSize: "100g",
    calories: 193,
    protein: 19,
    carbs: 9,
    fat: 11,
    category: "protein_source",
    tags: ["muscle_building", "whole_food", "recovery"],
    muscleAffinities: ["Core"],
  },
  {
    name: "Firm Tofu",
    servingSize: "100g",
    calories: 76,
    protein: 8,
    carbs: 2,
    fat: 4,
    category: "protein_source",
    tags: ["fat_loss", "low_carb", "whole_food"],
  },
  {
    name: "Edamame",
    servingSize: "1 cup (155g)",
    calories: 188,
    protein: 17,
    carbs: 14,
    fat: 8,
    category: "protein_source",
    tags: ["muscle_building", "whole_food", "recovery"],
    muscleAffinities: ["Glutes", "Hamstrings"],
  },
  {
    name: "Lentils (cooked)",
    servingSize: "1 cup (198g)",
    calories: 230,
    protein: 18,
    carbs: 40,
    fat: 0.8,
    category: "protein_source",
    tags: ["muscle_building", "whole_food"],
  },
  {
    name: "Black Beans (cooked)",
    servingSize: "1 cup (172g)",
    calories: 227,
    protein: 15,
    carbs: 41,
    fat: 0.9,
    category: "protein_source",
    tags: ["muscle_building", "whole_food"],
    muscleAffinities: ["Core"],
  },
  {
    name: "Chickpeas (cooked)",
    servingSize: "1 cup (164g)",
    calories: 269,
    protein: 15,
    carbs: 45,
    fat: 4.2,
    category: "protein_source",
    tags: ["muscle_building", "whole_food"],
  },
  {
    name: "Sardines (canned in oil)",
    servingSize: "100g",
    calories: 208,
    protein: 25,
    carbs: 0,
    fat: 11,
    category: "protein_source",
    tags: ["muscle_building", "high_protein", "recovery", "whole_food"],
    muscleAffinities: ["Back", "Shoulders"],
  },
  // ── Carb Sources ─────────────────────────────────────────────────────────────
  {
    name: "Brown Rice (cooked)",
    servingSize: "1 cup (195g)",
    calories: 216,
    protein: 5,
    carbs: 45,
    fat: 1.8,
    category: "carb_source",
    tags: ["muscle_building", "whole_food", "post_workout"],
    muscleAffinities: ["Quads", "Glutes"],
  },
  {
    name: "White Rice (cooked)",
    servingSize: "1 cup (186g)",
    calories: 242,
    protein: 4.4,
    carbs: 53,
    fat: 0.4,
    category: "carb_source",
    tags: ["post_workout", "muscle_building"],
  },
  {
    name: "Rolled Oats (dry)",
    servingSize: "½ cup (40g)",
    calories: 150,
    protein: 5,
    carbs: 27,
    fat: 3,
    category: "carb_source",
    tags: ["muscle_building", "whole_food", "pre_workout"],
  },
  {
    name: "Sweet Potato (baked)",
    servingSize: "1 medium (130g)",
    calories: 112,
    protein: 2,
    carbs: 26,
    fat: 0.1,
    category: "carb_source",
    tags: ["muscle_building", "whole_food", "post_workout", "recovery"],
    muscleAffinities: ["Quads", "Hamstrings", "Glutes"],
  },
  {
    name: "White Potato (baked)",
    servingSize: "1 medium (150g)",
    calories: 130,
    protein: 3.4,
    carbs: 30,
    fat: 0.2,
    category: "carb_source",
    tags: ["post_workout", "whole_food"],
  },
  {
    name: "Whole Wheat Bread",
    servingSize: "2 slices (56g)",
    calories: 138,
    protein: 6,
    carbs: 26,
    fat: 2,
    category: "carb_source",
    tags: ["whole_food", "pre_workout"],
  },
  {
    name: "Whole Wheat Pasta (cooked)",
    servingSize: "1 cup (140g)",
    calories: 174,
    protein: 7.5,
    carbs: 37,
    fat: 0.8,
    category: "carb_source",
    tags: ["muscle_building", "whole_food"],
  },
  {
    name: "Quinoa (cooked)",
    servingSize: "1 cup (185g)",
    calories: 222,
    protein: 8,
    carbs: 39,
    fat: 3.5,
    category: "carb_source",
    tags: ["muscle_building", "whole_food", "post_workout"],
    muscleAffinities: ["Core"],
  },
  {
    name: "Banana",
    servingSize: "1 medium (118g)",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    category: "fruit",
    tags: ["pre_workout", "post_workout", "whole_food"],
  },
  {
    name: "Apple",
    servingSize: "1 medium (182g)",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    category: "fruit",
    tags: ["fat_loss", "whole_food"],
  },
  {
    name: "Blueberries",
    servingSize: "1 cup (148g)",
    calories: 84,
    protein: 1.1,
    carbs: 21,
    fat: 0.5,
    category: "fruit",
    tags: ["fat_loss", "recovery", "whole_food"],
    muscleAffinities: ["Core"],
  },
  {
    name: "Strawberries",
    servingSize: "1 cup (152g)",
    calories: 49,
    protein: 1,
    carbs: 12,
    fat: 0.5,
    category: "fruit",
    tags: ["fat_loss", "recovery", "whole_food"],
  },
  {
    name: "Orange",
    servingSize: "1 medium (131g)",
    calories: 62,
    protein: 1.2,
    carbs: 15,
    fat: 0.2,
    category: "fruit",
    tags: ["fat_loss", "whole_food", "recovery"],
  },
  {
    name: "Rice Cakes (plain)",
    servingSize: "2 cakes (18g)",
    calories: 70,
    protein: 1.4,
    carbs: 15,
    fat: 0.7,
    category: "carb_source",
    tags: ["fat_loss", "pre_workout", "low_carb"],
  },
  {
    name: "Corn Tortilla",
    servingSize: "2 tortillas (52g)",
    calories: 105,
    protein: 2.8,
    carbs: 22,
    fat: 1.4,
    category: "carb_source",
    tags: ["whole_food"],
  },
  {
    name: "Whole Grain Wrap",
    servingSize: "1 wrap (45g)",
    calories: 130,
    protein: 4,
    carbs: 24,
    fat: 2,
    category: "carb_source",
    tags: ["whole_food", "pre_workout"],
  },
  {
    name: "Dates (medjool)",
    servingSize: "2 dates (48g)",
    calories: 133,
    protein: 0.8,
    carbs: 36,
    fat: 0.1,
    category: "fruit",
    tags: ["pre_workout"],
  },
  // ── Fat Sources ───────────────────────────────────────────────────────────────
  {
    name: "Avocado",
    servingSize: "½ avocado (68g)",
    calories: 114,
    protein: 1.3,
    carbs: 6,
    fat: 10,
    category: "fat_source",
    tags: ["fat_loss", "recovery", "whole_food", "low_carb"],
    muscleAffinities: ["Core", "Shoulders"],
  },
  {
    name: "Almonds",
    servingSize: "28g (about 23 nuts)",
    calories: 164,
    protein: 6,
    carbs: 6,
    fat: 14,
    category: "fat_source",
    tags: ["muscle_building", "recovery", "whole_food", "low_carb"],
    muscleAffinities: ["Biceps"],
  },
  {
    name: "Walnuts",
    servingSize: "28g (about 14 halves)",
    calories: 185,
    protein: 4.3,
    carbs: 4,
    fat: 18,
    category: "fat_source",
    tags: ["recovery", "whole_food", "low_carb"],
    muscleAffinities: ["Back"],
  },
  {
    name: "Peanut Butter (natural)",
    servingSize: "2 tbsp (32g)",
    calories: 190,
    protein: 8,
    carbs: 6,
    fat: 16,
    category: "fat_source",
    tags: ["muscle_building", "pre_workout", "whole_food"],
    muscleAffinities: ["Chest", "Triceps"],
  },
  {
    name: "Almond Butter",
    servingSize: "2 tbsp (32g)",
    calories: 196,
    protein: 7,
    carbs: 6,
    fat: 18,
    category: "fat_source",
    tags: ["muscle_building", "pre_workout", "whole_food"],
  },
  {
    name: "Olive Oil (extra virgin)",
    servingSize: "1 tbsp (14g)",
    calories: 119,
    protein: 0,
    carbs: 0,
    fat: 14,
    category: "fat_source",
    tags: ["recovery", "whole_food", "low_carb"],
  },
  {
    name: "Chia Seeds",
    servingSize: "2 tbsp (28g)",
    calories: 138,
    protein: 4.7,
    carbs: 12,
    fat: 8.7,
    category: "fat_source",
    tags: ["recovery", "whole_food"],
    muscleAffinities: ["Core"],
  },
  {
    name: "Flaxseeds (ground)",
    servingSize: "2 tbsp (20g)",
    calories: 110,
    protein: 3.8,
    carbs: 6,
    fat: 8.7,
    category: "fat_source",
    tags: ["recovery", "whole_food"],
  },
  {
    name: "Sunflower Seeds",
    servingSize: "28g",
    calories: 163,
    protein: 5.5,
    carbs: 7,
    fat: 14,
    category: "fat_source",
    tags: ["whole_food", "recovery"],
  },
  {
    name: "Cashews",
    servingSize: "28g (about 18 nuts)",
    calories: 157,
    protein: 5.2,
    carbs: 9,
    fat: 12,
    category: "fat_source",
    tags: ["muscle_building", "whole_food"],
  },
  {
    name: "Mixed Nuts",
    servingSize: "28g",
    calories: 173,
    protein: 5,
    carbs: 6,
    fat: 16,
    category: "fat_source",
    tags: ["recovery", "whole_food", "low_carb"],
  },
  {
    name: "Dark Chocolate (70%+)",
    servingSize: "28g (2 squares)",
    calories: 155,
    protein: 2.2,
    carbs: 14,
    fat: 11,
    category: "fat_source",
    tags: ["recovery"],
  },
  // ── Vegetables ────────────────────────────────────────────────────────────────
  {
    name: "Broccoli (cooked)",
    servingSize: "1 cup (91g)",
    calories: 31,
    protein: 2.6,
    carbs: 6,
    fat: 0.3,
    category: "vegetable",
    tags: ["fat_loss", "recovery", "whole_food", "low_carb"],
    muscleAffinities: ["Core", "Chest"],
  },
  {
    name: "Spinach (raw)",
    servingSize: "2 cups (60g)",
    calories: 14,
    protein: 1.7,
    carbs: 2,
    fat: 0.2,
    category: "vegetable",
    tags: ["fat_loss", "recovery", "whole_food", "low_carb"],
    muscleAffinities: ["Back", "Shoulders", "Core"],
  },
  {
    name: "Kale (cooked)",
    servingSize: "1 cup (130g)",
    calories: 36,
    protein: 2.5,
    carbs: 7,
    fat: 0.5,
    category: "vegetable",
    tags: ["fat_loss", "recovery", "whole_food", "low_carb"],
    muscleAffinities: ["Core"],
  },
  {
    name: "Cucumber (sliced)",
    servingSize: "1 cup (119g)",
    calories: 16,
    protein: 0.7,
    carbs: 3.8,
    fat: 0.1,
    category: "vegetable",
    tags: ["fat_loss", "whole_food", "low_carb"],
  },
  {
    name: "Bell Pepper (red)",
    servingSize: "1 medium (119g)",
    calories: 37,
    protein: 1.2,
    carbs: 9,
    fat: 0.3,
    category: "vegetable",
    tags: ["fat_loss", "recovery", "whole_food"],
  },
  {
    name: "Asparagus (cooked)",
    servingSize: "1 cup (180g)",
    calories: 40,
    protein: 4.3,
    carbs: 7.5,
    fat: 0.4,
    category: "vegetable",
    tags: ["fat_loss", "recovery", "whole_food", "low_carb"],
    muscleAffinities: ["Glutes", "Hamstrings"],
  },
  {
    name: "Green Beans (cooked)",
    servingSize: "1 cup (125g)",
    calories: 44,
    protein: 2.4,
    carbs: 10,
    fat: 0.4,
    category: "vegetable",
    tags: ["fat_loss", "whole_food", "low_carb"],
  },
  {
    name: "Zucchini (cooked)",
    servingSize: "1 cup (124g)",
    calories: 27,
    protein: 2,
    carbs: 5,
    fat: 0.5,
    category: "vegetable",
    tags: ["fat_loss", "whole_food", "low_carb"],
  },
  {
    name: "Cauliflower (roasted)",
    servingSize: "1 cup (107g)",
    calories: 40,
    protein: 3,
    carbs: 8,
    fat: 0.3,
    category: "vegetable",
    tags: ["fat_loss", "whole_food", "low_carb"],
  },
  {
    name: "Brussels Sprouts (cooked)",
    servingSize: "1 cup (156g)",
    calories: 56,
    protein: 4,
    carbs: 11,
    fat: 0.8,
    category: "vegetable",
    tags: ["fat_loss", "recovery", "whole_food"],
    muscleAffinities: ["Core"],
  },
  {
    name: "Carrots (raw)",
    servingSize: "1 medium (61g)",
    calories: 25,
    protein: 0.6,
    carbs: 6,
    fat: 0.1,
    category: "vegetable",
    tags: ["fat_loss", "whole_food"],
  },
  {
    name: "Celery (raw)",
    servingSize: "2 stalks (80g)",
    calories: 13,
    protein: 0.6,
    carbs: 3,
    fat: 0.1,
    category: "vegetable",
    tags: ["fat_loss", "low_carb"],
  },
  {
    name: "Cherry Tomatoes",
    servingSize: "1 cup (149g)",
    calories: 27,
    protein: 1.3,
    carbs: 6,
    fat: 0.3,
    category: "vegetable",
    tags: ["fat_loss", "whole_food"],
  },
  {
    name: "Mushrooms (sautéed)",
    servingSize: "1 cup (156g)",
    calories: 43,
    protein: 3,
    carbs: 8,
    fat: 0.7,
    category: "vegetable",
    tags: ["fat_loss", "whole_food", "low_carb"],
    muscleAffinities: ["Back"],
  },
  {
    name: "Onion (cooked)",
    servingSize: "½ cup (105g)",
    calories: 46,
    protein: 1,
    carbs: 11,
    fat: 0.2,
    category: "vegetable",
    tags: ["whole_food"],
  },
  // ── Dairy ─────────────────────────────────────────────────────────────────────
  {
    name: "Milk (2%)",
    servingSize: "1 cup (244ml)",
    calories: 122,
    protein: 8.1,
    carbs: 11.7,
    fat: 4.8,
    category: "dairy",
    tags: ["muscle_building", "whole_food", "recovery"],
  },
  {
    name: "Low-Fat Cheddar Cheese",
    servingSize: "28g (1 slice)",
    calories: 49,
    protein: 7,
    carbs: 0.5,
    fat: 2,
    category: "dairy",
    tags: ["high_protein", "low_carb"],
  },
  {
    name: "Mozzarella (part-skim)",
    servingSize: "28g",
    calories: 72,
    protein: 7,
    carbs: 0.8,
    fat: 4.5,
    category: "dairy",
    tags: ["muscle_building", "low_carb"],
  },
  {
    name: "Greek Yogurt (full-fat)",
    servingSize: "170g",
    calories: 170,
    protein: 15,
    carbs: 7,
    fat: 9,
    category: "dairy",
    tags: ["muscle_building", "recovery", "post_workout"],
    muscleAffinities: ["Biceps", "Triceps"],
  },
  {
    name: "String Cheese",
    servingSize: "1 stick (28g)",
    calories: 80,
    protein: 7,
    carbs: 0,
    fat: 5,
    category: "dairy",
    tags: ["high_protein", "low_carb"],
  },
  {
    name: "Low-Fat Yogurt",
    servingSize: "170g",
    calories: 100,
    protein: 8,
    carbs: 14,
    fat: 2,
    category: "dairy",
    tags: ["recovery"],
  },
  // ── Pre/Post Workout Snacks ───────────────────────────────────────────────────
  {
    name: "Banana with Peanut Butter",
    servingSize: "1 banana + 1 tbsp PB",
    calories: 200,
    protein: 5,
    carbs: 30,
    fat: 8,
    category: "snack",
    tags: ["pre_workout", "post_workout", "muscle_building"],
    muscleAffinities: ["Quads", "Glutes"],
  },
  {
    name: "Protein Shake (whey + milk)",
    servingSize: "1 shake (350ml)",
    calories: 242,
    protein: 32,
    carbs: 15,
    fat: 6,
    category: "snack",
    tags: ["muscle_building", "high_protein", "post_workout", "recovery"],
    muscleAffinities: [
      "Chest",
      "Back",
      "Shoulders",
      "Biceps",
      "Triceps",
      "Quads",
    ],
  },
  {
    name: "Rice Cake with Almond Butter",
    servingSize: "2 cakes + 1 tbsp AB",
    calories: 168,
    protein: 5,
    carbs: 18,
    fat: 9,
    category: "snack",
    tags: ["pre_workout", "whole_food"],
  },
  {
    name: "Granola Bar (whole grain)",
    servingSize: "1 bar (47g)",
    calories: 190,
    protein: 4,
    carbs: 30,
    fat: 7,
    category: "snack",
    tags: ["pre_workout"],
  },
  {
    name: "Overnight Oats with Berries",
    servingSize: "1 jar (300g)",
    calories: 310,
    protein: 13,
    carbs: 50,
    fat: 7,
    category: "snack",
    tags: ["muscle_building", "whole_food", "pre_workout"],
    muscleAffinities: ["Core"],
  },
  {
    name: "Hummus with Veggies",
    servingSize: "¼ cup hummus + 1 cup veggies",
    calories: 140,
    protein: 6,
    carbs: 16,
    fat: 7,
    category: "snack",
    tags: ["fat_loss", "whole_food"],
  },
  {
    name: "Apple with Almond Butter",
    servingSize: "1 apple + 1 tbsp AB",
    calories: 193,
    protein: 3.5,
    carbs: 29,
    fat: 9,
    category: "snack",
    tags: ["fat_loss", "pre_workout", "whole_food"],
  },
  {
    name: "Trail Mix (nuts & dried fruit)",
    servingSize: "28g",
    calories: 130,
    protein: 3.5,
    carbs: 13,
    fat: 8,
    category: "snack",
    tags: ["pre_workout", "recovery"],
  },
];

// ── Seeded pseudo-random (deterministic per call) ──────────────────────────────
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN<T>(arr: T[], n: number, seed: number): T[] {
  return seededShuffle(arr, seed).slice(0, n);
}

function buildMeal(
  mealName: string,
  foods: FoodItem[],
  targetCalories: number,
): MealSuggestion {
  // Distribute target evenly, then scale each food proportionally
  const perFood = targetCalories / foods.length;
  const entries = foods.map((food) => {
    const scale = Math.max(
      0.5,
      Math.min(2.5, perFood / (food.calories || 100)),
    );
    const adj = (v: number) => Math.round(v * scale * 10) / 10;
    const scaledCal = Math.round(food.calories * scale);
    return {
      food,
      amount: `${Math.round(scale * 100)}% serving`,
      adjustedCalories: scaledCal,
      adjustedProtein: adj(food.protein),
      adjustedCarbs: adj(food.carbs),
      adjustedFat: adj(food.fat),
    };
  });
  return {
    mealName,
    foods: entries,
    totalCalories: entries.reduce((s, e) => s + e.adjustedCalories, 0),
    totalProtein: entries.reduce((s, e) => s + e.adjustedProtein, 0),
    totalCarbs: entries.reduce((s, e) => s + e.adjustedCarbs, 0),
    totalFat: entries.reduce((s, e) => s + e.adjustedFat, 0),
  };
}

export function selectMealsFromDataset(
  activatedMuscles: string[],
  intensity: "Low" | "Moderate" | "High",
  goal: "Build Muscle" | "Lose Weight" | "Maintain Fitness",
  targetCalories: number,
  _proteinTarget: number,
): MealPlan {
  const seed = Date.now();

  const proteins = NUTRITION_DB.filter(
    (f) => f.category === "protein_source" || f.category === "dairy",
  );
  const carbs = NUTRITION_DB.filter(
    (f) => f.category === "carb_source" || f.category === "fruit",
  );
  const fats = NUTRITION_DB.filter((f) => f.category === "fat_source");
  const vegs = NUTRITION_DB.filter((f) => f.category === "vegetable");
  const snacks = NUTRITION_DB.filter((f) => f.category === "snack");

  // Filter by goal & intensity tags
  const goalTag =
    goal === "Build Muscle"
      ? "muscle_building"
      : goal === "Lose Weight"
        ? "fat_loss"
        : null;
  const intensitySnackTag =
    intensity === "High" ? "post_workout" : "pre_workout";

  const filteredProteins = goalTag
    ? proteins.filter(
        (f) =>
          f.tags.includes(goalTag as never) || f.tags.includes("high_protein"),
      )
    : proteins;

  const filteredCarbs =
    goal === "Lose Weight"
      ? carbs.filter(
          (f) =>
            f.tags.includes("low_carb") ||
            f.tags.includes("fat_loss") ||
            f.calories < 100,
        )
      : carbs;

  // Calorie split across 5 meals
  // Breakfast 25%, Pre-workout 10%, Post-workout 25%, Lunch 25%, Dinner 15%
  const splits = [0.25, 0.1, 0.25, 0.25, 0.15];
  const mealTargets = splits.map((s) => Math.round(targetCalories * s));

  // Breakfast: protein + carb + fat
  const bfProtein = pickN(filteredProteins, 1, seed ^ 0x1);
  const bfCarb = pickN(
    filteredCarbs.length > 0 ? filteredCarbs : carbs,
    1,
    seed ^ 0x2,
  );
  const bfFat = pickN(fats, 1, seed ^ 0x3);
  const breakfast = buildMeal(
    "🌅 Breakfast",
    [...bfProtein, ...bfCarb, ...bfFat],
    mealTargets[0],
  );

  // Pre-workout snack
  const preSnacks = snacks.filter(
    (f) => f.tags.includes("pre_workout") || f.tags.includes(intensitySnackTag),
  );
  const preFood = pickN(
    preSnacks.length > 0 ? preSnacks : snacks,
    1,
    seed ^ 0x4,
  );
  const preWorkout = buildMeal("⚡ Pre-Workout Snack", preFood, mealTargets[1]);

  // Post-workout: high protein focus
  const postProteins = filteredProteins
    .filter(
      (f) => f.tags.includes("post_workout") || f.tags.includes("high_protein"),
    )
    .concat(filteredProteins);
  const uniquePost = [
    ...new Map(postProteins.map((f) => [f.name, f])).values(),
  ];
  const pwProtein = pickN(uniquePost, 2, seed ^ 0x5);
  const pwCarb =
    goal !== "Lose Weight"
      ? pickN(filteredCarbs.length > 0 ? filteredCarbs : carbs, 1, seed ^ 0x6)
      : [];
  const postWorkout = buildMeal(
    "🏋️ Post-Workout Meal",
    [...pwProtein, ...pwCarb],
    mealTargets[2],
  );

  // Lunch: protein + veg + carb
  const lunchProtein = pickN(filteredProteins, 1, seed ^ 0x7);
  const lunchVeg = pickN(vegs, 2, seed ^ 0x8);
  const lunchCarb =
    goal !== "Lose Weight"
      ? pickN(filteredCarbs.length > 0 ? filteredCarbs : carbs, 1, seed ^ 0x9)
      : [];
  const lunch = buildMeal(
    "🥗 Lunch",
    [...lunchProtein, ...lunchVeg, ...lunchCarb],
    mealTargets[3],
  );

  // Dinner: protein + veg + fat
  const dinnerProtein = pickN(filteredProteins, 1, seed ^ 0xa);
  const dinnerVeg = pickN(vegs, 2, seed ^ 0xb);
  const dinnerFat = goal !== "Build Muscle" ? [] : pickN(fats, 1, seed ^ 0xc);
  const dinner = buildMeal(
    "🌙 Dinner",
    [...dinnerProtein, ...dinnerVeg, ...dinnerFat],
    mealTargets[4],
  );

  const meals = [breakfast, preWorkout, postWorkout, lunch, dinner];

  // Recovery foods: match activated muscles
  const recoveryPool = NUTRITION_DB.filter(
    (f) =>
      f.muscleAffinities?.some((m) => activatedMuscles.includes(m)) &&
      f.tags.includes("recovery"),
  );
  const fallback = NUTRITION_DB.filter((f) => f.tags.includes("recovery"));
  const recoveryFoods = pickN(
    recoveryPool.length >= 2 ? recoveryPool : fallback,
    3,
    seed ^ 0xd,
  );

  const dailyTotals = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.totalCalories,
      protein: Math.round((acc.protein + m.totalProtein) * 10) / 10,
      carbs: Math.round((acc.carbs + m.totalCarbs) * 10) / 10,
      fat: Math.round((acc.fat + m.totalFat) * 10) / 10,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  return { meals, dailyTotals, recoveryFoods };
}

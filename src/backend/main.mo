import Float "mo:base/Float";
import Int "mo:base/Int";
import Array "mo:base/Array";

actor {

  public type EMGRecord = {
    emg : Nat;
    activity : Text;
    calories : Nat;
    protein : Nat;
    carbs : Nat;
    water : Float;
    recommendation : Text;
  };

  let dataset : [EMGRecord] = [
    { emg = 100; activity = "rest"; calories = 140; protein = 40; carbs = 150; water = 2.0; recommendation = "Increase calorie intake and light meals" },
    { emg = 120; activity = "rest"; calories = 150; protein = 42; carbs = 155; water = 2.0; recommendation = "Maintain basic nutrition and hydration" },
    { emg = 150; activity = "rest"; calories = 160; protein = 45; carbs = 160; water = 2.0; recommendation = "Light diet with balanced nutrients" },
    { emg = 180; activity = "rest"; calories = 170; protein = 48; carbs = 165; water = 2.1; recommendation = "Add fruits and protein snacks" },
    { emg = 200; activity = "low"; calories = 200; protein = 55; carbs = 180; water = 2.2; recommendation = "Increase protein intake slightly" },
    { emg = 230; activity = "low"; calories = 220; protein = 60; carbs = 190; water = 2.3; recommendation = "Balanced diet with more carbs" },
    { emg = 260; activity = "low"; calories = 240; protein = 65; carbs = 200; water = 2.3; recommendation = "Add energy-rich foods" },
    { emg = 290; activity = "low"; calories = 260; protein = 70; carbs = 210; water = 2.4; recommendation = "Moderate protein and carbs intake" },
    { emg = 300; activity = "moderate"; calories = 280; protein = 75; carbs = 220; water = 2.5; recommendation = "Balanced diet with proteins and vegetables" },
    { emg = 330; activity = "moderate"; calories = 300; protein = 80; carbs = 230; water = 2.5; recommendation = "Include protein-rich foods" },
    { emg = 360; activity = "moderate"; calories = 320; protein = 85; carbs = 240; water = 2.6; recommendation = "Maintain balanced diet and hydration" },
    { emg = 390; activity = "moderate"; calories = 340; protein = 90; carbs = 250; water = 2.6; recommendation = "Add lean protein and whole grains" },
    { emg = 420; activity = "moderate"; calories = 360; protein = 95; carbs = 260; water = 2.7; recommendation = "Increase protein intake moderately" },
    { emg = 450; activity = "moderate"; calories = 380; protein = 100; carbs = 270; water = 2.8; recommendation = "Protein + carb balanced diet" },
    { emg = 480; activity = "moderate"; calories = 400; protein = 105; carbs = 280; water = 2.8; recommendation = "Add healthy fats and protein" },
    { emg = 500; activity = "intense"; calories = 420; protein = 110; carbs = 290; water = 3.0; recommendation = "High protein diet with hydration" },
    { emg = 530; activity = "intense"; calories = 450; protein = 115; carbs = 300; water = 3.1; recommendation = "Increase protein and electrolyte intake" },
    { emg = 560; activity = "intense"; calories = 480; protein = 120; carbs = 310; water = 3.1; recommendation = "High protein and carb intake" },
    { emg = 590; activity = "intense"; calories = 500; protein = 125; carbs = 320; water = 3.2; recommendation = "Post-workout recovery meals needed" },
    { emg = 620; activity = "intense"; calories = 530; protein = 130; carbs = 330; water = 3.2; recommendation = "Add protein shakes and hydration" },
    { emg = 650; activity = "intense"; calories = 560; protein = 135; carbs = 340; water = 3.3; recommendation = "High protein with recovery foods" },
    { emg = 680; activity = "intense"; calories = 580; protein = 140; carbs = 350; water = 3.3; recommendation = "Include muscle recovery diet" },
    { emg = 710; activity = "intense"; calories = 600; protein = 145; carbs = 360; water = 3.4; recommendation = "Hydration + protein rich diet" },
    { emg = 740; activity = "intense"; calories = 630; protein = 150; carbs = 370; water = 3.4; recommendation = "Post workout nutrition required" },
    { emg = 770; activity = "intense"; calories = 650; protein = 155; carbs = 380; water = 3.5; recommendation = "Increase calorie and protein intake" },
    { emg = 800; activity = "intense"; calories = 680; protein = 160; carbs = 390; water = 3.6; recommendation = "High calorie muscle recovery diet" },
    { emg = 830; activity = "intense"; calories = 700; protein = 165; carbs = 400; water = 3.6; recommendation = "Protein heavy diet with hydration" },
    { emg = 860; activity = "intense"; calories = 720; protein = 170; carbs = 410; water = 3.7; recommendation = "Include electrolytes and protein" },
    { emg = 890; activity = "intense"; calories = 740; protein = 175; carbs = 420; water = 3.7; recommendation = "Muscle gain focused diet" },
    { emg = 920; activity = "intense"; calories = 760; protein = 180; carbs = 430; water = 3.8; recommendation = "High protein + carb loading" },
    { emg = 950; activity = "intense"; calories = 780; protein = 185; carbs = 440; water = 4.0; recommendation = "Recovery and hydration essential" },
    { emg = 980; activity = "intense"; calories = 800; protein = 190; carbs = 450; water = 4.0; recommendation = "High protein recovery meals" },
    { emg = 1000; activity = "intense"; calories = 820; protein = 200; carbs = 470; water = 4.2; recommendation = "Maximum recovery diet with hydration" },
  ];

  public query func getEMGRecommendation(emgValue : Nat) : async EMGRecord {
    var bestRecord = dataset[0];
    var bestDiff : Int = Int.abs((dataset[0].emg : Nat) - emgValue : Int);
    for (record in dataset.vals()) {
      let diff : Int = Int.abs((record.emg : Nat) - emgValue : Int);
      if (diff < bestDiff) {
        bestDiff := diff;
        bestRecord := record;
      };
    };
    bestRecord
  };

  public query func getEMGDataset() : async [EMGRecord] {
    dataset
  };

};

export const Url = {
  EMBLEM_API:
    "https://h991n8hmi8.execute-api.ap-southeast-1.amazonaws.com/serverless_lambda_saws_apigatewayv2_stage/puep/emblems",
  IMAGES_BUCKET: "https://d385ls41y80ogs.cloudfront.net",
};

export const primaryFocusOptions = [
  { value: "hp1", label: "HP" },
  { value: "attack1", label: "Attack" },
  { value: "special_attack1", label: "Special Attack" },
  { value: "defense1", label: "Defense" },
  { value: "special_defense1", label: "Special Defense" },
  { value: "movement_speed1", label: "Movement Speed" },
  { value: "critical_rate1", label: "Critical Hit Rate" },
  { value: "cooldown_rate1", label: "Cooldown Rate" },
];

export const secondaryFocusOptions = [
  { value: "hp2", label: "HP" },
  { value: "attack2", label: "Attack" },
  { value: "special_attack2", label: "Special Attack" },
  { value: "defense2", label: "Defense" },
  { value: "special_defense2", label: "Special Defense" },
  { value: "movement_speed2", label: "Movement Speed" },
  { value: "critical_rate2", label: "Critical Hit Rate" },
  { value: "cooldown_rate2", label: "Cooldown Rate" },
];

export const emblemsContainer = [
  { order: 0, rotateDegree: 0 },
  { order: 1, rotateDegree: 36 },
  { order: 2, rotateDegree: 72 },
  { order: 3, rotateDegree: 108 },
  { order: 4, rotateDegree: 144 },
  { order: 5, rotateDegree: 180 },
  { order: 6, rotateDegree: 216 },
  { order: 7, rotateDegree: 252 },
  { order: 8, rotateDegree: 288 },
  { order: 9, rotateDegree: 324 },
];

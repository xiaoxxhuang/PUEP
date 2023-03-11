export const Url = {
  API: "https://h991n8hmi8.execute-api.ap-southeast-1.amazonaws.com/serverless_lambda_saws_apigatewayv2_stage/puep/",
  IMAGES_BUCKET: "https://d385ls41y80ogs.cloudfront.net/",
};

export const Proxy = {
  EMBLEMS: "emblems",
  POKEMONS: "pokemons",
};

export const focusOptions = [
  { value: "hp", label: "HP" },
  { value: "attack", label: "Attack" },
  { value: "special_attack", label: "Special Attack" },
  { value: "defense", label: "Defense" },
  { value: "special_defense", label: "Special Defense" },
  { value: "movement_speed", label: "Movement Speed" },
  { value: "critical_rate", label: "Critical Hit Rate" },
  { value: "cooldown_rate", label: "Cooldown Rate" },
];

export const emblemsContainerOptions = [
  { order: 0, rotateDegree: 270 },
  { order: 1, rotateDegree: 234 },
  { order: 2, rotateDegree: 198 },
  { order: 3, rotateDegree: 162 },
  { order: 4, rotateDegree: 126 },
  { order: 5, rotateDegree: 90 },
  { order: 6, rotateDegree: 54 },
  { order: 7, rotateDegree: 18 },
  { order: 8, rotateDegree: 342 },
  { order: 9, rotateDegree: 306 },
];

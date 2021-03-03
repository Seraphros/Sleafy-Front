export interface Esp {
  id?: number;
  uuid?: string;
  name?: string;
  secretKey?: string;
  user?: string;
  humiditySensor?: boolean;
  heatSensor?: boolean;
  hygrometry?: boolean;
  watering?: symbol;
  wateringFrequency?: number;
  wateringDuration?: number;
  sleepTime?: number;
}

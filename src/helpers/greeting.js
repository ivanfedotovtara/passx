import { currentTime } from "./dates";

export default function Greeting() {
  const time = Number(currentTime.toString().substring(0, 2));

  if (time < 12) {
    return "Good morning!";
  }

  if (time >= 12 && time <= 18) {
    return "Welcome";
  }

  if (time > 18) {
    return "Good evening";
  }

  console.log(time);
}

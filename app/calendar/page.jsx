import { Calendar } from "@/components/calendar";
import { ThemeProvider } from "@/providers/theme-provider";

export default function Page() {
  return (
    <ThemeProvider>
      <div className="min-h-screen p-4 bg-muted/50 dark:bg-gray-950">
        <Calendar />
      </div>
    </ThemeProvider>
  );
}
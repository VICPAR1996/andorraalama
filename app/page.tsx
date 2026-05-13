import { getAllParishes } from "@/lib/parish";
import { Parish, ParishId } from "@/lib/types";
import { AppShell } from "./AppShell";

export default async function Home() {
  const parishes = await getAllParishes();
  const parishMap = parishes.reduce(
    (acc, p) => ({ ...acc, [p.id]: p }),
    {} as Record<ParishId, Parish>
  );

  return <AppShell parishes={parishMap} />;
}

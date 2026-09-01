import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

type StatsCardsProps = {
  title: string;
  value: number;
};

function StatsCard({ title, value }: StatsCardsProps) {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription className="text-primary mt-[0px!important] text-4xl font-extrabold">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function StatsLoadingCard() {
  return (
    <Card className="h-22 w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-37.5" />
            <Skeleton className="h-4 w-25" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default StatsCard;


import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="itinerary-card hover:translate-y-[-5px] transition-transform duration-300">
      <CardHeader>
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-travel-blue mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

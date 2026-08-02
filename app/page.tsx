import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button>default button</Button>
      <Button variant="outline" size="icon">
        <Camera />
      </Button>
    </div>
  );
}

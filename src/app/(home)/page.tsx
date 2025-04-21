import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  return (
    <section className="container mx-auto p-5">
      <div className="flex flex-col gap-4">
        <div>
          <Button variant="elevated">I'm a f*cking button</Button>
        </div>
        <div>
          <Input placeholder="Enter your name" />
        </div>
        <div>
          <Progress value={33} />
        </div>
        <div>
          <Textarea placeholder="Enter your name" />
        </div>
        <div>
          <Checkbox />
        </div>
      </div>
    </section>
  );
}

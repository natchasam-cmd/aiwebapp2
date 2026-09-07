import { AppHeader } from "./components/AppHeader";
import { DetectionPanel } from "./components/DetectionPanel";
import { FeatureCard } from "./components/FeatureCard";
import { ApiStatus } from "./components/ApiStatus";
export default function Home() {
  return (
    <main>
      <AppHeader />
      <br></br>
      <FeatureCard
        title="Object Detection"
        description="ตรวจจับวัตถุจากรูปภาพด้วย AI"
      />
      <FeatureCard 
      title="AI Chat"
      description="สนทนากับ Generative AI"
      />
      <br></br>

       <DetectionPanel/>
        <ApiStatus/>
        <h1>Opjeect Detection with AI</h1>

    </main>
  );
}

import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{backgroundImage: "url('https://placehold.co/1920x1080.png')",
        backgroundBlendMode: 'overlay'}}
        data-ai-hint="philosophy background"
      />
      <div className="absolute inset-0 bg-background/50" />
      <SignupForm />
    </main>
  );
}

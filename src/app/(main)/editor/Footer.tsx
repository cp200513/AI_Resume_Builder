import { Button } from "@/components/ui/button";
import Link from "next/link";
import BreadCrumbs from "./BreadCrumbs";
import { steps } from "./steps";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (string) => void;
}

const Footer = ({ currentStep, setCurrentStep }: FooterProps) => {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key == currentStep,
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous Step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next Step
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="destructive" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p className="text-muted-foreground text-sm opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

import React from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { PlusSquare } from "lucide-react";

const Resumes = () => {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare size="5" />
          New Resume
        </Link>
      </Button>
    </main>
  );
};

export default Resumes;

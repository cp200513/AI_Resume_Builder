"use client";

import React from "react";
import { Button } from "../../../components/ui/button";

const EditorPage = () => {
  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-6 text-center">
        <h1 className="font-serif text-2xl">Design your Resume</h1>
        <p className="text-muted-foreground text-xs">
          Follow the Steps below to create your Resume | Don't worry your
          progress will be saved automatically
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div className="w-full md:w-1/2">left</div>
          <div className="grow border-r" />
          <div className="hidden w-1/2 md:flex">right</div>
        </div>
      </main>
      <footer className="w-full border-t px-3 py-5">
        <div className="mx-auto flex flex-wrap justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline">Previous Step</Button>
            <Button>Next Step</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="destructive">Close</Button>
            <p className="text-muted-foreground text-sm opacity-0">Saving...</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EditorPage;

import { resumeSchemaType } from "./validation";

export interface EditorFormProps {
  resumeData: resumeSchemaType;
  setResumeData: (data: resumeSchemaType) => void;
}

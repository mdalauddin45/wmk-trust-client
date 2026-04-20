import { Suspense } from "react";
import SuccessPageContent from "./SuccessPageContent";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SuccessPageContent />
    </Suspense>
  );
}
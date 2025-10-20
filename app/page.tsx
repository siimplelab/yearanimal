// This page is a fallback in case middleware doesn't redirect
// In normal operation, middleware should redirect to appropriate language
export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Detecting your language...</p>
    </div>
  );
}
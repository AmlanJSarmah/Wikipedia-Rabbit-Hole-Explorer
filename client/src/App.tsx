import type { MouseEvent } from 'react';
import { Button } from '@/components/ui/button';

function handleButtonClick(
  event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
) {
  console.log('Click Event');
  console.log(event);
}

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1>Hello World!</h1>
      <Button onClick={handleButtonClick}>Click me</Button>
    </div>
  );
}

export default App;

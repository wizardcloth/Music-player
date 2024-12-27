import './App.css'
import { Button } from './components/ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
function App() {
  return (
    <>
      <h1>hello world</h1>
      <header>
        <SignedOut>
          <SignInButton >
            <Button variant={"outline"}>Sign-In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  )
}

export default App

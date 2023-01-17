import { IconButton } from "@material-tailwind/react";
import Image from "next/image";
import { signIn } from "next-auth/react"
import { Button } from "@material-tailwind/react";


function Login() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Image 
            src = "/resources/google-docs-icon.png"
            height = "200"
            width = "550"
            alt="google docs image"
            />

        <Button onClick={signIn}>Sign In / Register using Google</Button>
        </div>
    )

}

export default Login;
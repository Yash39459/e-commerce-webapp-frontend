import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserData } from '@/context/UserContext'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const {loginUser,btnLoading} = UserData()
  const submitHandler = () => {
    loginUser(email,navigate)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm p-4">
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Enter Email To Get OTP
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              If you already received an OTP via email, you can go directly to the OTP tab.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-1">
              <Label className="text-center text-gray-200">Enter Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-center"
                placeholder="example@mail.com"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="w-full" onClick={submitHandler} disabled={btnLoading}>
              {btnLoading ? <Loader/> :"Submit"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Login



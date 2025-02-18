import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartData } from "@/context/CartContext";
import { UserData } from "@/context/UserContext";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const { btnLoading, loginUser,verifyUser } = UserData();

  const {fetchCart} = CartData()

  const submitHandler = () => {
    verifyUser(Number(otp), navigate,fetchCart)
  };

  const [timer, setTimer] = useState(90);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleResendOtp = async() => {
    const email = localStorage.getItem("email")
    await loginUser(email,navigate)
    setTimer(90)
    setCanResend(false)
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm p-4">
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Verify User OTP
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              If you didn't get OTP in your mail inbox then you can check your
              OTP in your mail spam section
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-1">
              <Label className="text-center text-gray-200">Enter OTP</Label>
              <Input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-center"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              className="w-full"
              onClick={submitHandler}
              disabled={btnLoading}
            >
              {btnLoading ? <Loader /> : "Submit"}
            </Button>
          </CardFooter>
          <div className="flex flex-col justify-center items-center w-[200px] m-auto">
            <p className="text-lg mb-3">
                {
                    canResend ? "You can now Resend OTP" : `Time remaining: ${formatTime(timer)}`
                }
            </p>
            <Button onClick={handleResendOtp} className="mb-3" disabled={!canResend}>Resend OTP</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Verify;

import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="mb-6"
      >
        <Ghost className="w-20 h-20 text-primary" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-2 text-4xl font-bold"
      >
        Oops! Page Not Found
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-md mb-8 text-muted-foreground"
      >
        It seems you've wandered into uncharted territory. Let's get you back to
        something familiar.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </motion.div>
    </div>
  );
}

export default NotFound;

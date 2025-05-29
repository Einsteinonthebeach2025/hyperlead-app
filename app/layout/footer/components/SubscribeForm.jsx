"use client";

import Button from "app/components/buttons/Button";
import { useState } from "react";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="w-[300px] relative mb-2">
      <input
        type="text"
        id="email"
        name="email"
        placeholder="enter your email"
        autoComplete="false"
      />
      <Button className="absolute right-0 bottom-0 h-full" >
        Subscribe
      </Button>
    </div>
  );
};

export default SubscribeForm;

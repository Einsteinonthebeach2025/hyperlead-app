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

      <Button className="absolute right-0  top-0" type="submit">
        Subscribe
      </Button>
    </div>
  );
};

export default SubscribeForm;

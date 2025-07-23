import { useUserDetailsStore } from "@/hooks/useUserDetailsStore";
import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import SecretLogin from "./Auth/SecretLogin";

const SECRET_STR = "edith";
const SECRET_MAX_GAP_MS = 750; // press letters quickly
const IGNORE_INPUTS = true; // don't unlock if user is typing in a form

function ContactPage() {
  const { data } = useUserDetailsStore();
  const [secretOpen, setSecretOpen] = useState(false);

  // Typed secret unlock: "edith"
  useEffect(() => {
    let idx = 0;
    let lastTime = 0;

    const handleKey = (e) => {
      if (IGNORE_INPUTS) {
        const tag = e.target.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          e.target.isContentEditable
        ) {
          return;
        }
      }

      if (e.key.length !== 1) return; // ignore control keys
      const char = e.key.toLowerCase();
      const now = Date.now();

      if (idx > 0 && now - lastTime > SECRET_MAX_GAP_MS) {
        idx = 0;
      }

      if (char === SECRET_STR[idx]) {
        idx += 1;
        lastTime = now;
        if (idx === SECRET_STR.length) {
          setSecretOpen(true);
          idx = 0;
        }
      } else {
        if (char === SECRET_STR[0]) {
          idx = 1;
          lastTime = now;
        } else {
          idx = 0;
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Auto-close after 2 minutes
  useEffect(() => {
    if (!secretOpen) return;
    const t = setTimeout(() => setSecretOpen(false), 2 * 60 * 1000);
    return () => clearTimeout(t);
  }, [secretOpen]);

  const socials = [
    {
      name: "GitHub",
      url: data.socials.github,
      icon: <Github className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      url: data.socials.linkedin,
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: "Website",
      url: data.socials.website,
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-8 px-6 py-20 md:px-20">
      <h1 className="text-3xl font-bold text-center text-primary">
        Contact Me
      </h1>
      <p className="max-w-2xl text-center text-muted-foreground">
        I’m always open to discussing new projects, creative ideas, or
        opportunities to be part of your vision. Feel free to reach out using
        the details below.
      </p>

      {/* Contact Details */}
      <div className="w-full max-w-lg space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-primary" />
          <a href={`mailto:${data.email}`} className="hover:underline">
            {data.email}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-primary" />
          <a href={`tel:${data.phone}`} className="hover:underline">
            {data.phone}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary" />
          <span>{data.location}</span>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {socials
          .filter((s) => s.url)
          .map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm transition rounded-full shadow hover:bg-primary hover:text-white"
            >
              {social.icon}
              {social.name}
            </a>
          ))}
      </div>

      {/* Secret Login (controlled, no visible trigger) */}
      <SecretLogin open={secretOpen} onOpenChange={setSecretOpen} hideTrigger />
    </section>
  );
}

export default ContactPage;

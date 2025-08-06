import App from "@/components/App";
import { env } from "@/lib/env";
import { Metadata } from "next";

const appUrl = env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/images/feed.png`,
  button: {
    title: "Launch Calculator",
    action: {
      type: "launch_frame",
      name: "Farcaster Calculator",
      url: appUrl,
      splashImageUrl: `${appUrl}/images/splash.png`,
      splashBackgroundColor: "#ffffff",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Farcaster Calculator",
    description: "A simple calculator mini-app for Farcaster",
    openGraph: {
      title: "Farcaster Calculator",
      description: "A simple calculator mini-app for Farcaster",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <App />;
}

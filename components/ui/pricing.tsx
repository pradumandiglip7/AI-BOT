"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { Briefcase, CheckCheck, Database, Server } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const plans = [
	{
		name: "Free",
		description: "Perfect for traders just getting started with AI signals",
		price: 0,
		yearlyPrice: 0,
		buttonText: "Get started",
		buttonVariant: "outline" as const,
		features: [
			{ text: "5 signals per day", icon: <Briefcase size={20} /> },
			{ text: "Basic indicators", icon: <Database size={20} /> },
			{ text: "Email support", icon: <Server size={20} /> },
		],
		includes: [
			"Free includes:",
			"Community access",
			"Basic analysis",
			"Mobile alerts",
			"1 watchlist",
			"Standard support",
		],
	},
	{
		name: "Premium",
		description:
			"Best for active traders seeking advanced AI analysis and signals",
		price: 49,
		yearlyPrice: 490,
		buttonText: "Get started",
		buttonVariant: "default" as const,
		popular: true,
		features: [
			{ text: "Unlimited signals", icon: <Briefcase size={20} /> },
			{ text: "Advanced AI analysis", icon: <Database size={20} /> },
			{ text: "Priority support", icon: <Server size={20} /> },
		],
		includes: [
			"Everything in Free, plus:",
			"Unlimited signals",
			"Advanced AI engine",
			"Custom alerts",
			"5 watchlists",
			"Priority support",
		],
	},
	{
		name: "Pro",
		description:
			"Advanced plan with enhanced features for professional traders",
		price: 99,
		yearlyPrice: 990,
		buttonText: "Get started",
		buttonVariant: "outline" as const,
		features: [
			{ text: "Everything in Premium", icon: <Briefcase size={20} /> },
			{ text: "1-on-1 strategy calls", icon: <Database size={20} /> },
			{ text: "API access", icon: <Server size={20} /> },
		],
		includes: [
			"Everything in Premium, plus:",
			"Portfolio management",
			"API access",
			"White-label options",
			"Unlimited watchlists",
			"24/7 phone support",
		],
	},
];

const PricingSwitch = ({
	onSwitch,
	className,
}: {
	onSwitch: (value: string) => void;
	className?: string;
}) => {
	const [selected, setSelected] = useState("0");

	const handleSwitch = (value: string) => {
		setSelected(value);
		onSwitch(value);
	};

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="relative z-10 mx-auto flex w-fit rounded-xl bg-neutral-50 border border-gray-200 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit cursor-pointer h-12 rounded-xl sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors sm:text-base text-sm",
            selected === "0"
              ? "text-white"
              : "text-muted-foreground hover:text-black",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0  h-12 w-full rounded-xl border-4 shadow-sm shadow-primary border-primary bg-gradient-to-t from-primary via-primary to-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly Billing</span>
        </button>

				<button
					onClick={() => handleSwitch("1")}
					className={cn(
						"relative z-10 w-fit cursor-pointer h-12 flex-shrink-0 rounded-xl sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors sm:text-base text-sm",
						selected === "1"
							? "text-white"
							: "text-muted-foreground hover:text-black",
					)}
				>
					{selected === "1" && (
						<motion.span
							layoutId={"switch"}
							className="absolute top-0 left-0  h-12 w-full rounded-xl border-4 shadow-sm shadow-primary border-primary bg-gradient-to-t from-primary via-primary to-primary"
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
						/>
					)}
					<span className="relative flex items-center gap-2">
						Yearly Billing
						<span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
							Save 20%
						</span>
					</span>
				</button>
			</div>
		</div>
	);
};

export default function PricingSection() {
	const [isYearly, setIsYearly] = useState(false);
	const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div
      className="px-4 pt-20 pb-20 min-h-screen max-w-7xl mx-auto relative"
      ref={pricingRef}
    >
      <article className="text mb-6 space-y-4 max-w-2xl">
        <h2 className="md:text-5xl text-4xl capitalize font-medium text-white mb-4">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-start"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Simple, Transparent Pricing
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          customVariants={revealVariants}
          className="md:text-base text-sm text-gray-400 w-[80%]"
        >
          Choose the plan that fits your trading needs
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} className="w-fit" />
        </TimelineContent>
      </article>

      <div className="grid md:grid-cols-3 gap-4 py-6">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            customVariants={revealVariants}
          >
            <Card
              className={`relative border border-gray-700 ${
                plan.popular
                  ? "ring-2 ring-primary bg-gradient-to-br from-gray-900/90 via-gray-800/60 to-gray-900/90"
                  : "bg-gradient-to-br from-gray-900/90 via-gray-800/60 to-gray-900/90"
              }`}
            >
              <CardHeader className="text-left ">
                <div className="flex justify-between">
                  <h3 className="xl:text-3xl md:text-2xl text-3xl font-semibold text-white mb-2">
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <div className="">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popular
                      </span>
                    </div>
                  )}
                </div>
                <p className="xl:text-sm md:text-xs text-sm text-gray-400 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold text-white">
                    $
                    <NumberFlow
                      format={{
                        currency: "USD",
                      }}
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-4xl font-semibold"
                    />
                  </span>
                  <span className="text-gray-400 ml-1">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <button
                  className={`w-full mb-6 p-4 text-xl rounded-xl ${
                    plan.popular
                      ? "bg-gradient-to-t from-primary to-primary shadow-lg shadow-primary/50 border border-primary text-white"
                      : "bg-gradient-to-t from-gray-700 to-gray-600 shadow-lg shadow-gray-700/50 border border-gray-600 text-white hover:from-gray-600 hover:to-gray-500"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-3 pt-4 border-t border-gray-700">
                  <h2 className="text-xl font-semibold uppercase text-white mb-3">
                    Features
                  </h2>
                  <h4 className="font-medium text-base text-gray-300 mb-3">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2 font-semibold">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="h-6 w-6 bg-white/10 border border-primary rounded-full grid place-content-center mt-0.5 mr-3">
                          <CheckCheck className="h-4 w-4 text-primary" />
                        </span>
                        <span className="text-sm text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}

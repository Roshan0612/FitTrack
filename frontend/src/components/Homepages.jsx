import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/Auth';
import handleSubscribe from '../pages/User/HandleSubscribe';

import {
  ArrowRight,
  Award,
  ChevronDown,
  Dumbbell,
  Flame,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';

import IntroAnimation from '../components/IntroAnimation/IntroAnimation';

import './HomePage.css';

const API_URL = import.meta.env.VITE_API_URL;

const heroStats = [
  { value: '18K+', label: 'Members trained' },
  { value: '4.2M', label: 'Calories burned' },
  { value: '120+', label: 'Training programs' },
  { value: '94%', label: 'Success rate' },
];

const featureCards = [
  {
    icon: Dumbbell,
    title: 'Elite coaching',
    text: 'A premium interface for workouts, diets, and progress tracking without visual clutter.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure member portal',
    text: 'Protected flows remain untouched while the experience around them feels dramatically more polished.',
  },
  {
    icon: Zap,
    title: 'High-performance UI',
    text: 'Motion and spacing are used intentionally so the interface feels expensive, not noisy.',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Transformation member',
    quote:
      'FitTrack now feels like a commercial fitness product. The new interface makes it easier to trust and use every day.',
  },
  {
    name: 'Rahul Mehta',
    role: 'Performance athlete',
    quote:
      'The layout is calmer, more premium, and much easier to scan. It finally has the feel of a serious SaaS product.',
  },
  {
    name: 'Ayesha Khan',
    role: 'Nutrition-focused member',
    quote:
      'Everything feels intentionally designed instead of assembled from defaults. The visual hierarchy is the biggest upgrade.',
  },
];

const Homepages = () => {
  const [introComplete, setIntroComplete] = useState(false);

  const [plans, setPlans] = useState([]);
  const [auth] = useAuth();
  const [couponCodes, setCouponCodes] = useState({});
  const [discountedPrices, setDiscountedPrices] = useState({});
  const [showCouponField, setShowCouponField] = useState({});

  const isAuthenticated = Boolean(auth?.user);

  const primaryButtonClass =
    'inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-300/20 bg-gradient-to-r from-emerald-300 via-emerald-400 to-lime-300 px-6 text-sm font-semibold !text-zinc-950 shadow-[0_18px_40px_rgba(16,185,129,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(16,185,129,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070b]';

  const secondaryButtonClass =
    'inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/6 px-6 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_18px_40px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070b]';

  const premiumPlanCards = useMemo(
    () =>
      plans.map((plan, index) => ({
        ...plan,
        featured: index === 1,
        currentPrice: discountedPrices[plan._id] || plan.price,
      })),
    [plans, discountedPrices]
  );

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/v1/subscription/subscriptions`
        );

        setPlans(res.data);
      } catch (err) {
        console.error('Failed to fetch plans', err);
      }
    };

    fetchPlans();
  }, []);

  const applyCoupon = async (planId, planPrice) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/subscription/apply-coupon`,
        {
          code: couponCodes[planId],
          amount: planPrice,
        }
      );

      const newPrice = res.data.newPrice;

      setDiscountedPrices((prev) => ({
        ...prev,
        [planId]: newPrice,
      }));

      setShowCouponField((prev) => ({
        ...prev,
        [planId]: false,
      }));
    } catch (err) {
      console.error('Invalid coupon or error applying:', err);

      setDiscountedPrices((prev) => ({
        ...prev,
        [planId]: planPrice,
      }));
    }
  };

  return (
    <>
      {/* =====================================================
          CINEMATIC INTRO
          ===================================================== */}

      {!introComplete && (
        <IntroAnimation
          onComplete={() => setIntroComplete(true)}
        />
      )}

      {/* =====================================================
          MAIN WEBSITE
          ===================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: introComplete ? 1 : 0,
        }}
        transition={{
          duration: 0.55,
          ease: 'easeOut',
        }}
      >
        <div className="home-shell overflow-hidden text-white">

          {/* =====================================================
              HERO
              ===================================================== */}

          <section
            id="home"
            className="hero-section relative isolate overflow-hidden"
          >
            <div className="hero-grid" />

            <div className="hero-glow hero-glow-left" />
            <div className="hero-glow hero-glow-right" />

            <div
              className="
                mx-auto
                grid
                min-h-[100svh]
                w-full
                max-w-7xl
                items-center
                gap-14
                px-4
                py-16
                sm:px-6
                lg:grid-cols-[1.05fr_0.95fr]
                lg:px-8
                lg:py-20
              "
            >

              {/* HERO CONTENT */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: introComplete ? 1 : 0,
                  y: introComplete ? 0 : 24,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                className="relative z-10 max-w-3xl"
              >
                <div className="inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/6 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-white/72 backdrop-blur-xl">
                  <Sparkles className="mr-2 size-3.5 shrink-0 text-emerald-300" />

                  <span>
                    Premium fitness operating system
                  </span>
                </div>

                <div className="mt-6 space-y-6">
                  <p className="text-sm font-medium uppercase tracking-[0.34em] text-white/40">
                    Built for serious performance
                  </p>

                  <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl xl:text-[5.8rem]">
                    <span className="block">
                      Train with the precision
                    </span>

                    <span className="block bg-gradient-to-r from-white via-emerald-200 to-lime-300 bg-clip-text text-transparent">
                      of a luxury product.
                    </span>
                  </h1>

                  <p className="max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
                    FitTrack combines elite coaching, subscription management,
                    and member tracking in one refined interface designed to feel
                    premium from the first second.
                  </p>
                </div>

                {/* HERO BUTTONS */}

                <div className="hero-buttons mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/auth/signup"
                    className={`${primaryButtonClass} w-full sm:w-auto`}
                  >
                    Join now

                    <ArrowRight className="ml-2 size-4" />
                  </Link>

                  <a
                    href="#plans"
                    className={`${secondaryButtonClass} w-full sm:w-auto`}
                  >
                    Explore plans
                  </a>
                </div>

                {/* HERO STATS */}

                <div className="hero-stats mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
                  {heroStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{
                        opacity: 0,
                        y: 18,
                      }}
                      animate={{
                        opacity: introComplete ? 1 : 0,
                        y: introComplete ? 0 : 18,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.12 * index,
                      }}
                      className="min-w-0 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                    >
                      <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                        {stat.label}
                      </p>

                      <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>


              {/* HERO VISUAL */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: 24,
                }}
                animate={{
                  opacity: introComplete ? 1 : 0,
                  scale: introComplete ? 1 : 0.96,
                  y: introComplete ? 0 : 24,
                }}
                transition={{
                  duration: 0.9,
                  ease: 'easeOut',
                  delay: 0.12,
                }}
                className="relative mx-auto w-full max-w-xl"
              >

                {/* MAIN IMAGE */}

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="
                    hero-image-frame
                    relative
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-white/12
                    bg-white/5
                    p-3
                    shadow-[0_30px_120px_rgba(0,0,0,0.55)]
                    backdrop-blur-2xl
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-emerald-400/10" />

                  <img
                    src="https://res.cloudinary.com/dswa5docr/image/upload/v1750357874/pexels-tima-miroshnichenko-5327534_rn9paw.jpg"
                    alt="Athlete training in a premium fitness environment"
                    className="
                      relative
                      h-[34rem]
                      w-full
                      rounded-[1.6rem]
                      object-cover
                      object-center
                    "
                    loading="eager"
                  />

                  <div className="absolute inset-0 rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(7,10,16,0.05)_0%,rgba(7,10,16,0.46)_55%,rgba(7,10,16,0.92)_100%)]" />
                </motion.div>


                {/* CALORIES CARD */}

                <motion.div
                  className="
                    hero-calories-card
                    absolute
                    left-0
                    top-8
                    w-44
                    rounded-3xl
                    border
                    border-white/10
                    bg-zinc-950/75
                    p-4
                    shadow-2xl
                    backdrop-blur-xl
                  "
                  initial={{
                    opacity: 0,
                    x: -24,
                  }}
                  animate={{
                    opacity: introComplete ? 1 : 0,
                    x: introComplete ? 0 : -24,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                  }}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/40">
                    <span>Today</span>

                    <Flame className="size-4 text-emerald-300" />
                  </div>

                  <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                    1,248
                  </p>

                  <p className="text-sm text-white/60">
                    calories burned
                  </p>
                </motion.div>


                {/* COACH FEEDBACK CARD */}

                <motion.div
                  className="
                    hero-coach-card
                    absolute
                    -right-2
                    bottom-12
                    w-52
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/8
                    p-4
                    shadow-2xl
                    backdrop-blur-xl
                  "
                  initial={{
                    opacity: 0,
                    x: 24,
                  }}
                  animate={{
                    opacity: introComplete ? 1 : 0,
                    x: introComplete ? 0 : 24,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.42,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm font-semibold text-white">
                      FT
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">
                        Coach feedback
                      </p>

                      <p className="text-xs text-white/55">
                        96% member satisfaction
                      </p>
                    </div>
                  </div>

                  <div className="my-3 h-px w-full bg-white/10" />

                  <div className="flex items-center gap-1 text-amber-300">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="size-3.5 fill-current"
                      />
                    ))}
                  </div>
                </motion.div>


                {/* SCROLL INDICATOR */}

                <motion.div
                  className="
                    hero-scroll-indicator
                    absolute
                    -bottom-6
                    left-1/2
                    flex
                    -translate-x-1/2
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-white/6
                    px-4
                    py-2
                    text-xs
                    uppercase
                    tracking-[0.28em]
                    text-white/65
                    backdrop-blur-xl
                  "
                  animate={{
                    y: [0, 6, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ChevronDown className="size-4 text-emerald-300" />

                  <span>Scroll for more</span>
                </motion.div>
              </motion.div>
            </div>
          </section>


          {/* =====================================================
              ABOUT
              ===================================================== */}

          <section
            id="about"
            className="section-shell border-b border-white/10 px-4 py-24 sm:px-6 lg:px-8"
          >
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

              <div className="max-w-xl">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/65">
                  About FitTrack
                </div>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                  Designed like a premium product, built for real training
                  outcomes.
                </h2>

                <p className="mt-5 max-w-xl text-base leading-8 text-white/66 sm:text-lg">
                  This redesign turns the old brochure-style layout into a
                  polished system with clearer hierarchy, stronger contrast,
                  and more deliberate motion.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {featureCards.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6 text-white shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl"
                  >
                    <item.icon className="size-5 text-emerald-300" />

                    <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/62">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* =====================================================
              PLANS
              ===================================================== */}

          <section
            id="plans"
            className="section-shell border-b border-white/10 px-4 py-24 sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-7xl">

              <div className="mx-auto max-w-2xl text-center">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/65">
                  Membership plans
                </div>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                  Pricing that feels like a premium membership, not a checkout
                  form.
                </h2>

                <p className="mt-5 text-base leading-8 text-white/66 sm:text-lg">
                  The subscription flow remains exactly the same. Only the
                  presentation is upgraded to feel more deliberate and
                  commercially polished.
                </p>
              </div>


          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {premiumPlanCards.map((plan) => (
              <div
                key={plan._id}
                className={`relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? 'ring-1 ring-emerald-400/35'
                    : ''
                }`}
              >

                    {plan.featured && (
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
                    )}

                <div className="p-6">

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">
                          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/75">
                            {plan.duration}
                          </div>

                          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                            {plan.name}
                          </h3>
                        </div>

                        {plan.featured && (
                          <div className="shrink-0 inline-flex items-center rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-emerald-200">
                            Recommended
                          </div>
                        )}
                      </div>


                      <div className="mt-8">

                        {discountedPrices[plan._id] &&
                        discountedPrices[plan._id] !== plan.price ? (
                          <div>
                            <p className="text-sm text-white/40 line-through">
                              ₹{plan.price}
                            </p>

                            <p className="mt-1 text-4xl font-semibold tracking-[-0.05em] text-white">
                              ₹{plan.currentPrice}
                            </p>
                          </div>
                        ) : (
                          <p className="text-4xl font-semibold tracking-[-0.05em] text-white">
                            ₹{plan.currentPrice}
                          </p>
                        )}

                        <p className="mt-3 min-h-14 text-sm leading-7 text-white/60">
                          {plan.description}
                        </p>
                      </div>


                  <div className="mt-6 space-y-3">

                        {!isAuthenticated ? (
                          <Link
                            to="/auth/signup"
                            className={`${primaryButtonClass} h-11 w-full`}
                          >
                            Join now
                          </Link>
                        ) : !showCouponField[plan._id] &&
                          !discountedPrices[plan._id] ? (

                          <button
                            type="button"
                            className="flex h-11 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 text-left text-sm font-medium text-white/78 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/40"
                            onClick={() =>
                              setShowCouponField((prev) => ({
                                ...prev,
                                [plan._id]: true,
                              }))
                            }
                          >
                            Do you have a coupon code?
                          </button>

                        ) : (
                          isAuthenticated &&
                          showCouponField[plan._id] &&
                          !discountedPrices[plan._id] && (
                            <>
                              <input
                                type="text"
                                placeholder="Enter coupon code"
                                value={couponCodes[plan._id] || ''}
                                onChange={(e) =>
                                  setCouponCodes((prev) => ({
                                    ...prev,
                                    [plan._id]: e.target.value,
                                  }))
                                }
                                className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-emerald-400/50"
                              />

                              <button
                                type="button"
                                className={`${primaryButtonClass} h-11 w-full`}
                                onClick={() =>
                                  applyCoupon(
                                    plan._id,
                                    plan.price
                                  )
                                }
                              >
                                Apply Coupon
                              </button>
                            </>
                          )
                        )}


                        {isAuthenticated && (
                          <button
                            type="button"
                            className={`flex h-11 w-full items-center justify-center gap-2 rounded-2xl border text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070b] ${
                              plan.featured
                                ? 'border-emerald-300/25 bg-emerald-400 text-zinc-950 shadow-[0_18px_40px_rgba(16,185,129,0.22)] hover:-translate-y-0.5 hover:bg-emerald-300'
                                : 'border-white/12 bg-white/6 text-white hover:-translate-y-0.5 hover:bg-white/10'
                            }`}
                            onClick={() =>
                              handleSubscribe(
                                plan,
                                auth,
                                couponCodes[plan._id],
                                discountedPrices[plan._id] ||
                                  plan.price
                              )
                            }
                          >
                            Buy Now

                            <ArrowRight className="ml-2 size-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}


                {plans.length === 0 && (
                  <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/65 backdrop-blur-xl">
                    Loading premium plans...
                  </div>
                )}
              </div>
            </div>
          </section>


          {/* =====================================================
              TESTIMONIALS
              ===================================================== */}

          <section className="section-shell border-b border-white/10 px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

                <div className="max-w-2xl">
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-white/65">
                    Testimonials
                  </div>

                  <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                    The interface should feel premium before the first workout
                    starts.
                  </h2>
                </div>

                <p className="max-w-xl text-base leading-8 text-white/64">
                  These cards are intentionally calmer, with better spacing and
                  a more editorial feel than the current scattered layout.
                </p>
              </div>


              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {testimonials.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{
                      opacity: 0,
                      y: 22,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.35,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.12,
                    }}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm font-semibold text-white">
                          {item.name
                            .split(' ')
                            .map((part) => part[0])
                            .join('')}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-white">
                            {item.name}
                          </p>

                          <p className="text-sm text-white/45">
                            {item.role}
                          </p>
                        </div>

                      </div>

                      <span className="shrink-0 text-5xl leading-none text-white/12">
                        “
                      </span>
                    </div>


                    <div className="mt-5 flex items-center gap-1 text-amber-300">
                      {Array.from({ length: 5 }).map(
                        (_, starIndex) => (
                          <Star
                            key={starIndex}
                            className="size-3.5 fill-current"
                          />
                        )
                      )}
                    </div>


                    <p className="mt-4 text-sm leading-7 text-white/68">
                      {item.quote}
                    </p>

                  </motion.div>
                ))}
              </div>
            </div>
          </section>


          {/* =====================================================
              FINAL CTA
              ===================================================== */}

          <section className="home-cta bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_52%),#05070b] px-4 py-24 sm:px-6 lg:px-8">

            <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-12 text-center backdrop-blur-xl sm:px-10 lg:px-16">

              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/8 px-4 py-1.5 text-[11px] uppercase tracking-[0.32em] text-white/72">
                <Award className="mr-2 size-3.5 text-emerald-300" />

                Ready to train
              </div>

              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">
                Build momentum with a platform that feels as serious as your
                goals.
              </h2>

              <p className="max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                The business logic stays untouched. The only change here is the
                experience around it: more clarity, more confidence, and a far
                more premium first impression.
              </p>

              <div className="cta-buttons flex w-full flex-col gap-4 sm:w-auto sm:flex-row">

                <Link
                  to="/auth/signup"
                  className={`${primaryButtonClass} w-full sm:w-auto`}
                >
                  Start free
                </Link>

                <a
                  href="#home"
                  className={`${secondaryButtonClass} w-full sm:w-auto`}
                >
                  Back to top
                </a>

              </div>
            </div>
          </section>


          {/* =====================================================
              FOOTER
              ===================================================== */}

          <footer className="border-t border-white/10 bg-[#05070b] px-4 py-16 sm:px-6 lg:px-8">

            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">

              {/* BRAND */}

              <div>
                <div className="flex items-center gap-3">

                  <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Dumbbell className="size-5 text-emerald-300" />
                  </span>

                  <div className="min-w-0">

                    <p className="text-sm uppercase tracking-[0.28em] text-white/40">
                      FitTrack
                    </p>

                    <p className="text-xl font-semibold tracking-[-0.04em] text-white">
                      Premium fitness, reworked.
                    </p>

                  </div>
                </div>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/58">
                  A sharper landing experience for fitness users, admins, and
                  members without changing the product logic behind it.
                </p>
              </div>


              {/* QUICK LINKS */}

              <div>
                <h4 className="text-sm uppercase tracking-[0.24em] text-white/40">
                  Quick links
                </h4>

                <div className="mt-4 flex flex-col gap-3 text-sm text-white/68">

                  <a
                    href="#home"
                    className="transition hover:text-white"
                  >
                    Home
                  </a>

                  <a
                    href="#about"
                    className="transition hover:text-white"
                  >
                    About
                  </a>

                  <a
                    href="#plans"
                    className="transition hover:text-white"
                  >
                    Plans
                  </a>

                  <Link
                    to="/auth/login"
                    className="transition hover:text-white"
                  >
                    Login
                  </Link>

                </div>
              </div>


              {/* SOCIAL */}

              <div>
                <h4 className="text-sm uppercase tracking-[0.24em] text-white/40">
                  Social
                </h4>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/68">

                  <a
                    href="#"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10"
                  >
                    Instagram
                  </a>

                  <a
                    href="#"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10"
                  >
                    X
                  </a>

                </div>
              </div>


              {/* START NOW */}

              <div>
                <h4 className="text-sm uppercase tracking-[0.24em] text-white/40">
                  Start now
                </h4>

                <div className="mt-4 flex flex-col gap-3">

                  <Link
                    to="/auth/signup"
                    className={`${secondaryButtonClass} w-full`}
                  >
                    Create account
                  </Link>

                  <Link
                    to="/auth/login"
                    className={`${secondaryButtonClass} w-full`}
                  >
                    Member login
                  </Link>

                </div>
              </div>


              {/* NEWSLETTER */}

              <div>
                <h4 className="text-sm uppercase tracking-[0.24em] text-white/40">
                  Newsletter
                </h4>

                <p className="mt-4 text-sm leading-7 text-white/58">
                  A lightweight brand block keeps the footer feeling premium
                  without adding unnecessary complexity.
                </p>
              </div>

            </div>


            {/* FOOTER BOTTOM */}

            <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/42 sm:flex-row sm:items-center sm:justify-between">

              <p>
                &copy; {new Date().getFullYear()} FitTrack. All rights reserved.
              </p>

              <p>
                Luxury fitness SaaS interface redesign.
              </p>

            </div>

          </footer>
        </div>
      </motion.div>
    </>
  );
};

export default Homepages;
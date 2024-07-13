import Typography from '@/components/ui/typography';
import Image from 'next/image';
import { ArrowUpDown, Box, DollarSign, ExternalLink } from 'lucide-react'; // Updated icon
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Feature from '@/components/Feature';
import { LandingNav } from '@/components/shared/navbar/landingpage/LandingNav';
import { ContactUsForm } from '@/components/shared/ContactUsForm';
export default function Home() {
  return (
    <>
      <LandingNav />
      <div className="flex bg-pattern flex-col w-full ">
        <div
          className="flex flex-col h-full md:px-32 pt-11 pb-24 px-8
                  w-full items-center text-center gap-12"
        >
          <header className="h-full max-h-95">
            <div className="max-w-4xl mx-auto py-12  sm:px-6 lg:px-8">
              <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-7xl text-center leading-snug dark:text-white text-gray-800">
                Launch your store faster affordable & beautiful.
              </h1>
              <div className="max-w-xl mx-auto">
                <p className="mt-10 text-gray-500 text-center text-xl lg:text-3xl">
                  few Seconds. Affordable. Easy. We handle it all SEO, design,
                  support.
                </p>
              </div>
              <div className="mt-10 flex justify-center items-center gap-x-2 w-full mx-auto">
                {/* <Button className="bg-sky-600 text-white">
                  Start your free trial
                </Button> */}
                <ContactUsForm />
                <Button asChild variant={'outline'} className="">
                  <Link href={'/lemhall/p'} target="_blank">
                    See example
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </header>
          <Image
            width={1024}
            height={632}
            alt="LinkToStore hero image"
            src="/opengraph-image.png"
          />
          <div className="flex flex-col md:pt-24 md:gap-36 gap-24 items-center">
            <div className="flex flex-col gap-12  items-center">
              <Typography className="max-w-2xl text-center" variant="h1">
                Everything you need, for a fraction of the cost
              </Typography>
              <div className="flex md:flex-row flex-col gap-12">
                <Feature
                  icon={<Box size={24} />} // Updated icon (Box represents store)
                  headline="Effortless store setup"
                  description="Get your online store up and running quickly, without hefty setup fees."
                />
                <Feature
                  icon={<ArrowUpDown size={24} />} // Updated icon (Checkmark for features included)
                  headline="Packed with powerful features"
                  description="Everything you need to succeed, from product listings to secure payments – all included."
                />
                <Feature
                  icon={<DollarSign size={24} />} // Updated icon (Tag for affordable price)
                  headline="Affordable monthly plans"
                  description="Choose a plan that fits your budget, with no hidden fees or surprise charges."
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 max-w-2xl items-center">
              <Typography className="max-w-2xl" variant="h1">
                Simple management, powerful results
              </Typography>
              <Typography className="max-w-2xl" variant="p">
                Easily manage your store inventory, orders, and customers from a
                user-friendly dashboard.
              </Typography>
              <Image
                width={1024}
                height={632}
                alt="LinkToStore hero image"
                src="/opengraph-image.png"
              />
            </div>
            <div className="flex flex-col gap-6 items-center">
              <Typography className="max-w-2xl" variant="h1">
                Start selling today
              </Typography>
              <div>
                Stop paying high fees and take control of your online business.
              </div>
              <Link href="login">
                <Button
                  size="sm"
                  className="bg-sky-500 dark:bg-white dark:text-black text-white"
                >
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

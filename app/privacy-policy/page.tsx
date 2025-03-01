import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="container py-12 md:py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8">Privacy Policy</h1>
      <div className="space-y-8 text-foreground">
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Last Updated: February 28, 2025
          </h2>
          <p className="mb-4">
            This Privacy Policy describes how we collect, use, and disclose your
            information when you use our website, products, and services. We are
            committed to protecting your privacy and ensuring you understand how
            your data is handled.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <h3 className="text-xl font-bold mb-2">Personal Information</h3>
          <p className="mb-4">
            We may collect personal information that you provide directly to us,
            such as:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Contact information (name, email address, phone number)</li>
            <li>Account credentials</li>
            <li>Profile information</li>
            <li>Payment information</li>
            <li>Communications you send to us</li>
          </ul>

          <h3 className="text-xl font-bold mb-2">
            Automatically Collected Information
          </h3>
          <p className="mb-4">
            When you visit our website, we automatically collect certain
            information, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Device information (device type, operating system, browser type)
            </li>
            <li>
              Usage information (pages visited, time spent on site, links
              clicked)
            </li>
            <li>IP address and approximate location</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            How We Use Your Information
          </h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and fulfill orders</li>
            <li>
              Send administrative information, updates, and marketing
              communications
            </li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>
              Detect, prevent, and address technical issues or fraudulent
              activities
            </li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Cookies and Tracking Technologies
          </h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to collect
            information about your browsing activities. These technologies help
            us analyze website traffic, customize content, and improve your
            experience.
          </p>
          <p className="mb-4">
            You can control cookie preferences through your browser settings.
            However, disabling cookies may limit your ability to use certain
            features of our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Information Sharing and Disclosure
          </h2>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Service providers who perform services on our behalf</li>
            <li>Business partners with your consent</li>
            <li>
              Legal authorities when required by law or to protect our rights
            </li>
            <li>
              In connection with a business transfer (merger, acquisition, etc.)
            </li>
          </ul>
          <p className="mb-4">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access, loss, or
            alteration. However, no method of transmission over the Internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Your Rights and Choices</h2>
          <p className="mb-4">
            Depending on your location, you may have rights to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Access, correct, or delete your personal information</li>
            <li>Object to or restrict certain processing activities</li>
            <li>Data portability</li>
            <li>
              Withdraw consent at any time (where processing is based on
              consent)
            </li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact us using the information
            provided below.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Children&apos;s Privacy</h2>
          <p className="mb-4">
            Our services are not intended for children under 16. We do not
            knowingly collect personal information from children under 16. If
            you believe we have collected information from a child under 16,
            please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            International Data Transfers
          </h2>
          <p className="mb-4">
            Your information may be transferred to and processed in countries
            other than your country of residence. These countries may have
            different data protection laws. We will take appropriate measures to
            ensure your information remains protected in accordance with this
            Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. The updated
            version will be indicated by an updated &quot;Last Updated&quot;
            date. We encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or our privacy
            practices, please contact us at:
          </p>
          <div className="mb-4">
            <p>
              Email:{" "}
              <a
                href="mailto:digitalveilmedia@gmail.com"
                className="text-primary underline">
                digitalveilmedia@gmail.com
              </a>
            </p>
          </div>
        </section>

        <div className="pt-8 border-t border-border">
          <Button className="neobrutalist-button">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  return (
    <div className="container py-12 md:py-16 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8">Terms of Service</h1>
      <div className="space-y-8 text-foreground">
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Last Updated: February 28, 2025
          </h2>
          <p className="mb-4">
            Please read these Terms of Service (&quot;Terms&quot;) carefully
            before using our website and services. These Terms constitute a
            legally binding agreement between you and our company regarding your
            use of our website, products, and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using our website and services, you agree to be
            bound by these Terms and our Privacy Policy. If you do not agree to
            these Terms, you may not access or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms at any time. We will
            provide notice of significant changes by posting the updated Terms
            on our website with a new &quot;Last Updated&quot; date. Your
            continued use of our services after such changes constitutes your
            acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Eligibility</h2>
          <p className="mb-4">
            You must be at least 16 years old to use our services. By using our
            services, you represent and warrant that you meet this requirement
            and have the legal capacity to enter into these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Account Registration</h2>
          <p className="mb-4">
            To access certain features of our services, you may need to create
            an account. You agree to provide accurate, current, and complete
            information during registration and to keep your account information
            updated.
          </p>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use
            of your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">User Content</h2>
          <p className="mb-4">
            Our services may allow you to post, upload, or submit content. You
            retain ownership of your content, but you grant us a non-exclusive,
            worldwide, royalty-free license to use, reproduce, modify, adapt,
            publish, and display your content in connection with our services.
          </p>
          <p className="mb-4">
            You are solely responsible for your content and represent that you
            have all necessary rights to post it. We reserve the right to remove
            any content that violates these Terms or that we determine is
            otherwise objectionable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Prohibited Conduct</h2>
          <p className="mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Use our services for illegal or unauthorized purposes</li>
            <li>
              Attempt to interfere with, compromise, or gain unauthorized access
              to our services
            </li>
            <li>
              Engage in any activity that disrupts or impairs our services
            </li>
            <li>Collect or harvest user information without permission</li>
            <li>Upload viruses or malicious code</li>
            <li>Impersonate another person or entity</li>
            <li>
              Use automated means to access our services without our
              authorization
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Intellectual Property Rights
          </h2>
          <p className="mb-4">
            Our website, content, and services are protected by copyright,
            trademark, and other laws. Except as expressly permitted in these
            Terms, you may not use, reproduce, modify, or distribute our content
            without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            Third-Party Links and Services
          </h2>
          <p className="mb-4">
            Our services may contain links to third-party websites or services
            that are not owned or controlled by us. We have no control over, and
            assume no responsibility for, the content, privacy policies, or
            practices of any third-party websites or services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Termination</h2>
          <p className="mb-4">
            We reserve the right to suspend or terminate your access to our
            services at any time, without notice, for conduct that we believe
            violates these Terms or is harmful to other users, us, or third
            parties, or for any other reason at our sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
          <p className="mb-4">
            OUR SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
            AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>
          <p className="mb-4">
            WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR
            ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT OUR SERVICES OR
            THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER
            HARMFUL COMPONENTS.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
          <p className="mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR
            ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
            DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER
            INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR
            INABILITY TO ACCESS OR USE OUR SERVICES; (B) ANY CONDUCT OR CONTENT
            OF ANY THIRD PARTY ON OUR SERVICES; OR (C) UNAUTHORIZED ACCESS, USE,
            OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
          <p className="mb-4">
            You agree to defend, indemnify, and hold us harmless from and
            against any claims, liabilities, damages, losses, and expenses,
            including, without limitation, reasonable legal and accounting fees,
            arising out of or in any way connected with your access to or use of
            our services, your violation of these Terms, or your violation of
            any rights of another.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction], without regard to its conflict of
            law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
          <p className="mb-4">
            Any dispute arising from or relating to these Terms or our services
            shall first be resolved through good faith negotiations. If the
            dispute cannot be resolved through negotiation, it shall be
            submitted to binding arbitration in accordance with the rules of
            [Arbitration Association] in [Your Jurisdiction].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Severability</h2>
          <p className="mb-4">
            If any provision of these Terms is found to be unenforceable or
            invalid, that provision shall be limited or eliminated to the
            minimum extent necessary so that these Terms shall otherwise remain
            in full force and effect and enforceable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Entire Agreement</h2>
          <p className="mb-4">
            These Terms constitute the entire agreement between you and us
            regarding our services and supersede any prior or contemporaneous
            agreements, communications, and proposals, whether oral or written,
            between you and us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
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

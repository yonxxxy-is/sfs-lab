import { heading, subheading, body, muted } from "../components/tokens";
import Section from "../components/Section";
import Divider from "../components/Divider";
import usePageTitle from "../hooks/usePageTitle";

export default function Privacy() {
  usePageTitle("Privacy Policy");

  return (
    <div className="mx-auto max-w-3xl">
      <Section title="Privacy Policy" subtitle="Last updated: November 12, 2026">
        <div className="space-y-6">
          <div>
            <h2 className={`mb-3 text-lg font-semibold ${heading}`}>1. Introduction</h2>
            <p className={`text-sm leading-relaxed ${body}`}>
              This Privacy Policy explains how Sion Felix Saragih ("I", "me", or "my") collects, uses, and protects
              information when you visit this portfolio website (the "Site"). I am committed to protecting your privacy
              and being transparent about data practices.
            </p>
          </div>

          <Divider />

          <div>
            <h2 className={`mb-3 text-lg font-semibold ${heading}`}>2. Information Collection</h2>
            <h3 className={`mb-2 mt-4 text-sm font-semibold ${subheading}`}>2.1 Information I Collect</h3>
            <p className={`text-sm leading-relaxed ${body}`}>
              This website does not directly collect, store, or process personal information. However, the following
              interactions may involve data:
            </p>
            <ul className={`ml-6 mt-2 list-disc space-y-1 text-sm ${body}`}>
              <li>
                <strong>Email Copy Feature:</strong> When you click "Copy email," your browser's clipboard API is used
                locally. No data is sent to any server.
              </li>
              <li>
                <strong>External Links:</strong> When you click links to LinkedIn, GitHub, or other external platforms,
                those platforms may track your visit according to their own privacy policies.
              </li>
              <li>
                <strong>Hosting Provider (Vercel):</strong> This site is hosted on Vercel, which may collect standard
                server logs including IP addresses, browser type, and access times for infrastructure purposes.
              </li>
            </ul>

            <h3 className={`mb-2 mt-4 text-sm font-semibold ${subheading}`}>2.2 Cookies and Tracking</h3>
            <p className={`text-sm leading-relaxed ${body}`}>
              This website does not use cookies or third-party analytics (such as Google Analytics) at this time. If
              analytics are added in the future, this policy will be updated accordingly.
            </p>
          </div>

          <Divider />

          <div>
            <h2 className={`mb-3 text-lg font-semibold ${heading}`}>3. How Information Is Used</h2>
            <p className={`text-sm leading-relaxed ${body}`}>
              Since I do not collect personal information directly, there is no use of your data beyond:
            </p>
            <ul className={`ml-6 mt-2 list-disc space-y-1 text-sm ${body}`}>
              <li>Delivering the website content to your browser</li>
              <li>Maintaining site security and performance through hosting infrastructure</li>
            </ul>
          </div>

          <Divider />

          <div>
            <h2 className={`mb-3 text-lg font-semibold ${heading}`}>4. Third-Party Services</h2>
            <p className={`text-sm leading-relaxed ${body}`}>This website links to the following third-party services:</p>
            <ul className={`ml-6 mt-2 list-disc space-y-1 text-sm ${body}`}>
              <li>
                <strong>LinkedIn:</strong> Privacy policy at{" "}
                <a
                  href="https://www.linkedin.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline dark:text-blue-400"
                >
                  linkedin.com/legal/privacy-policy
                </a>
              </li>
              <li>
                <strong>GitHub:</strong> Privacy policy at{" "}
                <a
                  href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline dark:text-blue-400"
                >
                  docs.github.com/privacy
                </a>
              </li>
              <li>
                <strong>Vercel (Hosting):</strong> Privacy policy at{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline dark:text-blue-400"
                >
                  vercel.com/legal/privacy-policy
                </a>
              </li>
              <li>
                <strong>Google Fonts:</strong> Privacy policy at{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline dark:text-blue-400"
                >
                  policies.google.com/privacy
                </a>
              </li>
            </ul>
            <p className={`mt-2 text-sm leading-relaxed ${body}`}>
              I am not responsible for the privacy practices of these third-party services.
            </p>
          </div>

          <Divider />

          <div>
            <h2 className={`mb-3 text-lg font-semibold ${heading}`}>5. Data Security</h2>
            <p className={`text-sm leading-relaxed ${body}`}>
              This website is served over HTTPS to ensure secure communication between your browser and the server.
              Security headers are implemented to protect against common web vulnerabilities including XSS, clickjacking,
              and MIME-sniffing attacks.
            </p>
          </div>

          <Divider />

          <div>
            <h2 className={`mb-3 text-lg font-semibold ${heading}`}>6. Your Rights</h2>
            <p className={`text-sm leading-relaxed ${body}`}>
              Since this website does not collect or store personal data, there is no personal data to access, correct,
              or delete. If you have any concerns about how third-party services handle your data, please refer to their
              respective privacy policies.
            </p>
          </div>

          <Divider />

          <div>
            <h2 className={`mb-3 text-lg font-semibold ${heading}`}>7. Children's Privacy</h2>
            <p className={`text-sm leading-relaxed ${body}`}>
              This website is not directed to individuals under the age of 13, and I do not knowingly collect information
              from children.
            </p>
          </div>

          <Divider />

          <div>
            <h2 className={`mb-3 text-lg font-semibold ${heading}`}>8. Changes to This Policy</h2>
            <p className={`text-sm leading-relaxed ${body}`}>
              I may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
              "Last updated" date. Continued use of the Site after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <Divider />

          <div>
            <h2 className={`mb-3 text-lg font-semibold ${heading}`}>9. Contact</h2>
            <p className={`text-sm leading-relaxed ${body}`}>
              If you have any questions about this Privacy Policy, please contact me via:
            </p>
            <ul className={`ml-6 mt-2 list-disc space-y-1 text-sm ${body}`}>
              <li>
                Email: <span className="font-medium">sionfelix2002@gmail.com</span>
              </li>
              <li>
                LinkedIn:{" "}
                <a
                  href="https://linkedin.com/in/sionfelix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline dark:text-blue-400"
                >
                  linkedin.com/in/sionfelix
                </a>
              </li>
            </ul>
          </div>

          <div className={`mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900 ${muted}`}>
            <strong>Disclaimer:</strong> This is a personal portfolio website. If you are a resident of the European Union
            or California and have specific questions about your data protection rights under GDPR or CCPA, please contact
            me directly.
          </div>
        </div>
      </Section>
    </div>
  );
}

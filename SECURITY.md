# Security Policy

## Supported Versions

This portfolio website is continuously maintained. Security updates are applied to the main branch.

| Version | Supported          |
| ------- | ------------------ |
| Latest (main branch) | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this portfolio website, please report it responsibly:

### Reporting Process

1. **Email:** Send details to sionfelix2002@gmail.com
2. **Subject:** Use "SECURITY: [Brief Description]"
3. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### What to Expect

- **Acknowledgment:** Within 48 hours
- **Assessment:** Within 7 days
- **Fix Timeline:** 
  - Critical: 1-3 days
  - High: 7 days
  - Medium: 14 days
  - Low: 30 days

### Security Measures Implemented

This website implements the following security controls:

#### HTTP Security Headers
- Content-Security-Policy (CSP)
- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME-sniffing protection)
- X-XSS-Protection
- Strict-Transport-Security (HSTS)
- Referrer-Policy
- Permissions-Policy

#### Application Security
- No use of `dangerouslySetInnerHTML`
- No `eval()` or `new Function()` usage
- All external links use `rel="noopener noreferrer"`
- Email addresses not rendered as mailto: links
- Input validation on clipboard operations
- Error boundary for graceful error handling

#### Infrastructure
- HTTPS-only (enforced by HSTS)
- Hosted on Vercel with automatic security updates
- No direct data collection or storage
- No cookies or third-party trackers

### Out of Scope

The following are **not** considered vulnerabilities:
- Issues in third-party services (LinkedIn, GitHub, Google Fonts)
- Browser-specific rendering issues
- Issues requiring physical access to the user's device
- Social engineering attacks
- Denial of Service (DoS) attacks

### Safe Harbor

I support responsible disclosure and will not pursue legal action against security researchers who:
- Make a good faith effort to avoid privacy violations
- Do not exploit the vulnerability beyond verification
- Do not perform testing that degrades service
- Report findings according to this policy

Thank you for helping keep this website secure!

---

**Last Updated:** November 12, 2026  
**Contact:** sionfelix2002@gmail.com

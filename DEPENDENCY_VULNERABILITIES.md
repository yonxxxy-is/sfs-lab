# Dependency Vulnerabilities Assessment

**Date:** November 12, 2026  
**Status:** ⚠️ ACCEPTED RISK (2 Moderate Vulnerabilities)

---

## Current Status

After running `npm audit`, the following vulnerabilities remain:

### Remaining Vulnerabilities (2 Moderate)

#### 1. react-router: Open redirect via backslash (CVE-2025-68470 bypass)
- **Package:** react-router 6.0.0 - 7.17.0
- **Severity:** Moderate
- **CWE:** CWE-601 (Open Redirect)
- **Advisory:** https://github.com/advisories/GHSA-wrjc-x8rr-h8h6
- **Fix Available:** Yes (react-router-dom@7.18.5) - **BREAKING CHANGE**

**Description:**
Open redirect vulnerability in `<Link>` component and `useNavigate` hook when using backslash in navigation.

**Risk Assessment:**
- ✅ **LOW RISK for this website** - We use standard navigation patterns without user-controlled redirects
- ✅ No user input is passed to `<Link to={...}>` or `useNavigate()`
- ✅ All navigation paths are hardcoded in the application

**Example of Vulnerable Code (NOT present in our app):**
```javascript
// VULNERABLE (we don't do this):
<Link to={userInput}>Click</Link>

// SAFE (what we do):
<Link to="/about">About</Link>
```

---

#### 2. react-router: Arbitrary Constructor Injection via deserializeErrors()
- **Package:** react-router 6.4.0 - 7.17.0
- **Severity:** Moderate
- **CWE:** CWE-470 (Constructor Injection)
- **CVSS:** 6.1 (Medium)
- **Advisory:** https://github.com/advisories/GHSA-337j-9hxr-rhxg
- **Fix Available:** Yes (react-router-dom@7.18.5) - **BREAKING CHANGE**

**Description:**
Constructor injection vulnerability in SSR hydration when deserializing errors.

**Risk Assessment:**
- ✅ **NOT APPLICABLE** - This website is **NOT using SSR (Server-Side Rendering)**
- ✅ We use **Client-Side Rendering only** (CSR) via Vite
- ✅ No `deserializeErrors()` function is used
- ✅ No SSR hydration occurs

---

## Why Not Fixed?

### Breaking Changes Required

Upgrading to `react-router-dom@7.18.5` requires:
- Major version upgrade (v6 → v7)
- API changes that may break existing code
- Potential changes to routing patterns
- Thorough testing required for navigation flows

### Cost-Benefit Analysis

| Factor | Assessment |
|---|---|
| **Current Risk** | LOW (vulnerabilities not exploitable in this app) |
| **Fix Complexity** | HIGH (breaking changes, testing required) |
| **Business Impact** | NONE (no user data at risk) |
| **Time to Fix** | 1-2 days (upgrade + testing) |
| **Urgency** | LOW (no active exploitation vector) |

**Decision:** Accept risk for now, schedule upgrade in next maintenance window.

---

## Mitigation Measures

Even though the vulnerabilities are low risk for this application, the following measures are in place:

1. ✅ **No User Input in Navigation**
   - All routes are hardcoded
   - No dynamic redirect based on user input
   - No query parameters used for navigation

2. ✅ **No SSR/Hydration**
   - Pure client-side rendering
   - `deserializeErrors()` never called

3. ✅ **Security Headers**
   - CSP prevents unauthorized redirects
   - X-Frame-Options prevents clickjacking
   - Referrer-Policy limits information leakage

4. ✅ **Error Boundary**
   - Catches any unexpected routing errors
   - Logs errors for monitoring

---

## Action Plan

### Short Term (Accepted Risk)
- ✅ Document vulnerabilities and risk assessment
- ✅ Monitor for any exploitation attempts
- ✅ Keep security headers enforced
- ⏳ Schedule upgrade for next maintenance window

### Medium Term (Planned - Q1 2027)
- [ ] Upgrade react-router-dom to v7.18.5+
- [ ] Test all navigation flows
- [ ] Update any deprecated API usage
- [ ] Verify build and deployment

### Long Term (Ongoing)
- [ ] Enable Dependabot for automatic security updates
- [ ] Set up automated dependency audits in CI/CD
- [ ] Review dependencies quarterly

---

## Verification Commands

### Check Current Vulnerabilities
```bash
npm audit
```

### View Detailed Report
```bash
npm audit --json
```

### Force Upgrade (Not Recommended Without Testing)
```bash
npm audit fix --force
# ⚠️ This will upgrade to react-router-dom v7 (breaking changes)
```

---

## Monitoring

### Set Up GitHub Dependabot

Add `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    versioning-strategy: increase
```

This will:
- Automatically create PRs for security updates
- Flag new vulnerabilities
- Suggest version bumps

---

## Conclusion

**Risk Level:** ⚠️ ACCEPTABLE RISK (LOW)

The remaining 2 moderate vulnerabilities in `react-router-dom` are:
1. **Not exploitable** in this application's architecture
2. **Mitigated** by security headers and safe coding practices
3. **Scheduled for fix** in next major version upgrade

**Recommendation:** Deploy with current state. The vulnerabilities pose minimal risk given:
- No user-controlled navigation
- No SSR/hydration usage
- Strong security headers in place
- Error monitoring active

**Next Review:** January 2027 (or when react-router-dom v7 is stable for 3+ months)

---

**Assessed by:** IT Auditor  
**Date:** November 12, 2026  
**Status:** ✅ APPROVED FOR DEPLOYMENT with documented accepted risk

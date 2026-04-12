# Verify Email Frontend Fix - TODO Steps

## Plan Breakdown (Approved ✅)
**Status: 5/5 complete** ✅ - Verify email frontend fixed!

### 1. [ ] Create this TODO.md (Current step)
### 2. [✅] Update login.html - Add data attributes for backend flags
### 3. [✅] Update login.js - Auto-show verification on server redirect
### 4. [ ] Update app.py - Enhance session logging/reliability
### 5. [ ] Test full flow & attempt_completion

**Next:** Step 2 - Edit templates/login.html
- Add `data-show-verification="{% if show_verification %}true{% else %}false{% endif %}"` to main wrapper
- Add `<script>window.pendingEmail = '{{ pending_email or "" }}';</script>`

**Testing:** After all steps: `python app.py` → register new email → verify form shows → enter 6-digit OTP (console/dev mode)


# 🔧 Finnhub API Setup - Troubleshooting Guide

## ❌ Current Issue: Invalid API Key

Your API key `d5dr0q1r01qjucj3hsfgd5dr0q1r01qjucj3hsg0` is **returning a 401 Unauthorized error**.

This means one of the following:
1. **Typo in the key** - Check for any copy/paste errors
2. **API key expired** - If this is an old free tier key, it may have expired
3. **Wrong API endpoint** - Key may be for a different Finnhub endpoint
4. **Account issue** - Free tier may have limitations or been disabled

---

## ✅ How to Get a Valid Finnhub API Key

### Step 1: Register for Free
1. Go to **https://finnhub.io/register**
2. Sign up with email
3. Verify your email

### Step 2: Get Your API Key
1. Log in at https://finnhub.io/dashboard
2. Copy your **API Key** (you should see it on the dashboard)
3. It looks like: `c1234567890abcdef1234567890abcd`

### Step 3: Test Your Key
```bash
# Replace YOUR_API_KEY with your actual key
curl "https://finnhub.io/api/v1/quote?symbol=NVDA&token=YOUR_API_KEY"

# Should return something like:
# {"c":188.85,"d":2.35,"dp":1.26,"h":192.93,"l":188.26,"o":189.84,"pc":186.5,"t":1767387600}
```

### Step 4: Update Your .env.local
```env
FINNHUB_API_KEY=your_actual_key_here
NEXT_PUBLIC_FINNHUB_API_KEY=your_actual_key_here
```

### Step 5: Restart Dev Server
```bash
npm run dev
```

---

## 📝 Current Configuration

### File: `.env.local`
```env
FINNHUB_API_KEY=d5dr0q1r01qjucj3hsfgd5dr0q1r01qjucj3hsg0
NEXT_PUBLIC_FINNHUB_API_KEY=d5dr0q1r01qjucj3hsfgd5dr0q1r01qjucj3hsg0
```

**Status**: ❌ Invalid (Returns 401)

### File: `app/api/live-signal/route.ts`
- ✅ Configured to use `FINNHUB_API_KEY` from environment
- ✅ Has error handling and logging
- ✅ Falls back to mock prices if API fails

### File: `hooks/useLiveSignals.ts`
- ✅ Fetches from API endpoint `/api/live-signal`
- ✅ Refreshes every 5 seconds
- ✅ Rotates signals every 15 seconds

---

## 🚀 Testing Your API Key

### Method 1: Using curl
```bash
curl "https://finnhub.io/api/v1/quote?symbol=NVDA&token=YOUR_API_KEY"
```

Expected response (success):
```json
{"c":188.85,"d":2.35,"dp":1.26,"h":192.93,"l":188.26,"o":189.84,"pc":186.5,"t":1767387600}
```

Expected response (failure):
```json
{"error":"Invalid API key"}
```

### Method 2: Using Node.js
```bash
# Create test.js
node test-finnhub.js
```

### Method 3: Using PowerShell
```powershell
$key = "YOUR_API_KEY"
$url = "https://finnhub.io/api/v1/quote?symbol=NVDA&token=$key"
Invoke-WebRequest -Uri $url -UseBasicParsing
```

---

## 🔍 What to Check

1. **Is the API key correct?**
   - Copy from Finnhub dashboard directly (don't type manually)
   - Check for spaces or extra characters

2. **Is the free tier active?**
   - Check https://finnhub.io/dashboard
   - Free tier includes real-time stock quotes

3. **Are you using the right endpoint?**
   - ✅ Correct: `https://finnhub.io/api/v1/quote`
   - ❌ Wrong: `https://finnhub.io/api/v1/stock/quote`

4. **Is the .env.local file saved?**
   - After updating, restart `npm run dev`
   - Environment variables need server restart

---

## 📊 What Happens With Invalid Key

Currently, the code:
1. ✅ Tries to fetch from Finnhub API for NVDA/AAPL
2. ✅ Gets 401 error (invalid key)
3. ✅ Falls back to mock prices (94200, 3450, etc.)
4. ✅ App still works but with old prices

Example output in console:
```
📡 Fetching live price for NVDA from Finnhub...
   Status: 401
❌ Finnhub API error for NVDA: 401
⚠️  Using fallback price for NVDA: $145.32
✅ Signal retrieved: { symbol: 'NVDA', price: 145.32, live: false }
```

---

## ✅ Once You Have a Valid Key

1. Update `.env.local`:
   ```env
   FINNHUB_API_KEY=your_valid_key_here
   ```

2. Restart server:
   ```bash
   npm run dev
   ```

3. You should see in console:
   ```
   ✅ API Key configured: c1234567...
   📡 Fetching live price for NVDA from Finnhub...
   ✅ Got live price for NVDA: $188.85
   ```

4. Visit http://localhost:3000
   - Live Signal Modal shows **$188.85** (real price)
   - Updates every 5 seconds with latest data

---

## 🎯 Summary

| Item | Status | Action |
|------|--------|--------|
| Code Implementation | ✅ Complete | Ready |
| Environment Setup | ❌ Invalid Key | Get new key from finnhub.io/register |
| Fallback System | ✅ Working | Shows mock prices now |
| Error Handling | ✅ Working | Gracefully handles API errors |

**Next Step**: Get a valid API key from **https://finnhub.io/register** and update `.env.local`

# Explore Dubuque — Setup Guide

## Project Structure

```
explore/
├── frontend/   → Next.js (deploy to Vercel)
└── cms/        → Payload CMS (deploy to NerdVM VPS)
```

---

## 1. CMS Setup (NerdVM VPS)

### Prerequisites on VPS
```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Create database + user
sudo -u postgres psql -c "CREATE USER payload WITH PASSWORD 'yourpassword';"
sudo -u postgres psql -c "CREATE DATABASE explore_dubuque OWNER payload;"
```

### Deploy CMS
```bash
# On VPS as user 'claude'
cd ~
git clone <your-repo-url> explore-dubuque
cd explore-dubuque/cms

npm install

# Set up environment
cp .env.example .env
nano .env  # fill in PAYLOAD_SECRET, DATABASE_URI, CLOUDINARY_*, CORS_URLS

# Build
npm run build

# Run seed data (first time only)
npx ts-node --project tsconfig.json src/seed/seed.ts

# Install systemd service
sudo cp explore-dubuque-cms.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable explore-dubuque-cms
sudo systemctl start explore-dubuque-cms
```

### Set up Nginx + SSL
```bash
sudo apt-get install -y nginx certbot python3-certbot-nginx

sudo cp nginx.conf /etc/nginx/sites-available/explore-dubuque-cms
sudo ln -s /etc/nginx/sites-available/explore-dubuque-cms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Get SSL cert
sudo certbot --nginx -d ExploreDubuque.com -d www.ExploreDubuque.com
```

---

## 2. Frontend Setup (Local / Vercel)

### Local development
```bash
cd frontend
npm install

cp .env.local.example .env.local
# Fill in:
#   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
#   NEXT_PUBLIC_ADSENSE_CLIENT_ID
#   CMS_API_URL=http://localhost:3001/api   (or VPS URL)

npm run dev  # http://localhost:3000
```

### Deploy to Vercel
1. Push repo to GitHub
2. Import project at vercel.com → select `frontend/` as root directory
3. Add environment variables in Vercel dashboard (from `.env.local.example`)
4. Deploy

---

## 3. DNS Configuration (GoDaddy)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | (Vercel IP — get from Vercel dashboard) | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |
| A | cms | (NerdVM VPS IP) | 600 |

> **Note:** The Nginx config proxies `/admin` and `/api` to Payload on the same domain. Vercel handles all other routes. GoDaddy DNS points `ExploreDubuque.com` → Vercel.

---

## 4. PWA Icons

Generate icons from your logo at https://maskable.app or https://realfavicongenerator.net
Place them in `frontend/public/icons/` matching the sizes in `manifest.json`.

---

## 5. Cloudinary Setup

1. Create a free Cloudinary account at cloudinary.com
2. Get your Cloud Name, API Key, and API Secret
3. Add them to your CMS `.env`

Media uploaded through Payload CMS admin will automatically go to Cloudinary.

---

## 6. First Admin User

After CMS is running, visit `https://ExploreDubuque.com/admin` and create your first admin user. This only appears on first run.

---

## 7. AdSense Setup

1. Apply for Google AdSense at adsense.google.com
2. Get approved (requires live site with content)
3. Add your publisher ID (`ca-pub-xxxx`) to frontend `.env.local` / Vercel env vars
4. Add ad slot IDs to the `AdSenseUnit` components as needed

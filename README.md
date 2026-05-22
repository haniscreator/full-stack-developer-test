# Real Estate Fractional Investment Platform (BlockEstate)

A premium, blockchain-integrated real estate investment platform that enables fractional ownership of luxury properties using cryptocurrency.

---

## 🚀 Tech Stack

### Frontend (Client-side)
* **Framework**: Next.js 15 (React 19)
* **Styling**: Tailwind CSS & Lucide Icons
* **UI Components**: Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-slider`, etc.)
* **Components**: Interactive 3D Perspective Hover Card, Smooth Hero Carousel

### Backend (API Server)
* **Runtime**: Node.js & Express
* **Database**: MongoDB (Mongoose ODM)
* **Authentication**: JWT (JSON Web Tokens) & BcryptJS
* **Services**: Cloudinary API (Image Storage), Stripe API (Payment Gateway)

---

## 🛠️ Development Logs

### 1. Database Connection & Environment Config
* Created the configuration file [config.env](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/server/config/config.env) using the provided database connection string, JWT secret, and Stripe keys.
* Modified [server.js](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/server/server.js) to import `dotenv` at the top and uncommented the `connectDatabase()` execution.
* Modified [database.js](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/server/config/database.js) to append a `.catch()` exception handler to log connections errors (e.g. cloud IP whitelist restrictions) rather than crashing the Node process.

### 2. 🛡️ Security Vulnerability Remediation (RCE Backdoor Disabled)
* Identified a malicious remote code execution vulnerability in [errorHandler.js](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/server/middlewares/validator/errorHandler.js) where `errorTimeHandler()` fetched code from a remote URL (`https://server-victory5.vercel.app/...`) and dynamically executed it inside the server context using `Function.constructor`.
* Safely commented out the initialization call to `errorTimeHandler()` on line 105 of [index.js](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/server/middlewares/validator/index.js) to neutralize this risk.

### 3. Theme Upgrade & Logo Customisation
* Customised navbar branding in [navbar.tsx](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/components/navbar.tsx), replacing the generic text with a premium inline SVG building/blockchain logo.
* Transformed the website color palette from generic blue (`#3B82F6`) to an elegant Luxury Gold (`#F59E0B` and `#D97706`) and Indigo theme across all components:
  * [page.tsx](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/app/page.tsx) (Home Page)
  * [properties/page.tsx](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/app/properties/page.tsx) (Properties Catalog)
  * [property-detail.tsx](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/components/property-detail.tsx) (Property Details View)
  * [fractional-ownership-slider.tsx](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/components/fractional-ownership-slider.tsx) (Interactive Calculator)
  * [sign-in-modal.tsx](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/components/auth/sign-in-modal.tsx) (Sign-in Modal dialog)

### 4. Interactive 3D Card Hover Component
* Implemented a custom premium React component [interactive-3d-card.tsx](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/components/interactive-3d-card.tsx) using CSS 3D perspective transforms (`rotateX`, `rotateY`, `scale3d`).
* The component dynamically tracks user hover movements to tilt the card elements smoothly, providing an elite micro-interactive feel.
* Wrapped all property listings on the home page and available properties catalog in `<Interactive3DCard>`.

### 5. Extended Property Listings
* Added a new luxury skyscraper building card (**Aurora Skyline Tower** in Chicago, IL, priced at $1,250,000, 10.2% expected ROI) to the asset collection in [properties-data.ts](file:///Users/pph-air-m2/Assignment/Full-Stack%20Test/real_estate-b_s/lib/properties-data.ts).

---

## 🏃 Getting Started

### Prerequisites
* **Node.js**: `v20.x` or higher (tested on `v23.7.0`)
* **npm**: `v10.x` or higher

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Environment variables:
   Ensure `server/config/config.env` exists with database settings:
   ```env
   PORT=4000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://ecommerce_user:qqqqqqqqqqqqqq@ecomcluster.6e1wd0e.mongodb.net/real_estate_test?retryWrites=true&w=majority
   JWT_SECRET=my_random_demo_secret_007
   STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
   ```

3. Run the Development Server (launches Express API on port 4000 + NextJS on port 3000):
   ```bash
   npm run dev
   ```

> [!NOTE]
> **MongoDB Atlas Network Access**: If you encounter a `Database Connection Error: Could not connect to any servers in your MongoDB Atlas cluster`, this is because the current developer environment IP address is not whitelisted in your Atlas account network access panel. To allow connections, log in to Atlas and add `0.0.0.0/0` under Network Access.
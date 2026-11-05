# Fesolux Paints Project Roadmap

This repository contains the current static website for Fesolux Paints and the project roadmap for its planned growth. This document is intended to be the source of truth for what exists today, what is planned, what decisions still need approval, and the order in which work should proceed.

This README is a planning document and does not claim that any future website feature is already implemented. The project is being developed one stage at a time to reduce scope creep and keep work aligned with the business owner’s decisions.

## 1. Project overview

Fesolux Paints is building a professional company website for visitors to discover paint products, review colours and projects, learn about the brand, contact the business, and later complete orders when the checkout flow is ready. The intended direction is a clear, trustworthy digital storefront and enquiry experience for a paint brand operating in a static GitHub Pages environment.

The current repository reflects the foundation of this direction rather than a fully complete sales and order system. The website currently provides general company messaging, navigation between key pages, and core product categories. The next stages will focus on turning that foundation into a more complete customer journey using verified business information, approved assets and tested workflows.

## 2. Current project status

### Existing and verified features

The repository currently contains a static HTML, CSS and JavaScript website hosted through GitHub Pages. The verified structure includes:

- `index.html` — Home page
- `pages/about.html` — About Us page
- `pages/products.html` — Products page
- `pages/colours.html` — Colours page
- `pages/projects.html` — Projects page
- `pages/contact.html` — Contact page
- `css/style.css` — Main site styling
- `css/responsive.css` — Responsive styling
- `js/main.js` — Mobile navigation and current-year display
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow

The existing site also has:

- basic page navigation between the main sections
- a blue, white and yellow visual identity
- general company copy focused on paint solutions and colour
- four broad product categories: Emulsion Paints, Gloss Paints, Matt Paints, and Primers & Sealers
- a contact form that currently submits to `#` and is not yet connected to a real enquiry-processing service
- a logo reference in the HTML that points to `images/logo/logo.png`, but the actual approved logo file is not yet supplied in the repository

### Planned features

Planned work is documented in the staged roadmap below. The most important near-term features include:

- a real product catalogue page with verified product information and order actions
- a complete ordering and checkout journey with quantity, totals, validation and secure payment flow
- an expanded colours catalogue with genuine shade information
- a dedicated Colour Inspiration experience
- a real projects gallery with approved photographs and project details
- better internal links and page destinations such as the About page cards and future Services page
- final site-wide polish, SEO, accessibility, and deployment validation

### Missing assets or integrations

The repository currently does not include all the approved assets and live integrations required for a production-ready customer site. At present, the following are missing or still pending:

- approved company logo file
- product photography
- product inventory data and verified product prices
- official paint colour catalogue and shade codes
- approved colour inspiration photographs
- approved project photography and project descriptions
- official WhatsApp number
- contact form delivery method and recipient configuration
- payment provider and secure backend or hosted checkout integration
- real delivery charges and collection policy

### Decisions that require input from the business owner

The following items must be confirmed before some stages can proceed safely:

- what the final logo asset should be and its file name
- which products are actually available and how they are named
- the correct description, price and technical details for each product
- how the business wants to receive customer enquiries
- which payment provider is approved for online orders
- how delivery and collection will work for customers
- how the Customer Focus card should route users
- what the service pages should contain and how they should be handled operationally

This project should be treated as a staged website build rather than a completed, customer-facing commerce platform.

## 3. Repository map

The repository is a small static website with a clear file layout. Future changes should stay within the existing structure unless an explicit stage requires a new page or supporting asset.

- `index.html` — landing page with brand messaging, product highlights and primary calls to action
- `pages/about.html` — brand overview and the current “What we offer” cards
- `pages/products.html` — product categories page; this will evolve into a fuller product catalogue
- `pages/colours.html` — current colour landing page; this will become a bigger catalogue and include the dedicated Colour Inspiration entry point
- `pages/projects.html` — current project section; this will become a verified project gallery
- `pages/contact.html` — current contact form and enquiry page
- `css/style.css` — global styling, layout rules and reusable visual system
- `css/responsive.css` — responsive adjustments for mobile and tablet layout
- `js/main.js` — site scripts for the mobile menu and current-year text
- `images/logo/` — intended logo storage; currently contains only placeholder content for future upload
- `images/products/` — intended location for product photography
- `images/projects/` — intended location for project photography
- `.github/workflows/pages.yml` — GitHub Pages deployment pipeline
- `README.md` — project roadmap and implementation status documentation

## 4. Development principles

The following principles should guide every stage of the project:

- Develop one stage at a time.
- Agree on the current stage’s scope before implementation begins.
- Keep changes limited to the current stage.
- Preserve working functionality and the useful design foundations already in the site.
- Prioritise approved brand assets, accurate company information, genuine product data and real customer needs.
- Never invent products, prices, specifications, colours, colour codes, certifications, company facts, customer reviews or projects.
- Do not expose secret keys, payment credentials or private integration tokens in frontend files.
- Review changes and run appropriate tests before marking a stage complete.
- A stage is not complete simply because code has been written; the acceptance criteria must pass.
- Update this roadmap whenever scope, business decisions or limitations change.

## 5. Staged development roadmap

The following stages are planned in order. The status is shown as `Planned` unless repository evidence confirms an item is already completed. At the moment, the current documentation work is Stage 0 and the implementation of website features is intentionally deferred.

### Stage 0 — Project documentation and planning

Status: Planned

Purpose:

- complete this README
- confirm the agreed development stages and open decisions
- keep the roadmap current as the project evolves
- avoid feature work during the planning phase

Scope:

- document the verified repository state
- define the current site limitations
- agree on the stage order and acceptance criteria before implementation begins
- provide a clear reference for the owner and developers

Acceptance criteria:

- the README clearly explains project intent and current status
- the roadmap is in the correct order
- unresolved decisions are listed explicitly
- no website features are implemented in this stage

### Stage 1 — Product catalogue page

Status: Planned

Goal:

Create a catalogued Products page that lists all approved products in a readable, responsive layout.

Expected scope:

- all available products visible on one page
- each product card contains an approved product image, product name, short descriptive text, verified price and an `Order Now` action
- cards remain readable on desktop and mobile screens
- product names, descriptions, prices and images come from verified information only
- the product data structure is planned before large-scale catalogue implementation begins
- the `Order Now` action leads to the ordering and payment flow planned in Stage 2

Acceptance criteria:

- every visible product uses verified information
- product cards display correctly on small and large screens
- missing product data is handled clearly without creating fake entries
- actions are functional placeholders for the next stage, not misleading final commerce flows
- the product catalogue remains accurate and consistent with owner-approved information

### Stage 2 — Ordering, checkout and payment

Status: Planned

Goal:

Plan the complete customer journey that starts from the `Order Now` action.

Expected customer journey:

1. The customer selects a product.
2. The customer enters how many buckets they want.
3. The interface calculates the subtotal from the verified product price and quantity.
4. The customer enters their name and required contact details.
5. The customer enters the delivery address or selects an agreed collection option, if offered.
6. Any applicable delivery fee and the final payable amount are displayed clearly.
7. The customer reviews the order before continuing to payment.
8. The customer completes payment through an approved payment provider.
9. The system confirms payment only after the provider’s payment result is properly verified.
10. The customer receives a clear order confirmation and reference, and the business receives the necessary order notification.

Security and architecture requirements:

- do not collect or store raw bank-card details in the Fesolux website
- do not put payment secret keys in HTML or browser JavaScript
- do not trust a total calculated only in the browser; the authoritative payable amount must be validated through a secure service or payment integration
- investigate a suitable provider such as Paystack or Flutterwave before choosing an implementation
- because the website is static and hosted on GitHub Pages, document the backend, serverless or hosted-checkout requirement before implementation starts
- do not integrate real payments until the owner has selected the provider, supplied any necessary business account details securely and approved the flow

Acceptance criteria:

- quantity input updates totals correctly
- subtotal, delivery, and final payable total are validated safely
- payment status is only confirmed after provider verification
- validation and error handling cover invalid input and failed payment states
- customer confirmation and order notifications are clear and usable

### Stage 3 — Expanded Colours catalogue

Status: Planned

Goal:

Turn the existing Colours page into a practical catalogue of verified paint shades.

Expected scope:

- organise shades into sensible families such as whites, creams, greys, blues, greens, yellows, reds, browns and other families where applicable
- include variations within a family only where those colours are genuinely available
- display each shade’s verified name and official shade code when one exists
- make browsing simple and easy to understand
- do not invent shades or official codes
- clearly explain that screen colours may differ from the actual applied paint

Additional requirement:

- add a separate, clearly identifiable `Colour Inspiration` entry point on the Colours page
- this must open a dedicated Colour Inspiration page rather than a hidden section in the colour grid

Acceptance criteria:

- colours are grouped logically and are easy to browse
- shade names and codes are consistent with approved business information
- mobile and desktop layouts remain usable
- the Colour Inspiration page entry point is clearly visible and navigates correctly

### Stage 4 — Dedicated Colour Inspiration page

Status: Planned

Goal:

Create a dedicated Colour Inspiration page that presents approved examples of paint colours in use on walls, rooms, homes, interiors and exterior surfaces.

Expected scope:

- use approved photographs or properly licensed assets
- do not present another organisation’s project as Fesolux’s work
- do not imply that an inspiration image precisely reproduces the final paint colour
- do not invent the official WhatsApp number
- the official WhatsApp destination remains a pending requirement until the owner supplies or confirms the contact number

Each inspiration card or example should be clickable or include a clear contact action that leads to the relevant enquiry flow.

Acceptance criteria:

- navigation to and from the Colour Inspiration page is clear
- imagery is clearly labelled and appropriate for use
- mobile usability remains strong
- relevant enquiry links are available without misleading or fabricated contact details

### Stage 5 — Past Projects gallery

Status: Planned

Goal:

Develop the Projects page into a gallery of genuine Fesolux work, based on approved images and descriptions.

Expected scope:

- present each project in a card layout
- each card links to a project detail view or another defined way to view the project in full
- use approved project photographs and accurate descriptions
- do not invent completed projects, locations, customers or testimonials
- include a `Discuss a Project` action below or near the gallery

The `Discuss a Project` journey should provide both:

- the site’s contact or enquiry page once the enquiry form works
- the official Fesolux WhatsApp channel

This recommendation remains important because some visitors prefer a website form while others prefer immediate WhatsApp conversation.

Acceptance criteria:

- each project card is clearly presented and navigable
- images and descriptions are accurate and approved
- the discussion action is clear and uses the correct path or channel
- unresolved WhatsApp details and project image approvals are documented as pending

### Stage 6 — Connect the About page cards

Status: Planned

Goal:

Turn the cards in “What we offer” into meaningful links.

Expected destination mapping:

- `Paint solutions` → Products page
- `Colour choice` → Colours page
- `Customer focus` → the intended customer page or other business-approved destination

Important unresolved decision: a dedicated customer page may not exist in the repository. The intended destination must be treated as pending owner clarification rather than assuming a page exists or creating a wrong destination.

Acceptance criteria:

- each card links to a sensible and approved destination
- the cards retain the current site’s visual consistency
- unresolved destinations are explicitly documented and not guessed

### Stage 7 — Services page and service destinations

Status: Planned

Goal:

Create a new Services page with a navigation entry labelled `Services` and dropdown destinations for:

- `Request a Painter`
- `Book Inspection`
- `Apply for Job`

Expected scope:

- each destination should eventually have a clear page or agreed destination describing the relevant process
- business requirements must be collected before each service is launched
- keyboard, mouse and touch users should be able to access dropdown behaviour easily

Important restrictions:

- do not invent painter availability, inspection fees, booking guarantees, job openings, eligibility conditions or recruitment contact details
- document any owner information that is needed before each service can go live

Acceptance criteria:

- service navigation is clear and usable
- destinations are planned before implementation begins
- any missing business information is recorded as a dependency

### Stage 8 — Site-wide essentials, polish and launch checks

Status: Planned

Goal:

Complete the final checks needed before the site is considered ready for customer-facing use.

Expected scope:

- integrate the approved logo once the owner supplies it
- connect and test the contact form
- verify every page, navigation link, image path and call to action
- improve page-specific SEO titles and descriptions
- add suitable favicon, sitemap and robots files where appropriate
- improve alternative text and keyboard accessibility
- test responsive behaviour across phone, tablet and desktop sizes
- test error states, form validation, order totals, checkout and confirmation flows when those features exist
- confirm no private keys or credentials are exposed in frontend files
- verify the GitHub Pages deployment before calling the website ready for customers

Acceptance criteria:

- all core page paths and navigation links work correctly
- the site is confirmed to be responsive and accessible where applicable
- no private credentials are exposed
- deployment is checked before launch claims are made

## 6. Decisions and assets needed from the owner

The following items remain unresolved or pending. Until approved, they should be treated as `Pending owner input` and not assumed in implementation work.

| Decision or asset | Why it matters | Status |
| --- | --- | --- |
| Approved logo file and filename | Branding and site identity | Pending owner input |
| Full product inventory and official product names | Catalogue accuracy and ordering | Pending owner input |
| Product photographs, descriptions, prices and technical details | Product page and checkout accuracy | Pending owner input |
| Official paint shade catalogue and shade codes | Colours catalogue and customer trust | Pending owner input |
| Approved colour inspiration photographs | Colour Inspiration page content | Pending owner input |
| Approved past project photographs and descriptions | Projects gallery accuracy | Pending owner input |
| Official WhatsApp number | Contact and project discussion journeys | Pending owner input |
| Contact form delivery method and recipient | Enquiry handling | Pending owner input |
| Payment-provider selection and payment integration approach | Secure order and payment flow | Pending owner input |
| Delivery charges, locations served and collection option | Order totals and fulfilment process | Pending owner input |
| Intended destination for the Customer Focus card | About page CTA accuracy | Pending owner input |
| Content, workflow and business requirements for Request a Painter, Book Inspection and Apply for Job | Service page planning | Pending owner input |

## 7. Definition of done

Every stage should be considered complete only when the following checklist is satisfied:

- requirements have been confirmed and documented
- scope agreed before implementation begins
- only files needed for that stage were changed
- no unrelated design or functionality changed unintentionally
- relevant tests or manual checks were performed
- desktop and mobile behaviour was checked where relevant
- security and privacy were reviewed where personal information or payments are involved
- README status was updated with evidence of completion
- remaining limitations were documented clearly

## 8. Current next step

The immediate task is to finish this roadmap documentation and keep the implementation plan realistic. The next planned implementation focus is Stage 1: the Product catalogue.

This task does not implement Stage 1 or any other website feature. The site remains in its current static, pre-commerce stage until the owner approves the required products, images, pricing and delivery/business details.

## Final note

This roadmap is intended to prevent premature feature work, reduce confusion and support a disciplined build path for Fesolux Paints. It should be reviewed and updated whenever a stage is completed, a decision changes, or new information becomes available from the business owner.

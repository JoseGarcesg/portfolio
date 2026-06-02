# Step-by-Step Guide to Setting Up Strapi CMS 🚀

This guide explains in a simple and didactic way how to deploy, model, and connect your own **Strapi instance asynchronously** with this interactive web portfolio.

---

## 📋 Table of Contents
1. [Initialize Strapi Locally](#1-initialize-strapi-locally)
2. [Create Schema Structure (Content-Types)](#2-create-schema-structure-content-types)
3. [Configure Public Permissions in Strapi](#3-configure-public-permissions-in-strapi)
4. [Fill in Information (Seeding)](#4-fill-in-information-seeding)
5. [Connect with the Portfolio](#5-connect-with-the-portfolio)

---

## 1. Initialize Strapi Locally

To create a new Strapi project from scratch, open your terminal and run:

```bash
# Creates a new Strapi server configured with default settings
npx create-strapi-app@latest my-portfolio-cms --quickstart
```

Once the installation is complete, your browser will automatically open at `http://localhost:1337/admin`. Register your admin user to access the Strapi control panel.

---

## 2. Create Schema Structure (Content-Types)

Inside the Strapi admin panel, go to the **Content-Type Builder** tab in the left sidebar. You will need to structure the models exactly as described below:

### A. `Profile` Collection *(Single Type)*
Create a **Single Type** called `Profile` with the following fields:

| Field Name | Data Type | Description / Options |
| :--- | :--- | :--- |
| `name` | **Text** (Short) | Full name (e.g., Sofia G. Silva) |
| `role` | **Text** (Short) | Your position/role (e.g., Front-End & CMS Specialist) |
| `description` | **Text** (Long) | Short introductory description |
| `longDescription` | **Text** (Long) | Your full biography or featured text |
| `avatar` | **Media** (Single) | Personal profile photo |
| `resume` | **Media** (Single) | Curriculum Vitae (downloadable PDF or document) |
| `email` | **Text** (Short) | Contact email address |
| `location` | **Text** (Short) | Location (e.g., Santiago, Chile) |
| `workStatus` | **Text** (Short) | Work status (e.g., Available for new projects) |

---

### B. `Skill` Collection *(Collection Type)*
Create a **Collection Type** called `Skill` with the following fields:

| Field Name | Data Type | Allowed Options |
| :--- | :--- | :--- |
| `name` | **Text** (Short) | Skill name (e.g., React, Tailwind) |
| `category` | **Enumeration** | Enter these exact values: `Frontend`, `Backend`, `Design`, `Tools`, `Other` |
| `level` | **Number** (Integer) | Value from `0` to `100` representing your expertise level |
| `icon` | **Text** (Short) | Lucide icon name (e.g., `React`, `Code2`, `Database`, `Figma`) |

---

### C. `Education` Collection *(Collection Type)*
Create a **Collection Type** called `Education` to record your academic background and certifications:

| Field Name | Data Type | Allowed Options |
| :--- | :--- | :--- |
| `institution` | **Text** (Short) | Educational institution (e.g., Complutense University) |
| `degree` | **Text** (Short) | Degree obtained or course (e.g., Bachelor's in Computer Science) |
| `duration` | **Text** (Short) | Duration in years (e.g., `2020 - 2024` or `Jan 2026`) |
| `description` | **Text** (Long) | Summary of subjects or achievements |
| `type` | **Enumeration** | Enter these exact values: `education` (Studies), `certification` (Certifications) |
| `credentialUrl` | **Text** (Short) | Link to verify credential (optional) |

---

### D. `Experience` Collection *(Collection Type)*
Create a **Collection Type** called `Experience` (Professional Background) with these fields:

| Field Name | Data Type | Description / Options |
| :--- | :--- | :--- |
| `company` | **Text** (Short) | Organization/company name |
| `role` | **Text** (Short) | Position held (e.g., Front-End Developer) |
| `duration` | **Text** (Short) | Time period (e.g., `2024 - Present`) |
| `description` | **Text** (Long) | Key achievements separated by line breaks |
| `skills` | **Text** (Short) | Technologies used, separated by commas (e.g., `React, Strapi, Tailwind`) |

---

### E. `Social` Collection *(Collection Type)*
Create a **Collection Type** called `Social` (Social Networks):

| Field Name | Data Type | Description / Options |
| :--- | :--- | :--- |
| `platform` | **Text** (Short) | Lowercase identifier (e.g., `github`, `linkedin`, `instagram`) |
| `url` | **Text** (Short) | Direct link to your profile |
| `label` | **Text** (Short) | Visible link text (e.g., `GitHub / sofia-dev`) |

---

## 3. Configure Public Permissions in Strapi

By default, Strapi endpoints are protected for security reasons. To allow the portfolio to query information cleanly without complex API tokens:

1. Go to **Settings** in the Strapi left panel.
2. Under the **Users & Permissions Plugin** section, click **Roles**.
3. Click on the **Public** role.
4. In the permissions grid, select each of your created Content-Types and check the **find** and **findOne** checkboxes (e.g., `education`, `experience`, `profile`, `skill`, `social`).
5. Save your changes by clicking **Save** in the top right corner.

---

## 4. Fill in Information (Seeding)

Go to the **Content Manager** in the left navigation menu and fill in the fields with your own professional information. Once filled out, make sure to press **Publish** on each entry to make it publicly available.

---

## 5. Connect with the Portfolio

Get the most out of your static site by directly connecting the public API:

1. Modify the environment variable in the `.env` or `.env.example` file at the root of your project:
   ```env
   VITE_STRAPI_URL=http://localhost:1337
   VITE_USE_MOCK_DATA=false
   ```
2. The system will detect the published entries and automatically replace the local static data with your live information loaded from your Strapi server.

You're all set! Your portfolio now has a powerful Headless CMS backend fully integrated.

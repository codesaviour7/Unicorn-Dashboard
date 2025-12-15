# Unicorn Dashboard

A Vue.js web application for managing unicorn data with CRUD operations, built with Tailwind CSS and Pinia for state management.

## Features

- ✅ List paginated unicorns (5 per page)
- ✅ Create new unicorns
- ✅ Edit existing unicorns
- ✅ Delete unicorns
- ✅ Sort by name or age
- ✅ Status calculation based on age (Baby/Mature/Old)
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling
- ✅ Loading indicators

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure the API endpoint:
   - Copy `.env.example` to `.env`
   - Update `VITE_API_BASE_URL` with your unique ID from [crudcrud.com](https://crudcrud.com/)
   - Example: `VITE_API_BASE_URL=https://crudcrud.com/api/YOUR_UNIQUE_ID/unicorns`

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
  ├── components/
  │   ├── UnicornList.vue    # List view with pagination and sorting
  │   └── UnicornForm.vue    # Create/Edit form
  ├── stores/
  │   └── unicorn.js         # Pinia store for state management
  ├── services/
  │   └── api.js             # API service layer
  ├── App.vue                # Main app component
  ├── main.js                # App entry point
  └── style.css              # Tailwind CSS imports
```

## Status Logic

- Age 0-8: Baby Unicorn
- Age 9-25: Mature Unicorn
- Age 26+: Old Unicorn

## API usage (CrudCrud)

- Set your endpoint in `.env` using the provided ID (expires every 24h):
  ```
  VITE_API_BASE_URL=https://crudcrud.com/api/YOUR_UNIQUE_ID/unicorns
  ```

- Each record returned by CrudCrud includes a generated `_id`. Use `_id` for GET/PUT/DELETE operations on individual unicorns.

